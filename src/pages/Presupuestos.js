import React, { useState, useEffect } from 'react';
import { useBudget } from '../context/BudgetContext';
import { 
    FaBullseye, 
    FaPiggyBank, 
    FaChartPie, 
    FaExclamationTriangle, 
    FaCheckCircle,
    FaPlus,
    FaEye,
    FaEyeSlash,
    FaChevronRight,
    FaDollarSign,
    FaCalendarAlt,
    FaFlag
} from 'react-icons/fa';
import { formatCurrency, formatPercentage, getProgressColor } from '../utils/budgetUtils';

const Presupuestos = () => {
    const { 
        budgets, 
        savingsGoals, 
        alerts, 
        getBudgetSummary, 
        getSavingsSummary,
        generateAlerts 
    } = useBudget();

    const [activeTab, setActiveTab] = useState('overview');
    const [showAlerts, setShowAlerts] = useState(false);

    // Generar alertas al cargar la página
    useEffect(() => {
        generateAlerts();
    }, [generateAlerts]);

    const budgetSummary = getBudgetSummary();
    const savingsSummary = getSavingsSummary();
    const unreadAlerts = alerts.filter(alert => !alert.read);

    const tabs = [
        { id: 'overview', label: 'Resumen', icon: FaChartPie },
        { id: 'budgets', label: 'Presupuestos', icon: FaBullseye },
        { id: 'goals', label: 'Metas de Ahorro', icon: FaPiggyBank },
        { id: 'alerts', label: `Alertas ${unreadAlerts.length > 0 ? `(${unreadAlerts.length})` : ''}`, icon: FaExclamationTriangle }
    ];

    const renderOverview = () => (
        <div className="row g-4">
            {/* Tarjetas de Resumen */}
            <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-header bg-primary text-white border-0">
                        <h5 className="mb-0 d-flex align-items-center">
                            <FaBullseye className="me-2" />
                            Resumen de Presupuestos
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row text-center g-3">
                            <div className="col-6">
                                <div className="border rounded p-3">
                                    <h6 className="text-muted mb-1">Total Presupuestos</h6>
                                    <h4 className="text-primary mb-0">{budgetSummary.totalBudgets}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="border rounded p-3">
                                    <h6 className="text-muted mb-1">Límite Total</h6>
                                    <h4 className="text-success mb-0">{formatCurrency(budgetSummary.totalLimit)}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="border rounded p-3">
                                    <h6 className="text-muted mb-1">Gastado</h6>
                                    <h4 className="text-danger mb-0">{formatCurrency(budgetSummary.totalSpent)}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="border rounded p-3">
                                    <h6 className="text-muted mb-1">Restante</h6>
                                    <h4 className={`mb-0 ${budgetSummary.totalRemaining >= 0 ? 'text-success' : 'text-danger'}`}>
                                        {formatCurrency(budgetSummary.totalRemaining)}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted">Uso Promedio</span>
                                <span className="fw-bold">{formatPercentage(budgetSummary.averageUsage)}</span>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                                <div 
                                    className={`progress-bar bg-${getProgressColor(budgetSummary.averageUsage)}`}
                                    style={{ width: `${Math.min(budgetSummary.averageUsage, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                    <div className="card-header bg-success text-white border-0">
                        <h5 className="mb-0 d-flex align-items-center">
                            <FaPiggyBank className="me-2" />
                            Resumen de Metas
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row text-center g-3">
                            <div className="col-6">
                                <div className="border rounded p-3">
                                    <h6 className="text-muted mb-1">Total Metas</h6>
                                    <h4 className="text-primary mb-0">{savingsSummary.totalGoals}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="border rounded p-3">
                                    <h6 className="text-muted mb-1">Completadas</h6>
                                    <h4 className="text-success mb-0">{savingsSummary.completedGoals}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="border rounded p-3">
                                    <h6 className="text-muted mb-1">Objetivo</h6>
                                    <h4 className="text-info mb-0">{formatCurrency(savingsSummary.totalTarget)}</h4>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="border rounded p-3">
                                    <h6 className="text-muted mb-1">Ahorrado</h6>
                                    <h4 className="text-success mb-0">{formatCurrency(savingsSummary.totalCurrent)}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted">Progreso</span>
                                <span className="fw-bold">{formatPercentage(savingsSummary.completionRate)}</span>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                                <div 
                                    className="progress-bar bg-success"
                                    style={{ width: `${Math.min(savingsSummary.completionRate, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alertas Recientes */}
            {unreadAlerts.length > 0 && (
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-warning text-dark border-0">
                            <h5 className="mb-0 d-flex align-items-center">
                                <FaExclamationTriangle className="me-2" />
                                Alertas Recientes
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                {unreadAlerts.slice(0, 3).map((alert, index) => (
                                    <div key={index} className="col-md-4">
                                        <div className={`alert alert-${alert.type} mb-0 d-flex align-items-center`}>
                                            <FaExclamationTriangle className="me-2" />
                                            <small>{alert.message}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {unreadAlerts.length > 3 && (
                                <div className="text-center mt-3">
                                    <button 
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => setActiveTab('alerts')}
                                    >
                                        Ver todas las alertas ({unreadAlerts.length})
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderBudgets = () => (
        <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white border-0 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 d-flex align-items-center">
                        <FaBullseye className="me-2" />
                        Presupuestos Activos
                    </h5>
                <button className="btn btn-light btn-sm">
                    <FaPlus className="me-1" />
                    Agregar Presupuesto
                </button>
            </div>
            <div className="card-body">
                {budgets.filter(budget => budget.isActive).length > 0 ? (
                    <div className="row g-3">
                        {budgets.filter(budget => budget.isActive).map(budget => (
                            <div key={budget.id} className="col-md-6 col-lg-4">
                                <div className="card border h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h6 className="card-title mb-0">{budget.category}</h6>
                                            <span className="badge bg-secondary">{budget.period}</span>
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <small className="text-muted">Límite</small>
                                                <small className="fw-bold">{formatCurrency(budget.limit)}</small>
                                            </div>
                                            <div className="progress" style={{ height: '6px' }}>
                                                <div 
                                                    className={`progress-bar bg-${getProgressColor(0, budget.alertThreshold)}`}
                                                    style={{ width: '0%' }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <small className="text-muted">
                                                Umbral de alerta: {budget.alertThreshold}%
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <FaBullseye size={48} className="text-muted mb-3" />
                        <h5 className="text-muted">No hay presupuestos activos</h5>
                        <p className="text-muted">Crea tu primer presupuesto para comenzar a controlar tus gastos</p>
                        <button className="btn btn-primary">
                            <FaPlus className="me-2" />
                            Crear Presupuesto
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    const renderGoals = () => (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-success text-white border-0 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 d-flex align-items-center">
                    <FaPiggyBank className="me-2" />
                    Metas de Ahorro
                </h5>
                <button className="btn btn-light btn-sm">
                    <FaPlus className="me-1" />
                    Agregar Meta
                </button>
            </div>
            <div className="card-body">
                {savingsGoals.length > 0 ? (
                    <div className="row g-3">
                        {savingsGoals.map(goal => {
                            const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
                            return (
                                <div key={goal.id} className="col-md-6 col-lg-4">
                                    <div className="card border h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <h6 className="card-title mb-0">{goal.name}</h6>
                                                <span className={`badge bg-${goal.priority === 'alta' ? 'danger' : goal.priority === 'media' ? 'warning' : 'success'}`}>
                                                    {goal.priority}
                                                </span>
                                            </div>
                                            <div className="mb-3">
                                                <div className="d-flex justify-content-between mb-1">
                                                    <small className="text-muted">Progreso</small>
                                                    <small className="fw-bold">{formatPercentage(progress)}</small>
                                                </div>
                                                <div className="progress" style={{ height: '6px' }}>
                                                    <div 
                                                        className="progress-bar bg-success"
                                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <small className="text-muted">
                                                    {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <FaPiggyBank size={48} className="text-muted mb-3" />
                        <h5 className="text-muted">No hay metas de ahorro</h5>
                        <p className="text-muted">Crea tu primera meta de ahorro para alcanzar tus objetivos financieros</p>
                        <button className="btn btn-success">
                            <FaPlus className="me-2" />
                            Crear Meta
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    const renderAlerts = () => (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-warning text-dark border-0 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 d-flex align-items-center">
                    <FaExclamationTriangle className="me-2" />
                    Sistema de Alertas
                </h5>
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => setShowAlerts(!showAlerts)}
                    >
                        {showAlerts ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>
            <div className="card-body">
                {alerts.length > 0 ? (
                    <div className="list-group">
                        {alerts.map((alert, index) => (
                            <div key={index} className={`list-group-item ${!alert.read ? 'bg-light' : ''}`}>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="d-flex align-items-start">
                                        <FaExclamationTriangle className={`me-3 mt-1 text-${alert.type}`} />
                                        <div>
                                            <p className="mb-1">{alert.message}</p>
                                            <small className="text-muted">
                                                {new Date(alert.timestamp).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </small>
                                        </div>
                                    </div>
                                    {!alert.read && (
                                        <span className="badge bg-primary">Nueva</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <FaCheckCircle size={48} className="text-success mb-3" />
                        <h5 className="text-muted">No hay alertas</h5>
                        <p className="text-muted">¡Todo está bajo control! No tienes alertas pendientes</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center mb-4 fw-bold text-primary">
                        <FaBullseye className="me-2" />
                        Presupuestos y Metas
                    </h1>

                    {/* Navegación por Pestañas */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-light border-0 p-0">
                            <ul className="nav nav-tabs nav-fill border-0" role="tablist">
                                {tabs.map(tab => {
                                    const Icon = tab.icon;
                                    return (
                                        <li className="nav-item" key={tab.id}>
                                            <button
                                                className={`nav-link border-0 ${activeTab === tab.id ? 'active bg-primary text-white' : 'text-dark'}`}
                                                onClick={() => setActiveTab(tab.id)}
                                                style={{ borderRadius: '0' }}
                                            >
                                                <Icon className="me-2" />
                                                {tab.label}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Contenido de las Pestañas */}
                    <div className="tab-content">
                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'budgets' && renderBudgets()}
                        {activeTab === 'goals' && renderGoals()}
                        {activeTab === 'alerts' && renderAlerts()}
                    </div>
                </div>
            </div>

            <style>
                {`
                .card {
                    transition: all 0.3s ease-in-out;
                    border-radius: 15px;
                }

                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
                }

                .card-header {
                    border-radius: 15px 15px 0 0 !important;
                }

                .nav-tabs .nav-link {
                    border-radius: 15px 15px 0 0 !important;
                    font-weight: 500;
                }

                .nav-tabs .nav-link.active {
                    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%) !important;
                    border-color: #007bff !important;
                }

                .progress {
                    border-radius: 10px;
                }

                .progress-bar {
                    border-radius: 10px;
                }

                .badge {
                    font-size: 0.75rem;
                }

                @media (max-width: 768px) {
                    .nav-tabs {
                        flex-direction: column;
                    }
                    
                    .nav-tabs .nav-link {
                        border-radius: 0 !important;
                        margin-bottom: 1px;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Presupuestos;
