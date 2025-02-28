import React from 'react';

const InvestmentSummary = ({ investments }) => {
    const totalInversiones = investments.reduce((acc, inv) => acc + inv.totalCuotas * inv.montoMensual, 0);
    const totalPagado = investments.reduce((acc, inv) => acc + inv.cuotasPagadas * inv.montoMensual, 0);
    const totalFaltante = totalInversiones - totalPagado;

    return (
        <div className="investment-summary card p-4 shadow-sm text-center">
            <h5 className="summary-title">💰 Resumen de Inversiones</h5>

            <div className="summary-item">
                <span className="label">Total Invertido:</span>
                <span className="value">{totalInversiones.toLocaleString('es-ES')}</span>
            </div>

            <div className="summary-item text-success">
                <span className="label">Total Pagado:</span>
                <span className="value">{totalPagado.toLocaleString('es-ES')}</span>
            </div>

            <div className="summary-item text-danger">
                <span className="label">Faltante:</span>
                <span className="value">{totalFaltante.toLocaleString('es-ES')}</span>
            </div>
        </div>

    );
};

export default InvestmentSummary;
