import React, { useContext, useEffect, useState, useRef } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Bar } from 'react-chartjs-2';
import { FaChartBar, FaSpinner, FaArrowUp, FaArrowDown, FaChartPie, FaDollarSign } from 'react-icons/fa';
import 'chart.js/auto';

const Graficos = () => {
    const { ingresos, egresos } = useContext(TransactionContext);
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    const formatCurrency = (value) => {
        return Number.isFinite(value) ? value.toLocaleString('es-ES', { minimumFractionDigits: 0 }) : '0';
    };

    const balance = ingresos - egresos;
    const porcentajeAhorro = ingresos > 0 ? ((balance / ingresos) * 100).toFixed(1) : 0;

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
        <div className="container my-4">
            <h1 className="text-center mb-4 fw-bold text-primary">
                <FaChartBar className="me-2" />
                Análisis de Finanzas
            </h1>

            {/* Tarjetas de Estadísticas */}
            <div className="row text-center g-3 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-success text-white border-0">
                            <h6 className="mb-0 fw-bold">
                                <FaArrowUp className="me-2" />
                                Ingresos
                            </h6>
                        </div>
                        <div className="card-body py-3">
                            <div className="d-flex align-items-center justify-content-center">
                                <FaDollarSign className="fs-4 me-2 text-success" />
                                <span className="fw-bold fs-5">{formatCurrency(ingresos)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-danger text-white border-0">
                            <h6 className="mb-0 fw-bold">
                                <FaArrowDown className="me-2" />
                                Egresos
                            </h6>
                        </div>
                        <div className="card-body py-3">
                            <div className="d-flex align-items-center justify-content-center">
                                <FaDollarSign className="fs-4 me-2 text-danger" />
                                <span className="fw-bold fs-5">{formatCurrency(egresos)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-primary text-white border-0">
                            <h6 className="mb-0 fw-bold">
                                <FaChartPie className="me-2" />
                                Balance
                            </h6>
                        </div>
                        <div className="card-body py-3">
                            <div className="d-flex align-items-center justify-content-center">
                                <FaDollarSign className={`fs-4 me-2 ${balance >= 0 ? 'text-success' : 'text-danger'}`} />
                                <span className={`fw-bold fs-5 ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {formatCurrency(balance)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-warning text-dark border-0">
                            <h6 className="mb-0 fw-bold">
                                <FaChartBar className="me-2" />
                                % Ahorro
                            </h6>
                        </div>
                        <div className="card-body py-3">
                            <div className="d-flex align-items-center justify-content-center">
                                <FaChartPie className={`fs-4 me-2 ${porcentajeAhorro >= 0 ? 'text-success' : 'text-danger'}`} />
                                <span className={`fw-bold fs-5 ${porcentajeAhorro >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {porcentajeAhorro}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráfico Principal */}
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-info text-white border-0">
                            <h5 className="mb-0 text-center fw-bold">
                                <FaChartBar className="me-2" />
                                Comparativa de Ingresos vs Egresos
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <canvas ref={chartRef} style={{ display: 'none' }} />
                            <div style={{ height: '400px', position: 'relative' }}>
                                {chartData ? (
                                    <Bar data={chartData} options={{
                                        ...options,
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    font: { size: 14 },
                                                    color: '#495057',
                                                    padding: 20
                                                }
                                            },
                                            tooltip: {
                                                backgroundColor: '#222',
                                                titleFont: { size: 14 },
                                                bodyFont: { size: 12 },
                                                padding: 12,
                                                borderColor: '#fff',
                                                borderWidth: 1,
                                                displayColors: false,
                                                callbacks: {
                                                    label: function(context) {
                                                        return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                                                    }
                                                }
                                            }
                                        }
                                    }} />
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center h-100">
                                        <div className="text-center text-muted">
                                            <FaSpinner className="fa-spin me-2 fs-4" />
                                            <div className="mt-2">Cargando gráfico...</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                .card {
                    transition: all 0.3s ease-in-out;
                    border-radius: 15px;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
                }

                .card-header {
                    border-radius: 15px 15px 0 0 !important;
                }

                .card-header.bg-success {
                    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%) !important;
                }

                .card-header.bg-danger {
                    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%) !important;
                }

                .card-header.bg-primary {
                    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%) !important;
                }

                .card-header.bg-warning {
                    background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%) !important;
                }

                .card-header.bg-info {
                    background: linear-gradient(135deg, #17a2b8 0%, #117a8b 100%) !important;
                }

                .shadow-sm {
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                }
                
                @media (max-width: 768px) {
                    .card {
                        margin-bottom: 1rem;
                    }
                    
                    .card-header h6 {
                        font-size: 0.9rem;
                    }
                    
                    .fs-5 {
                        font-size: 1.1rem !important;
                    }
                }

                @media (max-width: 576px) {
                    .card-body {
                        padding: 1rem !important;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Graficos;
