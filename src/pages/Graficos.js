import React, { useContext, useEffect, useState, useRef } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Graficos = () => {
    const { ingresos, egresos } = useContext(TransactionContext);
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const gradientIngresos = ctx.createLinearGradient(0, 0, 0, 400);
            gradientIngresos.addColorStop(0, '#00c851');
            gradientIngresos.addColorStop(1, '#007E33');

            const gradientEgresos = ctx.createLinearGradient(0, 0, 0, 400);
            gradientEgresos.addColorStop(0, '#ff4444');
            gradientEgresos.addColorStop(1, '#CC0000');

            setChartData({
                labels: ['Ingresos', 'Egresos'],
                datasets: [
                    {
                        label: 'Monto',
                        data: [ingresos, egresos],
                        backgroundColor: [gradientIngresos, gradientEgresos],
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: ['#007E33', '#CC0000'],
                        barThickness: 60,
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
        animation: { duration: 1000, easing: 'easeInOutCubic' },
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <h2 className="mb-4 fw-bold text-center text-primary">
            📊 Resumen de Finanzas
        </h2>
        <canvas ref={chartRef} style={{ display: 'none' }} />
        <div
            className="chart-container shadow-lg p-5 bg-white rounded-3"
            style={{ width: '95%', maxWidth: '600px', height: 'auto' }}
        >
            {chartData ? (
                <Bar data={chartData} options={{
                    ...options, // Mantén tus opciones existentes
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    size: 14
                                },
                                color: '#495057'
                            }
                        },
                        title: {
                            display: options?.plugins?.title?.text ? true : false,
                            text: options?.plugins?.title?.text,
                            font: {
                                size: 16,
                                weight: 'bold'
                            },
                            color: '#343a40',
                            padding: 10
                        }
                    }
                }} />
            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                    <p className="text-center text-muted">Cargando gráfico...</p>
                </div>
            )}
        </div>
    </div>
    );
};

export default Graficos;
