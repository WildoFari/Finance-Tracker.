import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const TransactionList = () => {
    const { transactions, clearTransactions, deleteTransaction } = useContext(TransactionContext);
    const [showConfirm, setShowConfirm] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const handleDeleteAll = () => {
        clearTransactions();
        setShowConfirm(false);
    };

    const handleDeleteOne = (id) => {
        deleteTransaction(id);
        setTransactionToDelete(null);
    };

    return (
        <div className="my-4">

            {transactions.length > 0 && (
                <button className="btn btn-danger mb-3 w-100" onClick={() => setShowConfirm(true)}>
                    Eliminar Todas las Transacciones
                </button>
            )}

            <ul className="list-group">
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                <strong>{transaction.type}:</strong> ${transaction.amount} - {transaction.category} ({transaction.date})
                            </span>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => setTransactionToDelete(transaction.id)}
                            >
                                Eliminar
                            </button>
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
                        <h4 className="text-center">¿Estás seguro?</h4>
                        <p className="text-center">Esta acción eliminará todas las transacciones y no se puede deshacer.</p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={handleDeleteAll}>
                                Sí, Eliminar Todo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {transactionToDelete !== null && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4 className="text-center">¿Eliminar esta transacción?</h4>
                        <p className="text-center">Esta acción no se puede deshacer.</p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-secondary" onClick={() => setTransactionToDelete(null)}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDeleteOne(transactionToDelete)}>
                                Sí, Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Estilos para el modal y overlay */}
            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 400px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </div>
    );
};

export default TransactionList;
