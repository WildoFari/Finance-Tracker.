import React, { useState, useEffect } from 'react';
import { useBudget } from '../context/BudgetContext';
import { 
    FaEdit, 
    FaTimes, 
    FaDollarSign, 
    FaCalendarAlt, 
    FaFlag,
    FaCheckCircle,
    FaSpinner,
    FaInfoCircle,
    FaPiggyBank
} from 'react-icons/fa';
import { validateSavingsGoalData, formatCurrency, calculateMonthlyContribution, getPriorityColor } from '../utils/budgetUtils';
import { toast } from 'react-toastify';

const EditSavingsGoal = ({ show, onClose, goal }) => {
    const { updateSavingsGoal } = useBudget();
    
    const [formData, setFormData] = useState({
        name: '',
        targetAmount: '',
        currentAmount: '0',
        deadline: '',
        priority: 'media'
    });
    
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Cargar datos de la meta cuando se abre el modal
    useEffect(() => {
        if (goal) {
            setFormData({
                name: goal.name,
                targetAmount: new Intl.NumberFormat('es-ES').format(goal.targetAmount),
                currentAmount: new Intl.NumberFormat('es-ES').format(goal.currentAmount),
                deadline: goal.deadline,
                priority: goal.priority
            });
        }
    }, [goal]);

    const priorities = [
        { value: 'baja', label: 'Baja', description: 'Meta no urgente', color: 'success' },
        { value: 'media', label: 'Media', description: 'Meta importante', color: 'warning' },
        { value: 'alta', label: 'Alta', description: 'Meta crítica', color: 'danger' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Formatear campos de monto
        if (name === 'targetAmount' || name === 'currentAmount') {
            const numericValue = value.replace(/\D/g, '');
            const formattedValue = new Intl.NumberFormat('es-ES').format(numericValue);
            setFormData(prev => ({ ...prev, [name]: formattedValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar datos
        const validation = validateSavingsGoalData(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            toast.error('Por favor, corrige los errores en el formulario');
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const targetAmount = parseFloat(formData.targetAmount.replace(/\./g, ''));
            const currentAmount = parseFloat(formData.currentAmount.replace(/\./g, ''));

            updateSavingsGoal(goal.id, {
                name: formData.name,
                targetAmount: targetAmount,
                currentAmount: currentAmount,
                deadline: formData.deadline,
                priority: formData.priority,
                isCompleted: currentAmount >= targetAmount
            });
            
            toast.success(`Meta de ahorro actualizada exitosamente`);
            
            // Cerrar modal
            onClose();
            
        } catch (error) {
            toast.error('Error al actualizar la meta de ahorro');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setErrors({});
            onClose();
        }
    };

    const getNumericValue = (formattedValue) => {
        return parseFloat(formattedValue.replace(/\./g, '')) || 0;
    };

    const targetAmount = getNumericValue(formData.targetAmount);
    const currentAmount = getNumericValue(formData.currentAmount);
    const remaining = targetAmount - currentAmount;
    
    const monthlyContribution = formData.deadline ? 
        calculateMonthlyContribution(targetAmount, currentAmount, formData.deadline) : 0;

    if (!show || !goal) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-success text-white border-0">
                        <h5 className="modal-title d-flex align-items-center">
                            <FaEdit className="me-2" />
                            Editar Meta de Ahorro
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
                            {/* Información básica */}
                            <div className="row g-3 mb-4">
                                <div className="col-12">
                                    <h6 className="text-success fw-bold mb-3">
                                        <FaInfoCircle className="me-2" />
                                        Información de la Meta
                                    </h6>
                                </div>
                                
                                {/* Nombre de la meta */}
                                <div className="col-12">
                                    <label className="form-label fw-semibold">
                                        Nombre de la Meta <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Vacaciones de verano, Auto nuevo, Emergencias..."
                                        disabled={isLoading}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                {/* Monto objetivo */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Monto Objetivo <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaDollarSign />
                                        </span>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.targetAmount ? 'is-invalid' : ''}`}
                                            name="targetAmount"
                                            value={formData.targetAmount}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            disabled={isLoading}
                                        />
                                        {errors.targetAmount && (
                                            <div className="invalid-feedback">
                                                {errors.targetAmount}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Monto actual */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Monto Actual
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaDollarSign />
                                        </span>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.currentAmount ? 'is-invalid' : ''}`}
                                            name="currentAmount"
                                            value={formData.currentAmount}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            disabled={isLoading}
                                        />
                                        {errors.currentAmount && (
                                            <div className="invalid-feedback">
                                                {errors.currentAmount}
                                            </div>
                                        )}
                                    </div>
                                    <small className="text-muted">Monto ahorrado hasta ahora</small>
                                </div>

                                {/* Fecha límite */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Fecha Límite <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarAlt />
                                        </span>
                                        <input
                                            type="date"
                                            className={`form-control ${errors.deadline ? 'is-invalid' : ''}`}
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            disabled={isLoading}
                                        />
                                        {errors.deadline && (
                                            <div className="invalid-feedback">
                                                {errors.deadline}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Prioridad */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Prioridad
                                    </label>
                                    <select
                                        className="form-select"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                    >
                                        {priorities.map(priority => (
                                            <option key={priority.value} value={priority.value}>
                                                {priority.label}
                                            </option>
                                        ))}
                                    </select>
                                    <small className="text-muted">
                                        {priorities.find(p => p.value === formData.priority)?.description}
                                    </small>
                                </div>
                            </div>

                            {/* Resumen y cálculos */}
                            <div className="card bg-light border-0">
                                <div className="card-body">
                                    <h6 className="card-title text-success fw-bold">
                                        <FaCheckCircle className="me-2" />
                                        Resumen de la Meta
                                    </h6>
                                    <div className="row g-2">
                                        <div className="col-md-6">
                                            <small className="text-muted">Meta:</small>
                                            <div className="fw-semibold">{formData.name || 'Sin nombre'}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="text-muted">Prioridad:</small>
                                            <div className="fw-semibold">
                                                <FaFlag className={`me-1 text-${getPriorityColor(formData.priority)}`} />
                                                {priorities.find(p => p.value === formData.priority)?.label}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="text-muted">Objetivo:</small>
                                            <div className="fw-semibold text-success">
                                                <FaDollarSign className="me-1" />
                                                {formatCurrency(targetAmount)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="text-muted">Actual:</small>
                                            <div className="fw-semibold text-info">
                                                <FaDollarSign className="me-1" />
                                                {formatCurrency(currentAmount)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="text-muted">Restante:</small>
                                            <div className="fw-semibold text-primary">
                                                <FaDollarSign className="me-1" />
                                                {formatCurrency(remaining)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="text-muted">Cuota mensual sugerida:</small>
                                            <div className="fw-semibold text-warning">
                                                <FaDollarSign className="me-1" />
                                                {formatCurrency(monthlyContribution)}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {formData.deadline && (
                                        <div className="mt-3 p-3 bg-white rounded border">
                                            <small className="text-muted d-block mb-1">Fecha límite:</small>
                                            <div className="fw-semibold">
                                                <FaCalendarAlt className="me-1" />
                                                {new Date(formData.deadline).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
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
                                disabled={isLoading || !formData.name || !formData.targetAmount || !formData.deadline}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="me-2 fa-spin" />
                                        Actualizando...
                                    </>
                                ) : (
                                    <>
                                        <FaEdit className="me-2" />
                                        Actualizar Meta
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

                .form-select:focus,
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
                    background-color: #f8f9fa;
                    border-color: #ced4da;
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

export default EditSavingsGoal;
