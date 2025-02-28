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

            <div className="row text-center g-4">
                <div className="col-md-4">
                    <div className="card shadow border-0 rounded-lg">
                        <div className="card-body bg-success text-white rounded py-4">
                            <h4 className="card-title mb-3">Total Ingresos</h4>
                            <FaArrowUp className="fs-1 mb-2" />
                            <p className="display-6 fw-bold">{formatCurrency(ingresos)}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0 rounded-lg">
                        <div className="card-body bg-danger text-white rounded py-4">
                            <h4 className="card-title mb-3">Total Egresos</h4>
                            <FaArrowDown className="fs-1 mb-2" />
                            <p className="display-6 fw-bold">{formatCurrency(egresos)}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow border-0 rounded-lg">
                        <div
                            className="card-body text-white rounded py-4"
                            style={{
                                background: balance >= 0
                                    ? 'linear-gradient(135deg, #4e73df, #1cc88a)'
                                    : 'linear-gradient(135deg, #e74a3b, #f6c23e)',
                                color: '#fff',
                            }}
                        >
                            <h4 className="card-title mb-3">Balance Actual</h4>
                            <FaChartPie className="fs-1 mb-2" />
                            <p className="display-6 fw-bold">{formatCurrency(balance)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="mb-3 fw-bold text-center">Agregar Nueva Transacción</h4>
                    <AddTransaction />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light text-center">
                    <h4 className="mb-4 fw-bold text-primary">Lista de Transacciones</h4>
                    <TransactionList />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="mb-4 text-center fw-bold text-primary">Tabla de Transacciones</h4>
                    <TransactionTable />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="mb-4 text-center fw-bold text-primary">Gráfico de Ingresos y Egresos</h4>
                    <IncomeExpenseChart ingresos={ingresos} egresos={egresos} />
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
