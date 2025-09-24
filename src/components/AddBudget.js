import React, { useState, useContext } from 'react';
import { useBudget } from '../context/BudgetContext';
import { TransactionContext } from '../context/TransactionContext';
import { 
    FaPlus, 
    FaTimes, 
    FaDollarSign, 
    FaCalendarAlt, 
    FaExclamationTriangle,
    FaCheckCircle,
    FaSpinner,
    FaInfoCircle
} from 'react-icons/fa';
import { validateBudgetData, formatCurrency, getCategoryIcon } from '../utils/budgetUtils';
import { toast } from 'react-toastify';

const AddBudget = ({ show, onClose }) => {
    const { addBudget } = useBudget();
    const { categories } = useContext(TransactionContext);
    
    const [formData, setFormData] = useState({
        category: '',
        limit: '',
        period: 'mensual',
        alertThreshold: 80
    });
    
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const periods = [
        { value: 'mensual', label: 'Mensual', description: 'Se resetea cada mes' },
        { value: 'trimestral', label: 'Trimestral', description: 'Se resetea cada 3 meses' },
        { value: 'anual', label: 'Anual', description: 'Se resetea cada año' }
    ];

    const alertThresholds = [
        { value: 70, label: '70% - Temprano', description: 'Te avisa cuando gastes el 70%' },
        { value: 80, label: '80% - Recomendado', description: 'Te avisa cuando gastes el 80%' },
        { value: 90, label: '90% - Crítico', description: 'Te avisa cuando gastes el 90%' },
        { value: 95, label: '95% - Último momento', description: 'Te avisa cuando gastes el 95%' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Formatear el campo de monto
        if (name === 'limit') {
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
        const validation = validateBudgetData(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            toast.error('Por favor, corrige los errores en el formulario');
            return;
        }

        setIsLoading(true);

        try {
            // Simular delay para mostrar loading
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Crear el presupuesto
            const newBudget = addBudget(formData);
            
            // Mostrar mensaje de éxito
            toast.success(`Presupuesto para ${formData.category} creado exitosamente`);
            
            // Limpiar formulario
            setFormData({
                category: '',
                limit: '',
                period: 'mensual',
                alertThreshold: 80
            });
            setErrors({});
            setShowAdvanced(false);
            
            // Cerrar modal
            onClose();
            
        } catch (error) {
            toast.error('Error al crear el presupuesto');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setFormData({
                category: '',
                limit: '',
                period: 'mensual',
                alertThreshold: 80
            });
            setErrors({});
            setShowAdvanced(false);
            onClose();
        }
    };

    const getNumericValue = (formattedValue) => {
        return parseFloat(formattedValue.replace(/\./g, '')) || 0;
    };

    const estimatedMonthly = formData.period === 'trimestral' ? 
        Math.round(getNumericValue(formData.limit) / 3) : 
        formData.period === 'anual' ? 
        Math.round(getNumericValue(formData.limit) / 12) : 
        getNumericValue(formData.limit);

    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bg-primary text-white border-0">
                        <h5 className="modal-title d-flex align-items-center">
                            <FaPlus className="me-2" />
                            Crear Nuevo Presupuesto
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
                                    <h6 className="text-primary fw-bold mb-3">
                                        <FaInfoCircle className="me-2" />
                                        Información Básica
                                    </h6>
                                </div>
                                
                                {/* Categoría */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Categoría <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {getCategoryIcon(category)} {category}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <div className="invalid-feedback">
                                            {errors.category}
                                        </div>
                                    )}
                                </div>

                                {/* Período */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        Período <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        name="period"
                                        value={formData.period}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                    >
                                        {periods.map(period => (
                                            <option key={period.value} value={period.value}>
                                                {period.label}
                                            </option>
                                        ))}
                                    </select>
                                    <small className="text-muted">
                                        {periods.find(p => p.value === formData.period)?.description}
                                    </small>
                                </div>

                                {/* Límite de gasto */}
                                <div className="col-12">
                                    <label className="form-label fw-semibold">
                                        Límite de Gasto <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaDollarSign />
                                        </span>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.limit ? 'is-invalid' : ''}`}
                                            name="limit"
                                            value={formData.limit}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            disabled={isLoading}
                                        />
                                        {errors.limit && (
                                            <div className="invalid-feedback">
                                                {errors.limit}
                                            </div>
                                        )}
                                    </div>
                                    <small className="text-muted">
                                        Límite {formData.period === 'mensual' ? 'mensual' : 
                                               formData.period === 'trimestral' ? 'trimestral' : 'anual'}
                                    </small>
                                </div>
                            </div>

                            {/* Configuración avanzada */}
                            <div className="mb-4">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    disabled={isLoading}
                                >
                                    <FaExclamationTriangle className="me-2" />
                                    Configuración Avanzada
                                    {showAdvanced ? ' ↑' : ' ↓'}
                                </button>
                            </div>

                            {showAdvanced && (
                                <div className="row g-3 mb-4">
                                    <div className="col-12">
                                        <h6 className="text-secondary fw-bold mb-3">
                                            <FaExclamationTriangle className="me-2" />
                                            Alertas y Notificaciones
                                        </h6>
                                    </div>
                                    
                                    {/* Umbral de alerta */}
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            Umbral de Alerta <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className={`form-select ${errors.alertThreshold ? 'is-invalid' : ''}`}
                                            name="alertThreshold"
                                            value={formData.alertThreshold}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                        >
                                            {alertThresholds.map(threshold => (
                                                <option key={threshold.value} value={threshold.value}>
                                                    {threshold.label}
                                                </option>
                                            ))}
                                        </select>
                                        <small className="text-muted">
                                            {alertThresholds.find(t => t.value === formData.alertThreshold)?.description}
                                        </small>
                                        {errors.alertThreshold && (
                                            <div className="invalid-feedback">
                                                {errors.alertThreshold}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Resumen */}
                            <div className="card bg-light border-0">
                                <div className="card-body">
                                    <h6 className="card-title text-primary fw-bold">
                                        <FaCheckCircle className="me-2" />
                                        Resumen del Presupuesto
                                    </h6>
                                    <div className="row g-2">
                                        <div className="col-md-6">
                                            <small className="text-muted">Categoría:</small>
                                            <div className="fw-semibold">
                                                {formData.category ? (
                                                    <>
                                                        {getCategoryIcon(formData.category)} {formData.category}
                                                    </>
                                                ) : (
                                                    <span className="text-muted">No seleccionada</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="text-muted">Período:</small>
                                            <div className="fw-semibold">
                                                <FaCalendarAlt className="me-1" />
                                                {periods.find(p => p.value === formData.period)?.label}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="text-muted">Límite total:</small>
                                            <div className="fw-semibold text-primary">
                                                <FaDollarSign className="me-1" />
                                                {formatCurrency(getNumericValue(formData.limit))}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <small className="text-muted">Equivalente mensual:</small>
                                            <div className="fw-semibold text-info">
                                                <FaDollarSign className="me-1" />
                                                {formatCurrency(estimatedMonthly)}
                                            </div>
                                        </div>
                                    </div>
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
                                className="btn btn-primary"
                                disabled={isLoading || !formData.category || !formData.limit}
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="me-2 fa-spin" />
                                        Creando...
                                    </>
                                ) : (
                                    <>
                                        <FaPlus className="me-2" />
                                        Crear Presupuesto
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
                    border-color: #007bff;
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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

export default AddBudget;
