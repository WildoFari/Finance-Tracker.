import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { FaArrowDown, FaFilePdf, FaCreditCard } from 'react-icons/fa';
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
                <h2 className="fw-bold mb-4">
                    <FaArrowDown className="me-2 text-danger" />
                    Lista de Egresos
                </h2>
                {egresos.length > 0 && (
                    <button className="btn btn-danger" onClick={exportToPDF}>
                        <FaFilePdf className="me-2" />
                        Descargar PDF
                    </button>
                )}
            </div>

            {egresos.length > 0 ? (
               <>
               {Object.keys(groupedEgresos).map((month) => (
                   <div key={month} className="card border rounded-3 shadow-sm p-4 mb-5">
                       <h3 className="fw-semibold text-danger border-bottom pb-3 mb-4">{month}</h3>
           
                       <div className="row row-cols-1 row-cols-md-2 g-4">
                           {groupedEgresos[month].transactions.map((egreso, index) => (
                               <div key={index} className="col">
                                   <div className="card h-100 border-0 shadow-sm rounded-3 bg-white">
                                       <div className="card-body d-flex justify-content-between align-items-center">
                                           <div>
                                               <h6 className="fw-bold text-secondary mb-1">{egreso.category}</h6>
                                               <p className="text-muted small">{new Date(egreso.date).toLocaleDateString()}</p>
                                           </div>
                                           <h5 className="text-danger fw-semibold mb-0">
                                               <FaCreditCard className="me-1" />
                                               -{parseInt(egreso.amount).toLocaleString('es-ES')}
                                           </h5>
                                       </div>
                                   </div>
                               </div>
                           ))}
                       </div>
           
                       <h4 className="text-end fw-semibold text-danger mt-4">
                           Total: <span className="fw-bold">{groupedEgresos[month].total.toLocaleString('es-ES')}</span>
                       </h4>
                   </div>
               ))}
           
               <div className="text-end mt-5">
                   <h2 className="fw-bold text-dark">
                       Total General: <span className="text-danger">{totalGeneral.toLocaleString('es-ES')}</span>
                   </h2>
               </div>
           </>
            ) : (
                <p className="text-center text-muted">No hay egresos registrados.</p>
            )}
        </div>
    );
};

export default EgresosList;
