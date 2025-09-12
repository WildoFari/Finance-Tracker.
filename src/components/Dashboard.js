import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import IncomeExpenseChart from './IncomeExpenseChart';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import TransactionTable from './TransactionTable';
import { FaArrowUp, FaArrowDown, FaChartPie } from 'react-icons/fa';

const Dashboard = () => {
    const formatCurrency = (value) => {
        return Number.isFinite(value) ? value.toLocaleString('es-ES', { minimumFractionDigits: 0 }) : '0';
    };

    const { transactions } = useContext(TransactionContext);
    const ingresos = transactions
        .filter((t) => t.type === 'Ingreso')
        .reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

    const egresos = transactions
        .filter((t) => t.type === 'Egreso')
        .reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

    const balance = ingresos - egresos;

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4 fw-bold text-primary">Gestión de Finanzas</h1>

            <div className="row text-center g-3">
                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body py-3">
                            <h5 className="mb-2">Ingresos</h5>
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <FaArrowUp className="fs-5 me-2 text-success" />
                                <span className="fw-semibold">{formatCurrency(ingresos)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body py-3">
                            <h5 className="mb-2">Egresos</h5>
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <FaArrowDown className="fs-5 me-2 text-danger" />
                                <span className="fw-semibold">{formatCurrency(egresos)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body py-3">
                            <h5 className="mb-2">Balance</h5>
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <FaChartPie className="fs-5 me-2" />
                                <span className={`fw-semibold ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {formatCurrency(balance)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-info text-white border-0">
                        <h5 className="mb-0 text-center fw-bold">
                            <FaArrowDown className="me-2" />
                            Agregar Nueva Transacción
                        </h5>
                    </div>
                    <div className="card-body p-4">
                        <AddTransaction />
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-success text-white border-0">
                        <h5 className="mb-0 text-center fw-bold">
                            <FaArrowUp className="me-2" />
                            Lista de Transacciones
                        </h5>
                    </div>
                    <div className="card-body p-4">
                        <TransactionList />
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-primary text-white border-0">
                        <h5 className="mb-0 text-center fw-bold">
                            <FaChartPie className="me-2" />
                            Tabla de Transacciones
                        </h5>
                    </div>
                    <div className="card-body p-4">
                        <TransactionTable />
                    </div>
                </div>
            </div>

            <div className="container mt-4 mb-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-warning text-dark border-0">
                        <h5 className="mb-0 text-center fw-bold">
                            <FaChartPie className="me-2" />
                            Análisis de Ingresos y Egresos
                        </h5>
                    </div>
                    <div className="card-body p-4">
                        <IncomeExpenseChart ingresos={ingresos} egresos={egresos} />
                    </div>
                </div>
            </div>

            <style>
                {`
                .rounded-lg {
                    border-radius: 12px;
                }

                .card {
                    transition: all 0.3s ease-in-out;
                    border-radius: 15px;
                }

                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
                }

                .card-header {
                    border-radius: 15px 15px 0 0 !important;
                    background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-primary-dark, #0056b3) 100%);
                }

                .card-header.bg-success {
                    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%) !important;
                }

                .card-header.bg-info {
                    background: linear-gradient(135deg, #17a2b8 0%, #117a8b 100%) !important;
                }

                .card-header.bg-warning {
                    background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%) !important;
                }

                .card-body {
                    transition: all 0.3s ease-in-out;
                }

                .shadow-sm {
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                }
                
                @media (max-width: 768px) {
                    .display-6 {
                        font-size: 1.8rem;
                    }
                    
                    .card {
                        margin-bottom: 1rem;
                    }
                    
                    .card-header h5 {
                        font-size: 1rem;
                    }
                }

                @media (max-width: 576px) {
                    .card-body {
                        padding: 1rem !important;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Dashboard;
