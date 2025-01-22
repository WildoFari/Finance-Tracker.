import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const TransactionTable = () => {
    const { transactions } = useContext(TransactionContext);

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

    return (
        <div className="container my-4">
            <h2 className="text-center">Listado de Transacciones</h2>
            <div className="d-flex justify-content-between mb-3">
                <h3>Total: {transactions.length} transacciones</h3>
                <button
                    className="btn btn-primary"
                    onClick={exportToCSV}
                >
                    Exportar a CSV
                </button>
            </div>
            <div className="table-responsive">
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
                                    <td
                                        className={
                                            transaction.type === 'Ingreso'
                                                ? 'text-success'
                                                : 'text-danger'
                                        }
                                    >
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
        </div>
    );
};

export default TransactionTable;