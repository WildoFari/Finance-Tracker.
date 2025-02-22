import React, { useState } from 'react';
import AddInvestment from '../components/AddInvestment';
import ManageInvestment from '../components/ManageInvestment';

const Inversiones = () => {
    const [investments, setInvestments] = useState([]);

    const addInvestment = (newInvestment) => {
        setInvestments([...investments, newInvestment]);
    };

    const updateInvestment = (id, updates) => {
        setInvestments(investments.map(inv => (inv.id === id ? { ...inv, ...updates } : inv)));
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-bold text-center">📈 Gestión de Inversiones</h2>

            <AddInvestment addInvestment={addInvestment} existingInvestments={investments} />

            {investments.map((inv) => (
                <ManageInvestment key={inv.id} investment={inv} updateInvestment={updateInvestment} />
            ))}
        </div>
    );
};

export default Inversiones;
