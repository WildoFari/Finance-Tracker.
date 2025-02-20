import React, { useState } from 'react';

const AddInvestment = ({ addInvestment }) => {
    const [name, setName] = useState('');
    const [totalCuotas, setTotalCuotas] = useState('');
    const [cuotasPagadas, setCuotasPagadas] = useState('');
    const [montoMensual, setMontoMensual] = useState('');
    const [gastosExtras, setGastosExtras] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !totalCuotas || !montoMensual) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        const newInvestment = {
            id: Date.now(),
            name,
            totalCuotas: Number(totalCuotas),
            cuotasPagadas: Number(cuotasPagadas),
            montoMensual: Number(montoMensual),
            gastosExtras: Number(gastosExtras) || 0,
        };

        addInvestment(newInvestment);
        setName('');
        setTotalCuotas('');
        setCuotasPagadas('');
        setMontoMensual('');
        setGastosExtras('');
    };

    return (
        <div className="card shadow border-0 p-4 rounded bg-light">
            <h4 className="fw-bold text-center">📌 Agregar Inversión</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Nombre del Terreno</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Terreno en Asunción"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Total de Cuotas</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ej: 36"
                        value={totalCuotas}
                        onChange={(e) => setTotalCuotas(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Cuotas Pagadas</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ej: 10"
                        value={cuotasPagadas}
                        onChange={(e) => setCuotasPagadas(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Monto Mensual</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ej: 500.000"
                        value={montoMensual}
                        onChange={(e) => setMontoMensual(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Gastos Extras</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ej: 200.000"
                        value={gastosExtras}
                        onChange={(e) => setGastosExtras(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
                    Agregar Inversión
                </button>
            </form>
        </div>
    );
};

export default AddInvestment;
