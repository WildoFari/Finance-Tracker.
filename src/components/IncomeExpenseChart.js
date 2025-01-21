import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenseChart = ({ ingresos, egresos }) => {
    const data = {
        labels: ['Ingresos', 'Egresos'],
        datasets: [
            {
                data: [ingresos, egresos],
                backgroundColor: ['#28a745', '#dc3545'],
                hoverBackgroundColor: ['#218838', '#c82333'],
            },
        ],
    };

    return (
        <div className="chart-container my-4">
            <h3 className="text-center">Distribución de Ingresos y Egresos</h3>
            <Doughnut data={data} />
        </div>
    );
};

export default IncomeExpenseChart;