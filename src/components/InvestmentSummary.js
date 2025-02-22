import React from 'react';

const InvestmentSummary = ({ investments }) => {
    const totalInversiones = investments.reduce((acc, inv) => acc + inv.totalCuotas * inv.montoMensual, 0);
    const totalPagado = investments.reduce((acc, inv) => acc + inv.cuotasPagadas * inv.montoMensual, 0);
    const totalFaltante = totalInversiones - totalPagado;

    return (
        <div className="card p-3 shadow-sm text-center">
            <h5 className="fw-bold">💰 Resumen de Inversiones</h5>
            <p><strong>Total Invertido:</strong> {totalInversiones.toLocaleString('es-ES')}</p>
            <p className="text-success"><strong>Total Pagado:</strong> {totalPagado.toLocaleString('es-ES')}</p>
            <p className="text-danger"><strong>Faltante:</strong> {totalFaltante.toLocaleString('es-ES')}</p>
        </div>
    );
};

export default InvestmentSummary;
