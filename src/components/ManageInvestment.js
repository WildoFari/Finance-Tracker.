import React, { useState, useEffect } from 'react';
import { 
    FaChevronUp, 
    FaChevronDown, 
    FaTrash, 
    FaCreditCard, 
    FaPlus, 
    FaReceipt, 
    FaDollarSign, 
    FaEye, 
    FaEyeSlash,
    FaUndo,
    FaExclamationTriangle,
    FaTimes,
    FaTrashAlt
} from 'react-icons/fa';

const ManageInvestment = ({ investment, onDelete }) => {
    const isInvestmentValid = !!investment;

    const [cuotasPagadas, setCuotasPagadas] = useState(isInvestmentValid ? investment.cuotasPagadas : 0);
    const [pagos, setPagos] = useState(isInvestmentValid ? investment.pagos : []);
    const [gastosExtras, setGastosExtras] = useState(
        investment.gastosExtras.length > 0 ? investment.gastosExtras : []
    );
    const [gastoDescripcion, setGastoDescripcion] = useState("");
    const [gastoMonto, setGastoMonto] = useState("");
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [mostrarPagos, setMostrarPagos] = useState(false);
    const [mostrarGastos, setMostrarGastos] = useState(false);
    const [mostrarModalRestar, setMostrarModalRestar] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [pagoAEliminar, setPagoAEliminar] = useState(null);

    useEffect(() => {
        if (!isInvestmentValid) return;

        setTimeout(() => {
            const storedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
            const updatedInvestments = storedInvestments.map(inv =>
                inv.id === investment.id ? { ...inv, cuotasPagadas, pagos, gastosExtras } : inv
            );
            localStorage.setItem('investments', JSON.stringify(updatedInvestments));
        }, 100);
    }, [cuotasPagadas, pagos, gastosExtras, isInvestmentValid, investment.id]);


    if (!isInvestmentValid) {
        return <p className="text-center text-muted">Cargando inversión...</p>;
    }
    const handlePagoCuota = () => {
        if (cuotasPagadas < investment.totalCuotas) {
            const nuevoPago = {
                fecha: new Date().toLocaleDateString('es-ES'),
                cuotaNumero: cuotasPagadas + 1,
                monto: investment.montoMensual,
            };

            setCuotasPagadas(prev => prev + 1);
            setPagos(prevPagos => [...prevPagos, nuevoPago]);
        }
    };

    const handleRestarCuota = () => {
        if (cuotasPagadas > 0 && pagos.length > 0) {
            setMostrarModalRestar(true);
        }
    };

    const confirmarRestarCuota = () => {
        setCuotasPagadas(prev => prev - 1);
        setPagos(prevPagos => prevPagos.slice(0, -1));
        setMostrarModalRestar(false);
    };

    const cancelarRestarCuota = () => {
        setMostrarModalRestar(false);
    };

    const handleEliminarPago = (indexPago) => {
        setPagoAEliminar(indexPago);
        setMostrarModalEliminar(true);
    };

    const confirmarEliminarPago = () => {
        if (pagoAEliminar !== null) {
            // Eliminar el pago específico del array
            const nuevosPagos = pagos.filter((_, index) => index !== pagoAEliminar);
            
            // Renumerar las cuotas para mantener la secuencia
            const pagosRenumerados = nuevosPagos.map((pago, index) => ({
                ...pago,
                cuotaNumero: index + 1
            }));
            
            setPagos(pagosRenumerados);
            setCuotasPagadas(pagosRenumerados.length);
        }
        setMostrarModalEliminar(false);
        setPagoAEliminar(null);
    };

    const cancelarEliminarPago = () => {
        setMostrarModalEliminar(false);
        setPagoAEliminar(null);
    };


    const handleAgregarGasto = () => {
        if (!gastoDescripcion.trim() || !gastoMonto.trim() || isNaN(gastoMonto)) {
            alert("Por favor, ingrese una descripción y un monto válido.");
            return;
        }

        const nuevoGasto = {
            descripcion: gastoDescripcion,
            monto: Number(gastoMonto),
            fecha: new Date().toLocaleDateString('es-ES'),
        };

        setGastosExtras(prevGastos => [...prevGastos, nuevoGasto]);
        setGastoDescripcion("");
        setGastoMonto("");

    };


    const handleEliminarInversion = () => {
        if (window.confirm(`¿Estás seguro de eliminar la inversión "${investment.name}"? Esta acción no se puede deshacer.`)) {
            onDelete(investment.id);
        }
    };


    const totalPagos = pagos.reduce((acc, pago) => acc + pago.monto, 0);
    const totalGastos = gastosExtras.reduce((acc, gasto) => acc + gasto.monto, 0);
    const totalGeneral = totalPagos + totalGastos;

    return (
        <>
        <div className="card p-4 shadow-sm mb-3">
            <div className="d-flex justify-content-between align-items-center">
                <h5
                    className="fw-bold cursor-pointer"
                    onClick={() => setMostrarDetalle(!mostrarDetalle)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                    {investment.name} {mostrarDetalle ? <FaChevronUp className="ms-2" /> : <FaChevronDown className="ms-2" />}
                </h5>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminarInversion()}>
                    <FaTrash className="me-1" />
                    Eliminar
                </button>

            </div>

            {mostrarDetalle && (
                <>
                    <p className="text-muted">Cuotas pagadas: {cuotasPagadas} / {investment.totalCuotas}</p>

                    <div className="d-grid gap-2 mb-3">
                        <button className="btn btn-success" onClick={handlePagoCuota} disabled={cuotasPagadas >= investment.totalCuotas}>
                            <FaCreditCard className="me-2" />
                            Pagar Próxima Cuota
                        </button>
                        <button className="btn btn-warning" onClick={handleRestarCuota} disabled={cuotasPagadas <= 0}>
                            <FaUndo className="me-2" />
                            Restar Última Cuota
                        </button>
                    </div>

                    <h6 className="fw-bold">
                        <FaPlus className="me-2" />
                        Agregar Gasto Extra
                    </h6>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Descripción del gasto"
                        value={gastoDescripcion}
                        onChange={(e) => setGastoDescripcion(e.target.value)}
                    />
                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Monto del gasto"
                        value={gastoMonto}
                        onChange={(e) => setGastoMonto(e.target.value)}
                    />
                    <button className="btn btn-warning w-100" onClick={handleAgregarGasto}>
                        <FaDollarSign className="me-2" />
                        Agregar Gasto
                    </button>

                    <div className="payments-container mt-3">
                        <h6 className="payments-title d-flex justify-content-between align-items-center">
                            <span>
                                <FaReceipt className="me-2" />
                                Historial de Pagos
                            </span>
                            <button className="toggle-btn btn btn-sm btn-outline-primary" onClick={() => setMostrarPagos(!mostrarPagos)}>
                                {mostrarPagos ? (
                                    <>
                                        <FaEyeSlash className="me-1" />
                                        Ocultar
                                    </>
                                ) : (
                                    <>
                                        <FaEye className="me-1" />
                                        Mostrar
                                    </>
                                )}
                            </button>
                        </h6>

                        {mostrarPagos && (
                            <div className="payments-list mt-2">
                                {pagos.length > 0 ? (
                                    <ul className="list-group">
                                        {pagos.map((pago, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div className="d-flex flex-column">
                                                    <span className="payment-description">Cuota {pago.cuotaNumero} - {pago.fecha}</span>
                                                    <small className="text-muted">Monto: {pago.monto.toLocaleString('es-ES')}</small>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <strong className="payment-amount text-success">{pago.monto.toLocaleString('es-ES')}</strong>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleEliminarPago(index)}
                                                        title="Eliminar este pago"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-payments text-center text-muted">No hay pagos registrados.</p>
                                )}
                            </div>
                        )}
                    </div>
                    <p className="fw-bold mt-2 text-success">Total Pagado: {totalPagos.toLocaleString('es-ES')}</p>

                    <div className="expenses-container mt-3">
                        <h6 className="expenses-title d-flex justify-content-between align-items-center">
                            <span>
                                <FaDollarSign className="me-2" />
                                Gastos Extras
                            </span>
                            <button className="toggle-btn btn btn-sm btn-outline-primary" onClick={() => setMostrarGastos(!mostrarGastos)}>
                                {mostrarGastos ? (
                                    <>
                                        <FaEyeSlash className="me-1" />
                                        Ocultar
                                    </>
                                ) : (
                                    <>
                                        <FaEye className="me-1" />
                                        Mostrar
                                    </>
                                )}
                            </button>
                        </h6>

                        {mostrarGastos && (
                            <div className="expenses-list mt-2">
                                {gastosExtras.length > 0 ? (
                                    <ul className="list-group">
                                        {gastosExtras.map((gasto, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between">
                                                <span className="expense-description">{gasto.descripcion} - {gasto.fecha}</span>
                                                <strong className="expense-amount text-danger">{gasto.monto.toLocaleString('es-ES')}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-expenses text-center text-muted">No hay gastos extras registrados.</p>
                                )}
                            </div>
                        )}
                    </div>
                    <p className="fw-bold mt-2 text-danger">Total Gastos: {totalGastos.toLocaleString('es-ES')}</p>

                    <h5 className="fw-bold mt-3 text-primary"> Total General: {totalGeneral.toLocaleString('es-ES')}</h5>
                </>
            )}

            {/* Modal de confirmación para eliminar pago específico */}
            {mostrarModalEliminar && pagoAEliminar !== null && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                <FaExclamationTriangle className="me-2 text-danger" />
                                Confirmar Eliminación de Pago
                            </h4>
                            <button 
                                className="btn-close" 
                                onClick={cancelarEliminarPago}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="mb-3">
                                ¿Estás seguro de que quieres eliminar el pago de la <strong>Cuota {pagos[pagoAEliminar].cuotaNumero}</strong>?
                            </p>
                            <div className="alert alert-danger">
                                <FaExclamationTriangle className="me-2" />
                                Esta acción eliminará permanentemente este pago y renumerará las cuotas restantes.
                            </div>
                            <div className="mt-3 p-3 bg-light rounded">
                                <strong>Detalles del pago:</strong><br/>
                                <small className="text-muted">
                                    Fecha: {pagos[pagoAEliminar].fecha}<br/>
                                    Monto: {pagos[pagoAEliminar].monto.toLocaleString('es-ES')}
                                </small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="btn btn-secondary" 
                                onClick={cancelarEliminarPago}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn btn-danger" 
                                onClick={confirmarEliminarPago}
                            >
                                <FaTrashAlt className="me-2" />
                                Sí, Eliminar Pago
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmación para restar cuota */}
            {mostrarModalRestar && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                <FaExclamationTriangle className="me-2 text-warning" />
                                Confirmar Resta de Cuota
                            </h4>
                            <button 
                                className="btn-close" 
                                onClick={cancelarRestarCuota}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="mb-3">
                                ¿Estás seguro de que quieres restar la cuota <strong>{cuotasPagadas}</strong>?
                            </p>
                            <div className="alert alert-warning">
                                <FaExclamationTriangle className="me-2" />
                                Esta acción eliminará el último pago registrado y no se puede deshacer.
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                className="btn btn-secondary" 
                                onClick={cancelarRestarCuota}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="btn btn-warning" 
                                onClick={confirmarRestarCuota}
                            >
                                <FaUndo className="me-2" />
                                Sí, Restar Cuota
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        <style jsx>{`
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1050;
                animation: fadeIn 0.3s ease-in-out;
            }

            .modal-content {
                background: white;
                border-radius: 15px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease-in-out;
                overflow: hidden;
            }

            .modal-header {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 20px;
                border-bottom: 1px solid #dee2e6;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .modal-title {
                margin: 0;
                font-size: 1.25rem;
                font-weight: 600;
                color: #495057;
            }

            .btn-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6c757d;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }

            .btn-close:hover {
                background: #e9ecef;
                color: #495057;
            }

            .modal-body {
                padding: 25px;
            }

            .modal-footer {
                padding: 20px;
                border-top: 1px solid #dee2e6;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                background: #f8f9fa;
            }

            .alert-warning {
                background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
                border: 1px solid #ffeaa7;
                color: #856404;
                border-radius: 10px;
                padding: 15px;
                margin: 0;
            }

            .alert-danger {
                background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
                border: 1px solid #f5c6cb;
                color: #721c24;
                border-radius: 10px;
                padding: 15px;
                margin: 0;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideIn {
                from { 
                    transform: translateY(-50px) scale(0.9);
                    opacity: 0;
                }
                to { 
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
            }

            @media (max-width: 576px) {
                .modal-content {
                    width: 95%;
                    margin: 20px;
                }
                
                .modal-header, .modal-body, .modal-footer {
                    padding: 15px;
                }
                
                .modal-footer {
                    flex-direction: column;
                }
                
                .modal-footer .btn {
                    width: 100%;
                }
            }
        `}</style>
        </>
    );
};

export default ManageInvestment;
