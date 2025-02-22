import React, { useState } from 'react';

const ManageInvestment = ({ investment, updateInvestment }) => {
    const [cuotasPagadas, setCuotasPagadas] = useState('');
    const [gastoDescripcion, setGastoDescripcion] = useState('');
    const [gastoMonto, setGastoMonto] = useState('');

    const handlePagoCuota = () => {
        if (investment.cuotasPagadas < investment.totalCuotas) {
            const newCuotasPagadas = investment.cuotasPagadas + 1;
            const newPago = {
                fecha: new Date().toLocaleDateString('es-ES'),
                cuotaNumero: newCuotasPagadas,
                monto: investment.montoMensual,
            };

            updateInvestment(investment.id, {
                cuotasPagadas: newCuotasPagadas,
                pagos: [...investment.pagos, newPago]
            });

            setCuotasPagadas('');
        }
    };

    const handleAgregarGasto = () => {
        if (gastoDescripcion && gastoMonto) {
            const newGasto = {
                descripcion: gastoDescripcion,
                monto: Number(gastoMonto),
                fecha: new Date().toLocaleDateString('es-ES'),
            };

            updateInvestment(investment.id, {
                gastosExtras: [...investment.gastosExtras, newGasto]
            });

            setGastoDescripcion('');
            setGastoMonto('');
        }
    };

    return (
        <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">{investment.name}</h5>
            <p className="text-muted">Cuotas pagadas: {investment.cuotasPagadas} / {investment.totalCuotas}</p>

            {/* Botón para pagar cuota */}
            <button className="btn btn-success w-100 mb-3" onClick={handlePagoCuota} disabled={investment.cuotasPagadas >= investment.totalCuotas}>
                Pagar Próxima Cuota
            </button>

            {/* Agregar gasto extra */}
            <h6 className="fw-bold">➕ Agregar Gasto Extra</h6>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Descripción del gasto"
                value={gastoDescripcion}
                onChange={(e) => setGastoDescripcion(e.target.value)}
                required
            />
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Monto del gasto"
                value={gastoMonto}
                onChange={(e) => setGastoMonto(e.target.value)}
                required
            />
            <button className="btn btn-warning w-100" onClick={handleAgregarGasto}>
                Agregar Gasto
            </button>

            {/* Mostrar historial de pagos */}
            <h6 className="fw-bold mt-3">📜 Historial de Pagos</h6>
            <ul className="list-group">
                {investment.pagos.map((pago, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <span>Cuota {pago.cuotaNumero} - {pago.fecha}</span>
                        <strong>{pago.monto.toLocaleString('es-ES')}</strong>
                    </li>
                ))}
            </ul>

            {/* Mostrar gastos extras */}
            <h6 className="fw-bold mt-3">💰 Gastos Extras</h6>
            <ul className="list-group">
                {investment.gastosExtras.map((gasto, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <span>{gasto.descripcion} - {gasto.fecha}</span>
                        <strong className="text-danger">{gasto.monto.toLocaleString('es-ES')}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageInvestment;
