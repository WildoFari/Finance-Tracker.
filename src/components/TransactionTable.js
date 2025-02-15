import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { FaFilePdf } from 'react-icons/fa';

const TransactionTable = () => {
    const { transactions } = useContext(TransactionContext);
    const [showMobileList, setShowMobileList] = useState(false);

    return (
        <div className="container my-4">
            {/* Botón para mostrar/ocultar en mobile */}
            <button
                className={`btn w-100 fw-bold py-3 mb-3 d-md-none ${showMobileList ? 'btn-primary text-white' : 'btn-outline-primary'}`}
                onClick={() => setShowMobileList(!showMobileList)}
            >
                {showMobileList ? "Ocultar Transacciones" : "Mostrar Transacciones"}
                <i className={`ms-2 fas ${showMobileList ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>

            {/* Desktop - Tabla */}
            <div className="table-responsive d-none d-md-block">
                <table className="table table-striped shadow rounded">
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
                                <tr key={index} className="align-middle">
                                    <td>{index + 1}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.category}</td>
                                    <td className={transaction.type === 'Ingreso' ? 'text-success' : 'text-danger'}>
                                        {transaction.amount.toLocaleString('es-ES')}
                                    </td>
                                    <td>{transaction.type}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    No hay transacciones registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile - Lista de tarjetas */}
            {showMobileList && (
                <div className="d-block d-md-none">
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <div key={index} className="card mb-3 shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{transaction.category}</h5>
                                    <p className="mb-1"><strong>Fecha:</strong> {transaction.date}</p>
                                    <p className={`mb-1 fw-bold ${transaction.type === 'Ingreso' ? 'text-success' : 'text-danger'}`}>
                                        <strong>Monto:</strong> {transaction.amount.toLocaleString('es-ES')}
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

            {/* Botón de exportar PDF (Solo si hay transacciones) */}
            {transactions.length > 0 && (
                <div className="text-center mt-4">
                    <button
                        className="btn btn-danger fw-bold px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                        style={{
                            transition: "all 0.3s ease-in-out",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    >
                        <FaFilePdf size={20} />
                        Exportar a PDF
                    </button>
                </div>
            )}

            {/* Estilos adicionales */}
            <style jsx>{`
                .table {
                    border-radius: 10px;
                    overflow: hidden;
                }

                .table-hover tbody tr:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                    transition: 0.3s ease-in-out;
                }

                .card {
                    border-radius: 12px;
                    transition: all 0.3s ease-in-out;
                }

                .card:hover {
                    transform: scale(1.02);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }

                .btn-danger {
                    background: linear-gradient(135deg, #ff6b6b, #c0392b);
                    border: none;
                }

                .btn-danger:hover {
                    transform: scale(1.05);
                    transition: 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default TransactionTable;
