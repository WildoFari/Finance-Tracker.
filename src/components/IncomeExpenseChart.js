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

    const data = {
        labels: ['Ingresos', 'Egresos'],
        datasets: [
            {
                data: [ingresos, egresos],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverBackgroundColor: ['#218838', '#c82333'],
                borderWidth: 2,
                borderColor: '#fff',
            },
        ],
    };

    return (
        <div className="chart-container my-4 text-center">
            <h3 className="mb-3">Distribución de Ingresos y Egresos</h3>
            <div style={{ width: '60%', margin: '0 auto' }}>
                <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default IncomeExpenseChart;