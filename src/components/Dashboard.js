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
                        <div className="card-body bg-success text-white rounded">
                            <h3 className="card-title">Total Ingresos</h3>
                            <p className="card-text fs-3 fw-bold">${ingresos}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow border-0">
                        <div className="card-body bg-danger text-white rounded">
                            <h3 className="card-title">Total Egresos</h3>
                            <p className="card-text fs-3 fw-bold">${egresos}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className={`card shadow border-0 ${balance >= 0 ? 'bg-success' : 'bg-danger'
                            } text-white rounded`}
                    >
                        <div className="card-body">
                            <h3 className="card-title">Balance Actual</h3>
                            <p className="card-text fs-3 fw-bold">${balance}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h3 className="mb-4">Agregar Transacción</h3>
                    <AddTransaction />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h3 className="mb-4">Lista de Transacciones</h3>
                    <TransactionList />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h3 className="mb-4">Tabla de Transacciones</h3>
                    <TransactionTable />
                </div>
            </div>

            <div className="container mt-5">
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h3 className="mb-4">Gráfico de Ingresos y Egresos</h3>
                    <IncomeExpenseChart ingresos={ingresos} egresos={egresos} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;