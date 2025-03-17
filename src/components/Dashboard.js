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
                <div className="card border-0">
                    <div className="card-body p-3">
                        <AddTransaction />
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="card border-0">
                    <div className="card-body p-3 text-center">
                        <h5 className="mb-3 text-primary">Transacciones</h5>
                        <TransactionList />
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="card border-0">
                    <div className="card-body p-3">
                        <h5 className="mb-3 text-primary text-center">Tabla de Transacciones</h5>
                        <TransactionTable />
                    </div>
                </div>
            </div>

            <div className="container mt-4 mb-4">
                <div className="card border-0">
                    <div className="card-body p-2">
                        <IncomeExpenseChart ingresos={ingresos} egresos={egresos} />
                    </div>
                </div>
            </div>

            <style>
                {`
                .rounded-lg {
                    border-radius: 12px;
                }

                .card-body {
                    transition: transform 0.2s ease-in-out;
                }

                .card-body:hover {
                    transform: translateY(-5px);
                }
                
                @media (max-width: 768px) {
                    .display-6 {
                        font-size: 1.8rem;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Dashboard;
