import React, { useState, useEffect } from 'react';

const ManageInvestment = ({ investment, onDelete }) => {
    const isInvestmentValid = !!investment;

    const [cuotasPagadas, setCuotasPagadas] = useState(isInvestmentValid ? investment.cuotasPagadas : 0);
    const [pagos, setPagos] = useState(isInvestmentValid ? investment.pagos : []);
    const [gastosExtras, setGastosExtras] = useState(
        investment.gastosExtras.length > 0 ? investment.gastosExtras : []
    );
    const [gastoDescripcion, setGastoDescripcion] = useState("");
    const [gastoMonto, setGastoMonto] = useState("");
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [mostrarPagos, setMostrarPagos] = useState(false);
    const [mostrarGastos, setMostrarGastos] = useState(false);

    useEffect(() => {
        if (!isInvestmentValid) return;

        setTimeout(() => {
            const storedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
            const updatedInvestments = storedInvestments.map(inv =>
                inv.id === investment.id ? { ...inv, cuotasPagadas, pagos, gastosExtras } : inv
            );
            localStorage.setItem('investments', JSON.stringify(updatedInvestments));
        }, 100);
    }, [cuotasPagadas, pagos, gastosExtras, isInvestmentValid]);


    if (!isInvestmentValid) {
        return <p className="text-center text-muted">Cargando inversión...</p>;
    }
    const handlePagoCuota = () => {
        if (cuotasPagadas < investment.totalCuotas) {
            const nuevoPago = {
                fecha: new Date().toLocaleDateString('es-ES'),
                cuotaNumero: cuotasPagadas + 1,
                monto: investment.montoMensual,
            };

            setCuotasPagadas(prev => prev + 1);
            setPagos(prevPagos => [...prevPagos, nuevoPago]);
        }
    };


    const handleAgregarGasto = () => {
        if (!gastoDescripcion.trim() || !gastoMonto.trim() || isNaN(gastoMonto)) {
            alert("Por favor, ingrese una descripción y un monto válido.");
            return;
        }

        const nuevoGasto = {
            descripcion: gastoDescripcion,
            monto: Number(gastoMonto),
            fecha: new Date().toLocaleDateString('es-ES'),
        };

        setGastosExtras(prevGastos => [...prevGastos, nuevoGasto]);
        setGastoDescripcion("");
        setGastoMonto("");

    };


    const handleEliminarInversion = () => {
        if (window.confirm(`¿Estás seguro de eliminar la inversión "${investment.name}"? Esta acción no se puede deshacer.`)) {
            onDelete(investment.id);
        }
    };


    const totalPagos = pagos.reduce((acc, pago) => acc + pago.monto, 0);
    const totalGastos = gastosExtras.reduce((acc, gasto) => acc + gasto.monto, 0);
    const totalGeneral = totalPagos + totalGastos;

    return (
        <div className="card p-4 shadow-sm mb-3">
            <div className="d-flex justify-content-between align-items-center">
                <h5
                    className="fw-bold cursor-pointer"
                    onClick={() => setMostrarDetalle(!mostrarDetalle)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                    {investment.name} {mostrarDetalle ? "⬆️" : "⬇️"}
                </h5>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminarInversion()}>
                    🗑 Eliminar
                </button>

            </div>

            {mostrarDetalle && (
                <>
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

                    <div className="mt-3">
                        <h6 className="fw-bold d-flex justify-content-between">
                            📜 Historial de Pagos
                            <button className="btn btn-sm btn-outline-primary" onClick={() => setMostrarPagos(!mostrarPagos)}>
                                {mostrarPagos ? "Ocultar" : "Mostrar"}
                            </button>
                        </h6>
                        {mostrarPagos && (
                            <ul className="list-group mt-2">
                                {pagos.length > 0 ? (
                                    pagos.map((pago, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between">
                                            <span>Cuota {pago.cuotaNumero} - {pago.fecha}</span>
                                            <strong>{pago.monto.toLocaleString('es-ES')}</strong>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item text-center text-muted">No hay pagos registrados.</li>
                                )}
                            </ul>
                        )}
                    </div>
                    <p className="fw-bold mt-2 text-success">Total Pagado: {totalPagos.toLocaleString('es-ES')}</p>

                    <div className="mt-3">
                        <h6 className="fw-bold d-flex justify-content-between">
                            💰 Gastos Extras
                            <button className="btn btn-sm btn-outline-primary" onClick={() => setMostrarGastos(!mostrarGastos)}>
                                {mostrarGastos ? "Ocultar" : "Mostrar"}
                            </button>
                        </h6>
                        {mostrarGastos && (
                            <ul className="list-group mt-2">
                                {gastosExtras.length > 0 ? (
                                    gastosExtras.map((gasto, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between">
                                            <span>{gasto.descripcion} - {gasto.fecha}</span>
                                            <strong className="text-danger">{gasto.monto.toLocaleString('es-ES')}</strong>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item text-center text-muted">No hay gastos extras registrados.</li>
                                )}
                            </ul>
                        )}
                    </div>
                    <p className="fw-bold mt-2 text-danger">Total Gastos: {totalGastos.toLocaleString('es-ES')}</p>

                    <h5 className="fw-bold mt-3 text-primary"> Total General: {totalGeneral.toLocaleString('es-ES')}</h5>
                </>
            )}
        </div>
    );
};

export default ManageInvestment;
