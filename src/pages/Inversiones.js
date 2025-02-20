import React, { useState } from 'react';
import AddInvestment from '../components/AddInvestment';

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

            {/* Listado de inversiones agregadas */}
            {investments.length > 0 && (
                <div className="card shadow border-0 p-4 rounded bg-light">
                    <h4 className="fw-bold text-center">📌 Lista de Inversiones</h4>
                    <ul className="list-group">
                        {investments.map((inv) => (
                            <li key={inv.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <strong>{inv.name}</strong> - Cuotas: {inv.cuotasPagadas}/{inv.totalCuotas}
                                    - Mensual: {inv.montoMensual.toLocaleString('es-ES')}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Inversiones;
