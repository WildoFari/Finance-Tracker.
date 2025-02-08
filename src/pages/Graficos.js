import React, { useContext, useEffect, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Graficos = () => {
    const { ingresos, egresos } = useContext(TransactionContext);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const createGradient = (ctx, colorStart, colorEnd) => {
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, colorStart);
            gradient.addColorStop(1, colorEnd);
            return gradient;
        };

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const gradientIngresos = createGradient(ctx, '#00c851', '#007E33');
            const gradientEgresos = createGradient(ctx, '#ff4444', '#CC0000');

            setChartData({
                labels: ['Ingresos', 'Egresos'],
                datasets: [
                    {
                        label: 'Montos',
                        data: [ingresos, egresos],
                        backgroundColor: [gradientIngresos, gradientEgresos],
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: ['#007E33', '#CC0000'],
                        barThickness: 60,
                        hoverBackgroundColor: ['#005db1', '#d63031'],
                    },
                ],
            });
        }
    }, [ingresos, egresos]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#222',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                padding: 10,
                borderColor: '#fff',
                borderWidth: 1,
                displayColors: false,
            },
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 14, weight: 'bold' } } },
            y: {
                grid: { color: '#E0E0E0' },
                ticks: { font: { size: 12 }, callback: (value) => `${value.toLocaleString('es-ES')}` },
            },
        },
        animation: { duration: 1200, easing: 'easeInOutQuart' },
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <h2 className="mb-4 fw-bold text-center">📊 Gráficos de Finanzas</h2>
            <div
                className="chart-container shadow-lg p-4 bg-white rounded"
                style={{ width: '90%', maxWidth: '500px', height: '400px' }}
            >
                {chartData && <Bar data={chartData} options={options} />}
            </div>
        </div>
    );
};

export default Graficos;
