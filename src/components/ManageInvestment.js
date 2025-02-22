import React, { useState, useEffect } from 'react';

const ManageInvestment = ({ investment }) => {
    const [cuotasPagadas, setCuotasPagadas] = useState(investment.cuotasPagadas || 0);
    const [gastosExtras, setGastosExtras] = useState(investment.gastosExtras || []);
    const [pagos, setPagos] = useState(investment.pagos || []);
    const [gastoDescripcion, setGastoDescripcion] = useState("");
    const [gastoMonto, setGastoMonto] = useState("");

    useEffect(() => {
        const storedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
        const updatedInvestments = storedInvestments.map(inv =>
            inv.id === investment.id ? { ...inv, cuotasPagadas, pagos, gastosExtras } : inv
        );
        localStorage.setItem('investments', JSON.stringify(updatedInvestments));
    }, [cuotasPagadas, pagos, gastosExtras, investment.id]);

    const handlePagoCuota = () => {
        if (cuotasPagadas < investment.totalCuotas) {
            const newPago = {
                fecha: new Date().toLocaleDateString('es-ES'),
                cuotaNumero: cuotasPagadas + 1,
                monto: investment.montoMensual,
            };

            setCuotasPagadas(cuotasPagadas + 1);
            setPagos([...pagos, newPago]);
        }
    };

    const handleAgregarGasto = () => {
        if (gastoDescripcion.trim() === "" || gastoMonto.trim() === "" || isNaN(gastoMonto)) {
            alert("Por favor, ingrese una descripción y un monto válido.");
            return;
        }

        const newGasto = {
            descripcion: gastoDescripcion,
            monto: Number(gastoMonto),
            fecha: new Date().toLocaleDateString('es-ES'),
        };

        setGastosExtras([...gastosExtras, newGasto]);
        setGastoDescripcion("");
        setGastoMonto("");
    };

    const totalPagos = pagos.reduce((acc, pago) => acc + pago.monto, 0);
    const totalGastos = gastosExtras.reduce((acc, gasto) => acc + gasto.monto, 0);
    const totalGeneral = totalPagos + totalGastos;

    return (
        <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">{investment.name}</h5>
            <p className="text-muted">Cuotas pagadas: {cuotasPagadas} / {investment.totalCuotas}</p>

            <button className="btn btn-success w-100 mb-3" onClick={handlePagoCuota} disabled={cuotasPagadas >= investment.totalCuotas}>
                Pagar Próxima Cuota
            </button>

            <h6 className="fw-bold">➕ Agregar Gasto Extra</h6>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Descripción del gasto"
                value={gastoDescripcion}
                onChange={(e) => setGastoDescripcion(e.target.value)}
            />
            <input
                type="number"
                className="form-control mb-2"
                placeholder="Monto del gasto"
                value={gastoMonto}
                onChange={(e) => setGastoMonto(e.target.value)}
            />
            <button className="btn btn-warning w-100" onClick={handleAgregarGasto}>
                Agregar Gasto
            </button>

            <h6 className="fw-bold mt-3">📜 Historial de Pagos</h6>
            <ul className="list-group">
                {pagos.map((pago, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <span>Cuota {pago.cuotaNumero} - {pago.fecha}</span>
                        <strong>{pago.monto.toLocaleString('es-ES')}</strong>
                    </li>
                ))}
            </ul>
            <p className="fw-bold mt-2 text-success">Total Pagado: {totalPagos.toLocaleString('es-ES')}</p>

            <h6 className="fw-bold mt-3">💰 Gastos Extras</h6>
            <ul className="list-group">
                {gastosExtras.map((gasto, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <span>{gasto.descripcion} - {gasto.fecha}</span>
                        <strong className="text-danger">{gasto.monto.toLocaleString('es-ES')}</strong>
                    </li>
                ))}
            </ul>
            <p className="fw-bold mt-2 text-danger">Total Gastos: {totalGastos.toLocaleString('es-ES')}</p>

            <h5 className="fw-bold mt-3 text-primary"> Total General: {totalGeneral.toLocaleString('es-ES')}</h5>
        </div>
    );
};

export default ManageInvestment;
