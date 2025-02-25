import React, { useState } from 'react';

const AddInvestment = ({ addInvestment, existingInvestments }) => {
    const [name, setName] = useState("");
    const [totalCuotas, setTotalCuotas] = useState("");
    const [montoMensual, setMontoMensual] = useState("");
    const [cuotasPagadas, setCuotasPagadas] = useState("");
    const [montoTotalPagado, setMontoTotalPagado] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !totalCuotas.trim() || !montoMensual.trim()) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (existingInvestments.some(inv => inv.name.toLowerCase() === name.toLowerCase())) {
            alert("Ya existe una inversión con este nombre.");
            return;
        }

        const newInvestment = {
            id: Date.now(),
            name: name.trim(),
            totalCuotas: parseInt(totalCuotas, 10),
            cuotasPagadas: parseInt(cuotasPagadas, 10) || 0, // Si no hay nada, inicia en 0
            montoMensual: parseFloat(montoMensual),
            pagos: cuotasPagadas > 0 ? Array.from({ length: cuotasPagadas }, (_, i) => ({
                cuotaNumero: i + 1,
                fecha: "Fecha Desconocida",
                monto: parseFloat(montoMensual)
            })) : [],
            gastosExtras: [],
        };

        addInvestment(newInvestment);
        setName("");
        setTotalCuotas("");
        setMontoMensual("");
        setCuotasPagadas("");
        setMontoTotalPagado("");
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-4">
            <h5 className="fw-bold">➕ Agregar Nueva Inversión</h5>

            <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre del terreno"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Total de cuotas"
                value={totalCuotas}
                onChange={(e) => setTotalCuotas(e.target.value)}
            />
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Monto mensual"
                value={montoMensual}
                onChange={(e) => setMontoMensual(e.target.value)}
            />
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Cuotas ya pagadas (opcional)"
                value={cuotasPagadas}
                onChange={(e) => setCuotasPagadas(e.target.value)}
            />

            <button type="submit" className="btn btn-primary w-100">
                Agregar Inversión
            </button>
        </form>
    );
};

export default AddInvestment;
