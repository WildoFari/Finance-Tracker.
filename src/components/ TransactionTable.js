import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const TransactionTable = () => {
    const { transactions } = useContext(TransactionContext);

    return (
        <div className="container my-4">
            <h2 className="text-center">Listado de Transacciones</h2>
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