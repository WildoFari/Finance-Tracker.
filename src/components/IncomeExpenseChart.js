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
    const { ingresos, egresos } = useContext(TransactionContext);

    const data = {
        labels: ['Ingresos', 'Egresos'],
        datasets: [
            {
                data: [ingresos, egresos],
                backgroundColor: ['#28a745', '#dc3545'], // Colores para el gráfico
                hoverBackgroundColor: ['#218838', '#c82333'], // Colores al pasar el mouse
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