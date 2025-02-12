import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { TransactionContext } from '../context/TransactionContext';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenseChart = () => {
    const { ingresos = 0, egresos = 0 } = useContext(TransactionContext);
    const total = ingresos + egresos;

    const data = {
        labels: ['Ingresos', 'Egresos'],
        datasets: [
            {
                data: [ingresos, egresos],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverBackgroundColor: ['#218838', '#c82333'],
                borderWidth: 3,
                borderColor: '#fff',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: { size: 14 },
                    color: '#333',
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${value.toLocaleString('es-ES')}€ (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container my-4 text-center">
            <h3 className="mb-3 fw-bold">Distribución de Ingresos y Egresos</h3>
            <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default IncomeExpenseChart;
