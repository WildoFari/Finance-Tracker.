import React from 'react';
import IncomeExpenseChart from './IncomeExpenseChart';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import TransactionTable from './ TransactionTable';

const Dashboard = () => {
    const ingresos = 5000;
    const egresos = 2000;
    const balance = ingresos - egresos;

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4 fw-bold">Gestión de Finanzas</h1>

            <div className="row text-center g-4">
                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body bg-success text-white rounded py-4">
                            <h3 className="card-title">Total Ingresos</h3>
                            <p className="card-text display-6 fw-bold">${ingresos}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body bg-danger text-white rounded py-4">
                            <h3 className="card-title">Total Egresos</h3>
                            <p className="card-text display-6 fw-bold">${egresos}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className="card shadow border-0 text-white rounded py-3"
                        style={{
                            background: balance >= 0
                                ? 'linear-gradient(135deg, #4e73df, #1cc88a)'
                                : 'linear-gradient(135deg, #e74a3b, #f6c23e)',
                            color: '#fff',
                        }}
                    >
                        <div className="card-body d-flex flex-column align-items-center">
                            <div className="mb-3">
                                {balance >= 0 ? (
                                    <i className="fas fa-arrow-up fs-1"></i>
                                ) : (
                                    <i className="fas fa-arrow-down fs-1"></i>
                                )}
                            </div>
                            <h4 className="card-title text-center">Balance Actual</h4>
                            <p className="card-text fs-4 fw-bold text-center">${balance}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="mb-4">Agregar Transacción</h4>
                    <AddTransaction />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="mb-4">Lista de Transacciones</h4>
                    <TransactionList />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="mb-4">Tabla de Transacciones</h4>
                    <TransactionTable />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="mb-4">Gráfico de Ingresos y Egresos</h4>
                    <IncomeExpenseChart ingresos={ingresos} egresos={egresos} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;