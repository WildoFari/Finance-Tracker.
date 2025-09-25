import React, { useEffect, useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { FaExclamationTriangle, FaCheckCircle, FaTimes, FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BudgetAlerts = () => {
    const { alerts, markAlertAsRead, clearAllAlerts, generateAlerts } = useBudget();
    const [showAlertsPanel, setShowAlertsPanel] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            generateAlerts();
        }, 30000);

        return () => clearInterval(interval);
    }, [generateAlerts]);

    useEffect(() => {
        const unreadAlerts = alerts.filter(alert => !alert.read);
        unreadAlerts.forEach(alert => {
            if (alert.type === 'danger') {
                toast.error(alert.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else if (alert.type === 'warning') {
                toast.warning(alert.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        });
    }, [alerts]);

    const unreadAlerts = alerts.filter(alert => !alert.read);
    const totalAlerts = alerts.length;

    const handleMarkAsRead = (alertId) => {
        markAlertAsRead(alertId);
    };

    const handleClearAll = () => {
        clearAllAlerts();
        setShowAlertsPanel(false);
    };

    if (totalAlerts === 0) return null;

    return (
        <>
            {/* Botón de alertas flotante */}
            <div 
                className="position-fixed"
                style={{ 
                    top: '20px', 
                    right: '20px', 
                    zIndex: 1050 
                }}
            >
                <button
                    className={`btn btn-${unreadAlerts.length > 0 ? 'warning' : 'secondary'} rounded-circle shadow`}
                    onClick={() => setShowAlertsPanel(!showAlertsPanel)}
                    style={{ width: '50px', height: '50px' }}
                    title={`${unreadAlerts.length} alertas no leídas`}
                >
                    <FaBell className="fs-5" />
                    {unreadAlerts.length > 0 && (
                        <span 
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{ fontSize: '0.7rem' }}
                        >
                            {unreadAlerts.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Panel de alertas */}
            {showAlertsPanel && (
                <div 
                    className="position-fixed"
                    style={{ 
                        top: '80px', 
                        right: '20px', 
                        width: '350px',
                        maxHeight: '400px',
                        zIndex: 1050 
                    }}
                >
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-warning text-dark border-0 d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 fw-bold">
                                <FaExclamationTriangle className="me-2" />
                                Alertas ({unreadAlerts.length})
                            </h6>
                            <button
                                className="btn btn-sm btn-outline-dark"
                                onClick={handleClearAll}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="card-body p-0" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {alerts.length > 0 ? (
                                <div className="list-group list-group-flush">
                                    {alerts.map((alert, index) => (
                                        <div 
                                            key={index} 
                                            className={`list-group-item ${!alert.read ? 'bg-light' : ''}`}
                                        >
                                            <div className="d-flex align-items-start">
                                                <div className={`me-3 mt-1`}>
                                                    {alert.type === 'danger' ? (
                                                        <FaExclamationTriangle className="text-danger" />
                                                    ) : (
                                                        <FaExclamationTriangle className="text-warning" />
                                                    )}
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="mb-1 small">{alert.message}</p>
                                                    <small className="text-muted">
                                                        {new Date(alert.timestamp).toLocaleDateString('es-ES', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </small>
                                                </div>
                                                {!alert.read && (
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleMarkAsRead(alert.id)}
                                                        title="Marcar como leída"
                                                    >
                                                        <FaCheckCircle />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <FaCheckCircle className="text-success fs-4 mb-2" />
                                    <p className="text-muted mb-0">No hay alertas</p>
                                </div>
                            )}
                        </div>
                        <div className="card-footer bg-light border-0 text-center">
                            <small className="text-muted">
                                {unreadAlerts.length > 0 
                                    ? `${unreadAlerts.length} alertas no leídas`
                                    : 'Todas las alertas leídas'
                                }
                            </small>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay para cerrar el panel */}
            {showAlertsPanel && (
                <div 
                    className="position-fixed w-100 h-100"
                    style={{ 
                        top: 0, 
                        left: 0, 
                        zIndex: 1040,
                        backgroundColor: 'rgba(0,0,0,0.1)'
                    }}
                    onClick={() => setShowAlertsPanel(false)}
                />
            )}

            <style>
                {`
                .list-group-item {
                    border-left: none !important;
                    border-right: none !important;
                }

                .list-group-item:first-child {
                    border-top: none !important;
                }

                .list-group-item:last-child {
                    border-bottom: none !important;
                }

                .card {
                    border-radius: 15px !important;
                }

                .card-header {
                    border-radius: 15px 15px 0 0 !important;
                }

                .card-footer {
                    border-radius: 0 0 15px 15px !important;
                }

                .btn.rounded-circle {
                    transition: all 0.3s ease;
                }

                .btn.rounded-circle:hover {
                    transform: scale(1.1);
                }

                @media (max-width: 768px) {
                    .position-fixed {
                        right: 10px !important;
                    }
                    
                    .card {
                        width: 300px !important;
                    }
                }
                `}
            </style>
        </>
    );
};

export default BudgetAlerts;
