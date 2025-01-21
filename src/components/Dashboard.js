import React from 'react';
import IncomeExpenseChart from './IncomeExpenseChart';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';

const Dashboard = () => {
    const ingresos = 5000;
    const egresos = 2000;
    const balance = ingresos - egresos;

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Cuentas</h1>
            <div className="row text-center g-4">
                <div className="col-md-4">
                    <div className="card border-success">
                        <div className="card-body">
                            <h3 className="card-title">Total Ingresos</h3>
                            <p className="card-text text-success fs-3">${ingresos}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-danger">
                        <div className="card-body">
                            <h3 className="card-title">Total Egresos</h3>
                            <p className="card-text text-danger fs-3">${egresos}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card ${balance >= 0 ? 'border-success' : 'border-danger'}`}>
                        <div className="card-body">
                            <h3 className="card-title">Balance Actual</h3>
                            <p className={`card-text fs-3 ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                                ${balance}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <AddTransaction />
            </div>
            <div className="container">
                <TransactionList />
            </div>
            <IncomeExpenseChart ingresos={ingresos} egresos={egresos} />
        </div>
    );
};

export default Dashboard;