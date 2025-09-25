import React, { useState } from 'react';
import { FaPlus, FaDollarSign, FaList, FaSave } from 'react-icons/fa';

const AddInvestment = ({ addInvestment, existingInvestments }) => {
    const [name, setName] = useState("");
    const [totalCuotas, setTotalCuotas] = useState("");
    const [montoMensual, setMontoMensual] = useState("");
    const [cuotasPagadas, setCuotasPagadas] = useState("");
    const [montoTotalPagado, setMontoTotalPagado] = useState("");
    const [gastosExtras, setGastosExtras] = useState([]);
    const [descripcionGasto, setDescripcionGasto] = useState("");
    const [montoGasto, setMontoGasto] = useState("");

    const formatNumber = (value) => {
        const numericValue = value.replace(/\D/g, "");
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleMontoMensualChange = (e) => {
        const rawValue = e.target.value;
        setMontoMensual(formatNumber(rawValue));
    };

    const handleMontoGastoChange = (e) => {
        const rawValue = e.target.value;
        setMontoGasto(formatNumber(rawValue));
    };

    const handleAgregarGastoPrevio = () => {
        if (!descripcionGasto.trim() || !montoGasto.trim()) {
            alert("Por favor, ingrese una descripción y un monto válido.");
            return;
        }

        const montoNumerico = parseFloat(montoGasto.replace(/\./g, ""));

        setGastosExtras([...gastosExtras, {
            descripcion: descripcionGasto,
            monto: montoNumerico,
            fecha: "Fecha Desconocida"
        }]);
        setDescripcionGasto("");
        setMontoGasto("");
    };

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

        const montoNumerico = parseFloat(montoMensual.replace(/\./g, ""));

        const newInvestment = {
            id: Date.now(),
            name: name.trim(),
            totalCuotas: parseInt(totalCuotas, 10),
            cuotasPagadas: parseInt(cuotasPagadas, 10) || 0,
            montoMensual: montoNumerico,
            pagos: cuotasPagadas > 0 ? Array.from({ length: cuotasPagadas }, (_, i) => ({
                cuotaNumero: i + 1,
                fecha: "Fecha Desconocida",
                monto: montoNumerico
            })) : [],
            gastosExtras: gastosExtras,
        };

        addInvestment(newInvestment);
        setName("");
        setTotalCuotas("");
        setMontoMensual("");
        setCuotasPagadas("");
        setMontoTotalPagado("");
        setGastosExtras([]);
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-4 mt-4">
            <h5 className="investment-title">
                <FaPlus className="me-2" />
                Agregar Nueva Inversión
            </h5>


            <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre"
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
                type="text"
                className="form-control mb-2"
                placeholder="Monto mensual"
                value={montoMensual}
                onChange={handleMontoMensualChange}
            />
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Cuotas ya pagadas (opcional)"
                value={cuotasPagadas}
                onChange={(e) => setCuotasPagadas(e.target.value)}
            />
            <h6 className="expense-title">
                <FaDollarSign className="me-2" />
                Agregar Gastos Anteriores
            </h6>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Descripción del gasto"
                value={descripcionGasto}
                onChange={(e) => setDescripcionGasto(e.target.value)}
            />
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Monto del gasto"
                value={montoGasto}
                onChange={handleMontoGastoChange}
            />
            <button type="button" className="btn btn-outline-primary mb-2 w-100" onClick={handleAgregarGastoPrevio}>
                <FaList className="me-2" />
                Agregar Gasto Previo
            </button>

            {gastosExtras.length > 0 && (
                <ul className="list-group mb-3">
                    {gastosExtras.map((gasto, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <span>{gasto.descripcion} - {gasto.fecha}</span>
                            <strong className="text-danger">{gasto.monto.toLocaleString('es-ES')}</strong>
                        </li>
                    ))}
                </ul>
            )}

            <button type="submit" className="btn btn-primary w-100">
                <FaSave className="me-2" />
                Agregar Inversión
            </button>
        </form>
    );
};

export default AddInvestment;
