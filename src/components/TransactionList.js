import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const TransactionList = () => {
    const { transactions } = useContext(TransactionContext);

    return (
        <div className="my-4">
            <h2>Transacciones</h2>
            <ul className="list-group">
                {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <li key={index} className="list-group-item">
                            <strong>{transaction.type}:</strong> ${transaction.amount} - {transaction.category} ({transaction.date})
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-center text-muted">No hay transacciones registradas</li>
                )}
            </ul>
        </div>
    );
};

export default TransactionList;