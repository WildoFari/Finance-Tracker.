import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { FaArrowUp, FaFilePdf, FaMoneyBillWave } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IngresosList = () => {
    const { transactions } = useContext(TransactionContext);
    const ingresos = transactions.filter(t => t.type === 'Ingreso');

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

    const groupedIngresos = groupByMonth(ingresos);
    const totalGeneral = ingresos.reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Lista de Ingresos', 14, 10);

        Object.keys(groupedIngresos).forEach((month, index) => {
            if (index > 0) doc.addPage();
            doc.text(`${month}`, 14, 20);
            const tableColumn = ['Fecha', 'Categoría', 'Monto'];
            const tableRows = groupedIngresos[month].transactions.map(ingreso => [
                ingreso.date,
                ingreso.category,
                ingreso.amount.toLocaleString('es-ES')
            ]);
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 30,
            });

            doc.text(`Total: ${groupedIngresos[month].total.toLocaleString('es-ES')}`, 14, doc.lastAutoTable.finalY + 10);
        });

        doc.addPage();
        doc.text(`Total General de Ingresos: ${totalGeneral.toLocaleString('es-ES')}`, 14, 20);

        doc.save('ingresos.pdf');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="fw-bold mb-4">
                    <FaArrowUp className="me-2 text-success" />
                    Lista de Ingresos
                </h2>
                {ingresos.length > 0 && (
                    <button className="btn btn-danger" onClick={exportToPDF}>
                        <FaFilePdf className="me-2" />
                        Descargar PDF
                    </button>
                )}
            </div>

            {ingresos.length > 0 ? (
                <>
                {Object.keys(groupedIngresos).map((month) => (
                    <div key={month} className="card border rounded-3 shadow-sm p-4 mb-5">
                        <h3 className="fw-semibold text-primary border-bottom pb-3 mb-4">{month}</h3>
            
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {groupedIngresos[month].transactions.map((ingreso, index) => (
                                <div key={index} className="col">
                                    <div className="card h-100 border-0 shadow-sm rounded-3 bg-white">
                                        <div className="card-body d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="fw-bold text-secondary mb-1">{ingreso.category}</h6>
                                                <p className="text-muted small">{new Date(ingreso.date).toLocaleDateString()}</p>
                                            </div>
                                            <h5 className="text-success fw-semibold mb-0">
                                                <FaMoneyBillWave className="me-1" />
                                                +{parseInt(ingreso.amount).toLocaleString('es-ES')}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
            
                        <h4 className="text-end fw-semibold text-success mt-4">
                            Total: <span className="fw-bold">{groupedIngresos[month].total.toLocaleString('es-ES')}</span>
                        </h4>
                    </div>
                ))}
            
                <div className="text-end mt-5">
                    <h2 className="fw-bold text-dark">
                        Total General: <span className="text-primary">{totalGeneral.toLocaleString('es-ES')}</span>
                    </h2>
                </div>
            </>
            ) : (
                <p className="text-center text-muted">No hay ingresos registrados.</p>
            )}
        </div>
    );
};

export default IngresosList;
