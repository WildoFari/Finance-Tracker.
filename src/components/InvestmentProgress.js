import React from 'react';

const InvestmentProgress = ({ investment }) => {
    const progress = (investment.cuotasPagadas / investment.totalCuotas) * 100;
    const restante = investment.totalCuotas - investment.cuotasPagadas;

    return (
        <div className="card p-3 shadow-sm">
            <h5 className="fw-semibold">{name}</h5>
            <p className="text-muted">
                Cuotas: {cuotasPagadas} / {totalCuotas}
            </p>

            <div className="progress" style={{ height: '10px' }}>
                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`Progreso de la inversión ${progress}%`}
                ></div>
            </div>

            <p className="mt-2 text-muted">
                {restante} cuotas restantes. Monto total: <strong className="text-primary">{formattedMontoTotal}</strong>
            </p>
        </div>
    );
};

export default InvestmentProgress;
