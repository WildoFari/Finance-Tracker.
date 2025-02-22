import React, { useState } from 'react';

const AddInvestment = ({ addInvestment, existingInvestments }) => {
    const [name, setName] = useState('');
    const [totalCuotas, setTotalCuotas] = useState('');
    const [montoMensual, setMontoMensual] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (existingInvestments.some(inv => inv.name.toLowerCase() === name.toLowerCase())) {
            setError('Ya existe una inversión con este nombre.');
            return;
        }

        addInvestment({
            id: Date.now(),
            name,
            totalCuotas: Number(totalCuotas),
            cuotasPagadas: 0,
            montoMensual: Number(montoMensual),
            gastosExtras: [],
            pagos: []
        });

        setName('');
        setTotalCuotas('');
        setMontoMensual('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            <h5 className="fw-bold">➕ Agregar Nueva Inversión</h5>

            <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre del terreno"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type="number"
                className="form-control mb-2"
                placeholder="Total de cuotas"
                value={totalCuotas}
                onChange={(e) => setTotalCuotas(e.target.value)}
                required
            />

            <input
                type="number"
                className="form-control mb-2"
                placeholder="Monto mensual"
                value={montoMensual}
                onChange={(e) => setMontoMensual(e.target.value)}
                required
            />

            {error && <p className="text-danger">{error}</p>}

            <button type="submit" className="btn btn-primary w-100 fw-bold">
                Agregar Inversión
            </button>
        </form>
    );
};

export default AddInvestment;
