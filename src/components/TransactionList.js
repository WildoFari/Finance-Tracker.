import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const TransactionList = () => {
    const { transactions, clearTransactions } = useContext(TransactionContext);
    const [showConfirm, setShowConfirm] = useState(false); // Estado para el modal de confirmación

    return (
        <div className="my-4">
            <h2>Transacciones</h2>

            {transactions.length > 0 && (
                <button
                    className="btn btn-danger mb-3 w-100"
                    onClick={() => setShowConfirm(true)} // Abre el modal
                >
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

            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>¿Estás seguro?</h4>
                        <p>Esta acción eliminará todas las transacciones. No se puede deshacer.</p>
                        <button className="btn btn-secondary me-2" onClick={() => setShowConfirm(false)}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={clearTransactions}>
                            Sí, Eliminar Todo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionList;