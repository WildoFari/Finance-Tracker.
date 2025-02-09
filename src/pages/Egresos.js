import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EgresosList = () => {
    const { transactions } = useContext(TransactionContext);
    const egresos = transactions.filter(t => t.type === 'Egreso');

    const groupByMonth = (transactions) => {
        return transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const month = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
            const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1); // Capitalizar primera letra

            if (!acc[formattedMonth]) acc[formattedMonth] = { total: 0, transactions: [] };
            acc[formattedMonth].transactions.push(transaction);
            acc[formattedMonth].total += parseFloat(transaction.amount);
            return acc;
        }, {});
    };

    const groupedEgresos = groupByMonth(egresos);
    const totalGeneral = egresos.reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Lista de Egresos', 14, 10);

        Object.keys(groupedEgresos).forEach((month, index) => {
            if (index > 0) doc.addPage();
            doc.text(`${month}`, 14, 20);
            const tableColumn = ['Fecha', 'Categoría', 'Monto'];
            const tableRows = groupedEgresos[month].transactions.map(egreso => [
                egreso.date,
                egreso.category,
                egreso.amount.toLocaleString('es-ES')
            ]);
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 30,
            });

            doc.text(`Total: ${groupedEgresos[month].total.toLocaleString('es-ES')}`, 14, doc.lastAutoTable.finalY + 10);
        });

        doc.addPage();
        doc.text(`Total General de Egresos: ${totalGeneral.toLocaleString('es-ES')}`, 14, 20);

        doc.save('egresos.pdf');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="fw-bold mb-4">Lista de Egresos</h2>
                {egresos.length > 0 && (
                    <button className="btn btn-danger" onClick={exportToPDF}>
                        Descargar PDF
                    </button>
                )}
            </div>

            {egresos.length > 0 ? (
                <>
                    {Object.keys(groupedEgresos).map((month) => (
                        <div key={month} className="card border-0 shadow-sm p-4 mb-4">
                            <h4 className="fw-bold text-primary border-bottom pb-2">{month}</h4>

                            <div className="row">
                                {groupedEgresos[month].transactions.map((egreso, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <div className="card border rounded p-3 bg-light">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="fw-bold">{egreso.category}</h5>
                                                    <p className="text-muted">{egreso.date}</p>
                                                </div>
                                                <h4 className="text-danger fw-bold">
                                                    {parseInt(egreso.amount).toLocaleString('es-ES')}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h5 className="text-end fw-bold text-danger mt-3">Total: {groupedEgresos[month].total.toLocaleString('es-ES')}</h5>
                        </div>
                    ))}

                    <div className="text-end mt-4">
                        <h3 className="fw-bold text-dark">Total General: {totalGeneral.toLocaleString('es-ES')}</h3>
                    </div>
                </>
            ) : (
                <p className="text-center text-muted">No hay egresos registrados.</p>
            )}
        </div>
    );
};

export default EgresosList;
