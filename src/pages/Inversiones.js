import React, { useState } from 'react';
import AddInvestment from '../components/AddInvestment';
import InvestmentProgress from '../components/InvestmentProgress';

const Inversiones = () => {
    const [investments, setInvestments] = useState([]);

    const addInvestment = (newInvestment) => {
        setInvestments([...investments, newInvestment]);
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-bold text-center">📈 Gestión de Inversiones</h2>
            <p className="lead text-muted text-center">Administra tus terrenos, cuotas y gastos extras.</p>

            {/* Sección para agregar una nueva inversión */}
            <div className="mb-4">
                <AddInvestment addInvestment={addInvestment} />
            </div>

            {/* Resumen de inversiones */}
            {investments.length > 0 && (
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="fw-bold text-center">📌 Inversiones Actuales</h4>

                    {/* Mostrar cada inversión con su barra de progreso */}
                    <div className="row">
                        {investments.map((inv) => (
                            <div key={inv.id} className="col-md-6 mb-3">
                                <InvestmentProgress investment={inv} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inversiones;
