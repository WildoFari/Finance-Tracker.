import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { 
    FaPiggyBank, 
    FaTimes, 
    FaDollarSign, 
    FaCheckCircle,
    FaSpinner,
    FaInfoCircle,
    FaPlus
} from 'react-icons/fa';
import { formatCurrency } from '../utils/budgetUtils';
import { toast } from 'react-toastify';

const AddMoneyToGoal = ({ show, onClose, goal }) => {
    const { addToSavingsGoal } = useBudget();
    
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        
        // Formatear el campo de monto
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = new Intl.NumberFormat('es-ES').format(numericValue);
        setAmount(formattedValue);
        
        // Limpiar error cuando el usuario empiece a escribir
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const numericAmount = parseFloat(amount.replace(/\./g, ''));
        
        // Validar
        if (!amount || numericAmount <= 0) {
            setError('El monto debe ser mayor a 0');
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            addToSavingsGoal(goal.id, numericAmount);
            
            const newTotal = goal.currentAmount + numericAmount;
            const isCompleted = newTotal >= goal.targetAmount;
            
            if (isCompleted) {
                toast.success(`¡Felicitaciones! Has completado tu meta "${goal.name}"`);
            } else {
                toast.success(`Se agregaron ${formatCurrency(numericAmount)} a tu meta "${goal.name}"`);
            }
            
            // Limpiar y cerrar
            setAmount('');
            setError('');
            onClose();
            
        } catch (error) {
            toast.error('Error al agregar dinero a la meta');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setAmount('');
            setError('');
            onClose();
        }
    };

    const getNumericValue = (formattedValue) => {
        return parseFloat(formattedValue.replace(/\./g, '')) || 0;
    };

    if (!show || !goal) return null;

    const currentAmount = goal.currentAmount;
    const targetAmount = goal.targetAmount;
    const amountToAdd = getNumericValue(amount);
    const newTotal = currentAmount + amountToAdd;
    const remaining = Math.max(targetAmount - newTotal, 0);
    const progress = targetAmount > 0 ? (newTotal / targetAmount) * 100 : 0;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-success text-white border-0">
                        <h5 className="modal-title d-flex align-items-center">
                            <FaPiggyBank className="me-2" />
                            Agregar Dinero a Meta
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={handleClose}
                            disabled={isLoading}
                        />
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            {/* Información de la meta */}
                            <div className="card bg-light border-0 mb-4">
                                <div className="card-body">
                                    <h6 className="card-title text-success fw-bold mb-3">
                                        <FaInfoCircle className="me-2" />
                                        {goal.name}
                                    </h6>
                                    <div className="row g-2 text-center">
                                        <div className="col-4">
                                            <small className="text-muted d-block">Actual</small>
                                            <div className="fw-semibold text-info">
                                                {formatCurrency(currentAmount)}
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <small className="text-muted d-block">Objetivo</small>
                                            <div className="fw-semibold text-success">
                                                {formatCurrency(targetAmount)}
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <small className="text-muted d-block">Falta</small>
                                            <div className="fw-semibold text-warning">
                                                {formatCurrency(targetAmount - currentAmount)}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <small className="text-muted">Progreso actual</small>
                                            <small className="fw-bold">
                                                {((currentAmount / targetAmount) * 100).toFixed(1)}%
                                            </small>
                                        </div>
                                        <div className="progress" style={{ height: '8px' }}>
                                            <div
                                                className="progress-bar bg-success"
                                                style={{ width: `${Math.min((currentAmount / targetAmount) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Campo de monto */}
                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    ¿Cuánto dinero quieres agregar? <span className="text-danger">*</span>
                                </label>
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text bg-success text-white">
                                        <FaDollarSign />
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control ${error ? 'is-invalid' : ''}`}
                                        value={amount}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        disabled={isLoading}
                                        autoFocus
                                    />
                                    {error && (
                                        <div className="invalid-feedback">
                                            {error}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Vista previa del nuevo total */}
                            {amountToAdd > 0 && (
                                <div className="card border-success mb-3">
                                    <div className="card-body">
                                        <h6 className="card-title text-success fw-bold mb-3">
                                            <FaCheckCircle className="me-2" />
                                            Vista Previa
                                        </h6>
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <small className="text-muted">Nuevo total:</small>
                                                <div className="fw-semibold text-success fs-5">
                                                    {formatCurrency(newTotal)}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted">Restante:</small>
                                                <div className="fw-semibold text-primary fs-5">
                                                    {formatCurrency(remaining)}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <small className="text-muted">Nuevo progreso</small>
                                                <small className="fw-bold text-success">
                                                    {Math.min(progress, 100).toFixed(1)}%
                                                </small>
                                            </div>
                                            <div className="progress" style={{ height: '10px' }}>
                                                <div
                                                    className={`progress-bar ${progress >= 100 ? 'bg-success' : 'bg-info'}`}
                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {progress >= 100 && (
                                            <div className="alert alert-success mt-3 mb-0">
                                                <FaCheckCircle className="me-2" />
                                                ¡Felicitaciones! Completarás tu meta con este aporte
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer border-0 p-4">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={isLoading || !amount || getNumericValue(amount) <= 0}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="me-2 fa-spin" />
                                        Agregando...
                                    </>
                                ) : (
                                    <>
                                        <FaPlus className="me-2" />
                                        Agregar {amount ? formatCurrency(amountToAdd) : 'Dinero'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>
                {`
                .modal-content {
                    border-radius: 15px;
                }

                .modal-header {
                    border-radius: 15px 15px 0 0;
                }

                .modal-footer {
                    border-radius: 0 0 15px 15px;
                }

                .form-control:focus {
                    border-color: #28a745;
                    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
                }

                .btn {
                    border-radius: 8px;
                    font-weight: 500;
                }

                .card {
                    border-radius: 10px;
                }

                .input-group-text {
                    border-color: #28a745;
                }

                .progress {
                    border-radius: 10px;
                }

                .progress-bar {
                    border-radius: 10px;
                }

                @media (max-width: 768px) {
                    .modal-dialog {
                        margin: 1rem;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default AddMoneyToGoal;
