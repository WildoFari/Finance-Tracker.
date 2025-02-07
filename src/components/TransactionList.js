import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const TransactionList = () => {
    const { transactions, clearTransactions, deleteTransaction } = useContext(TransactionContext);
    const [showConfirm, setShowConfirm] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    // Eliminar todas las transacciones
    const handleDeleteAll = () => {
        clearTransactions();
        setShowConfirm(false);
    };

    // Eliminar transacción individual
    const handleDeleteOne = (id) => {
        deleteTransaction(id);
        setTransactionToDelete(null);
    };

    return (
        <div className="my-4">
            <h4 className="text-center mb-3 fw-bold">Lista de Transacciones</h4>

            {transactions.length > 0 && (
                <button className="btn btn-danger mb-3 w-100" onClick={() => setShowConfirm(true)}>
                    Eliminar Todas las Transacciones
                </button>
            )}

            <ul className="list-group">
                {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
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

            {/* Modal para confirmar eliminación de todas las transacciones */}
            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>¿Estás seguro?</h4>
                        <p>Esta acción eliminará todas las transacciones. No se puede deshacer.</p>
                        <button className="btn btn-secondary me-2" onClick={() => setShowConfirm(false)}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={handleDeleteAll}>
                            Sí, Eliminar Todo
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para confirmar eliminación individual */}
            {transactionToDelete !== null && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>¿Eliminar esta transacción?</h4>
                        <p>Esta acción no se puede deshacer.</p>
                        <button className="btn btn-secondary me-2" onClick={() => setTransactionToDelete(null)}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDeleteOne(transactionToDelete)}>
                            Sí, Eliminar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionList;
