import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const TransactionList = () => {
    const { transactions, clearTransactions } = useContext(TransactionContext);

    return (
        <div className="my-4">
            <h2>Transacciones</h2>
            {transactions.length > 0 && (
                <button className="btn btn-danger mb-3 w-100" onClick={clearTransactions}>
                    Eliminar Todas las Transacciones
                </button>
            )}

            <ul className="list-group">
                {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <li key={index} className="list-group-item">
                            <strong>{transaction.type}:</strong> ${transaction.amount} - {transaction.category} ({transaction.date})
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-center text-muted">
                        No hay transacciones registradas
                    </li>
                )}
            </ul>
        </div>
    );
};

export default TransactionList;