import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { 
    FaHistory, 
    FaTimes, 
    FaChartLine,
    FaCalendarAlt,
    FaExclamationTriangle,
    FaCheckCircle
} from 'react-icons/fa';
import { formatCurrency, formatPercentage, getProgressColor } from '../utils/budgetUtils';

const BudgetHistory = ({ show, onClose, budget }) => {
    const { getBudgetHistory } = useBudget();
    const [periodsCount, setPeriodsCount] = useState(6);

    if (!show || !budget) return null;

    const history = getBudgetHistory(budget, periodsCount);
    const currentPeriod = history[history.length - 1];

    // Calcular estadísticas del historial
    const avgSpent = history.reduce((sum, h) => sum + h.spent, 0) / history.length;
    const avgPercentage = history.reduce((sum, h) => sum + h.percentage, 0) / history.length;
    const maxSpent = Math.max(...history.map(h => h.spent));
    const minSpent = Math.min(...history.map(h => h.spent));
    const overLimitCount = history.filter(h => h.isOverLimit).length;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-primary text-white border-0">
                        <h5 className="modal-title d-flex align-items-center">
                            <FaHistory className="me-2" />
                            Historial de Presupuesto - {budget.category}
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={onClose}
                        />
                    </div>
                    
                    <div className="modal-body p-4">
                        {/* Controles */}
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Períodos a mostrar:</label>
                                <select 
                                    className="form-select"
                                    value={periodsCount}
                                    onChange={(e) => setPeriodsCount(Number(e.target.value))}
                                >
                                    <option value={3}>Últimos 3 períodos</option>
                                    <option value={6}>Últimos 6 períodos</option>
                                    <option value={12}>Últimos 12 períodos</option>
                                    <option value={24}>Últimos 24 períodos</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Información:</label>
                                <div className="d-flex gap-2 align-items-center">
                                    <span className="badge bg-secondary">{budget.period}</span>
                                    <span className="badge bg-info">Límite: {formatCurrency(budget.limit)}</span>
                                    <span className="badge bg-warning">Umbral: {budget.alertThreshold}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas Generales */}
                        <div className="card bg-light border-0 mb-4">
                            <div className="card-body">
                                <h6 className="card-title fw-bold mb-3">
                                    <FaChartLine className="me-2" />
                                    Estadísticas del Historial
                                </h6>
                                <div className="row g-3 text-center">
                                    <div className="col-md-3">
                                        <small className="text-muted d-block">Promedio Gastado</small>
                                        <div className="fw-bold text-primary fs-5">{formatCurrency(avgSpent)}</div>
                                        <small className="text-muted">{formatPercentage(avgPercentage)}</small>
                                    </div>
                                    <div className="col-md-3">
                                        <small className="text-muted d-block">Máximo Gastado</small>
                                        <div className="fw-bold text-danger fs-5">{formatCurrency(maxSpent)}</div>
                                        <small className="text-muted">{formatPercentage((maxSpent / budget.limit) * 100)}</small>
                                    </div>
                                    <div className="col-md-3">
                                        <small className="text-muted d-block">Mínimo Gastado</small>
                                        <div className="fw-bold text-success fs-5">{formatCurrency(minSpent)}</div>
                                        <small className="text-muted">{formatPercentage((minSpent / budget.limit) * 100)}</small>
                                    </div>
                                    <div className="col-md-3">
                                        <small className="text-muted d-block">Períodos Excedidos</small>
                                        <div className="fw-bold text-warning fs-5">{overLimitCount}</div>
                                        <small className="text-muted">de {history.length} períodos</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gráfico de Barras Simple */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <h6 className="card-title fw-bold mb-3">
                                    <FaChartLine className="me-2" />
                                    Tendencia de Gastos
                                </h6>
                                <div className="position-relative" style={{ height: '200px' }}>
                                    <div className="d-flex align-items-end justify-content-around h-100 pb-3">
                                        {history.map((h, index) => {
                                            const heightPercentage = maxSpent > 0 ? (h.spent / maxSpent) * 100 : 0;
                                            return (
                                                <div key={index} className="d-flex flex-column align-items-center" style={{ width: `${90 / history.length}%` }}>
                                                    <small className="text-muted mb-1">{formatCurrency(h.spent)}</small>
                                                    <div 
                                                        className={`w-100 bg-${getProgressColor(h.percentage, budget.alertThreshold)} rounded-top`}
                                                        style={{ 
                                                            height: `${Math.max(heightPercentage, 5)}%`,
                                                            minHeight: '20px',
                                                            transition: 'height 0.3s ease'
                                                        }}
                                                        title={`${h.period}: ${formatCurrency(h.spent)} (${formatPercentage(h.percentage)})`}
                                                    ></div>
                                                    <small className="text-muted mt-2 text-center" style={{ fontSize: '0.7rem' }}>
                                                        {h.period}
                                                    </small>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Línea de referencia del límite */}
                                    <div 
                                        className="position-absolute w-100 border-top border-danger border-2"
                                        style={{ 
                                            top: `${100 - ((budget.limit / maxSpent) * 100)}%`,
                                            left: 0
                                        }}
                                    >
                                        <small className="text-danger fw-bold ms-2">Límite</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabla de Historial */}
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title fw-bold mb-3">
                                    <FaCalendarAlt className="me-2" />
                                    Detalle por Período
                                </h6>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Período</th>
                                                <th>Gastado</th>
                                                <th>Límite</th>
                                                <th>Restante</th>
                                                <th>Uso</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.slice().reverse().map((h, index) => {
                                                const isCurrent = index === 0;
                                                return (
                                                    <tr key={index} className={isCurrent ? 'table-primary' : ''}>
                                                        <td>
                                                            <strong>{h.period}</strong>
                                                            {isCurrent && <span className="badge bg-primary ms-2">Actual</span>}
                                                        </td>
                                                        <td className="fw-semibold">{formatCurrency(h.spent)}</td>
                                                        <td className="text-muted">{formatCurrency(h.limit)}</td>
                                                        <td className={h.isOverLimit ? 'text-danger fw-bold' : 'text-success'}>
                                                            {h.isOverLimit ? '-' : ''}{formatCurrency(Math.abs(h.remaining))}
                                                        </td>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="progress flex-grow-1" style={{ height: '8px', minWidth: '80px' }}>
                                                                    <div
                                                                        className={`progress-bar bg-${getProgressColor(h.percentage, budget.alertThreshold)}`}
                                                                        style={{ width: `${Math.min(h.percentage, 100)}%` }}
                                                                    ></div>
                                                                </div>
                                                                <small className="fw-bold" style={{ minWidth: '50px' }}>
                                                                    {formatPercentage(h.percentage)}
                                                                </small>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {h.isOverLimit ? (
                                                                <span className="badge bg-danger">
                                                                    <FaExclamationTriangle className="me-1" />
                                                                    Excedido
                                                                </span>
                                                            ) : h.percentage >= budget.alertThreshold ? (
                                                                <span className="badge bg-warning">
                                                                    <FaExclamationTriangle className="me-1" />
                                                                    Alerta
                                                                </span>
                                                            ) : (
                                                                <span className="badge bg-success">
                                                                    <FaCheckCircle className="me-1" />
                                                                    OK
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Análisis y Recomendaciones */}
                        <div className="card bg-info bg-opacity-10 border-info mt-4">
                            <div className="card-body">
                                <h6 className="card-title fw-bold text-info mb-3">
                                    💡 Análisis y Recomendaciones
                                </h6>
                                <ul className="mb-0">
                                    {avgPercentage > 90 && (
                                        <li className="text-danger">
                                            <strong>Atención:</strong> Tu promedio de uso es {formatPercentage(avgPercentage)}. 
                                            Considera aumentar tu límite o reducir gastos en esta categoría.
                                        </li>
                                    )}
                                    {avgPercentage < 50 && (
                                        <li className="text-success">
                                            <strong>Excelente:</strong> Estás usando solo {formatPercentage(avgPercentage)} de tu presupuesto en promedio. 
                                            Podrías considerar reducir el límite y reasignar fondos.
                                        </li>
                                    )}
                                    {overLimitCount > history.length / 2 && (
                                        <li className="text-warning">
                                            <strong>Advertencia:</strong> Has excedido el límite en {overLimitCount} de {history.length} períodos. 
                                            Revisa tus hábitos de gasto en {budget.category}.
                                        </li>
                                    )}
                                    {overLimitCount === 0 && (
                                        <li className="text-success">
                                            <strong>¡Felicitaciones!</strong> No has excedido tu presupuesto en ningún período. 
                                            ¡Sigue así!
                                        </li>
                                    )}
                                    <li className="text-info">
                                        <strong>Tendencia:</strong> Tu gasto promedio es {formatCurrency(avgSpent)} por {budget.period === 'mensual' ? 'mes' : budget.period === 'trimestral' ? 'trimestre' : 'año'}.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer border-0 p-4">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>

            <style>
                {`
                .modal-content {
                    border-radius: 15px;
                }

                .modal-header {
                    border-radius: 15px 15px 0 0;
                }

                .modal-footer {
                    border-radius: 0 0 15px 15px;
                }

                .table {
                    margin-bottom: 0;
                }

                .table th {
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                .table td {
                    vertical-align: middle;
                }

                .progress {
                    border-radius: 10px;
                }

                .progress-bar {
                    border-radius: 10px;
                }

                .card {
                    border-radius: 10px;
                }

                @media (max-width: 768px) {
                    .modal-dialog {
                        margin: 0.5rem;
                    }
                    
                    .table {
                        font-size: 0.85rem;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default BudgetHistory;
