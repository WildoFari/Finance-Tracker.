import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TransactionTable = () => {
    const { transactions } = useContext(TransactionContext);
    const [showMobileList, setShowMobileList] = useState(false);

    const exportToCSV = () => {
        const headers = ['Fecha', 'Categoría', 'Monto', 'Tipo'];
        const rows = transactions.map((transaction) => [
            transaction.date,
            transaction.category,
            transaction.amount,
            transaction.type,
        ]);

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        rows.forEach((row) => {
            csvContent += row.join(',') + '\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'transacciones.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const exportToPDF = () => {
        const doc = new jsPDF();

        doc.text('Listado de Transacciones', 14, 10);

        const tableColumn = ['Fecha', 'Categoría', 'Monto', 'Tipo'];
        const tableRows = transactions.map((transaction) => [
            transaction.date,
            transaction.category,
            `$${transaction.amount}`,
            transaction.type,
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('transacciones.pdf');
    };

    return (
        <div className="container my-4">
            {/* Título con opción de despliegue en mobile */}
            <h4
                className="text-center bg-light p-3 rounded d-md-none"
                onClick={() => setShowMobileList(!showMobileList)}
                style={{ cursor: 'pointer' }}
            >
                Listado de Transacciones
                <i className={`ms-2 fas ${showMobileList ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </h4>

            {/* Desktop */}
            <div className="table-responsive d-none d-md-block">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Categoría</th>
                            <th>Monto</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.category}</td>
                                    <td className={transaction.type === 'Ingreso' ? 'text-success' : 'text-danger'}>
                                        ${transaction.amount}
                                    </td>
                                    <td>{transaction.type}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No hay transacciones registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile - Lista Desplegable */}
            {showMobileList && (
                <div className="d-block d-md-none">
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <div key={index} className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{transaction.category}</h5>
                                    <p className="mb-1"><strong>Fecha:</strong> {transaction.date}</p>
                                    <p className={`mb-1 ${transaction.type === 'Ingreso' ? 'text-success' : 'text-danger'}`}>
                                        <strong>Monto:</strong> ${transaction.amount}
                                    </p>
                                    <p className="mb-0"><strong>Tipo:</strong> {transaction.type}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-warning text-center">
                            No hay transacciones registradas.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TransactionTable;