// Utilidades para presupuestos y metas

// Formatear moneda
export const formatCurrency = (value) => {
    return Number.isFinite(value) ? value.toLocaleString('es-ES', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 
    }) : '0';
};

// Formatear porcentaje
export const formatPercentage = (value) => {
    return Number.isFinite(value) ? `${value.toFixed(1)}%` : '0%';
};

// Obtener color según el progreso del presupuesto
export const getProgressColor = (percentage, alertThreshold = 80) => {
    if (percentage >= 100) return 'danger';
    if (percentage >= alertThreshold) return 'warning';
    if (percentage >= 60) return 'info';
    return 'success';
};

// Obtener color según el progreso de la meta de ahorro
export const getSavingsProgressColor = (current, target) => {
    const percentage = target > 0 ? (current / target) * 100 : 0;
    if (percentage >= 100) return 'success';
    if (percentage >= 75) return 'info';
    if (percentage >= 50) return 'warning';
    return 'danger';
};

// Calcular días restantes hasta una fecha
export const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Obtener estado de la meta según días restantes
export const getGoalStatus = (current, target, deadline) => {
    const daysLeft = getDaysUntilDeadline(deadline);
    const percentage = target > 0 ? (current / target) * 100 : 0;
    
    if (percentage >= 100) return { status: 'completed', text: 'Completada', color: 'success' };
    if (daysLeft < 0) return { status: 'expired', text: 'Vencida', color: 'danger' };
    if (daysLeft <= 7) return { status: 'urgent', text: 'Urgente', color: 'warning' };
    if (daysLeft <= 30) return { status: 'soon', text: 'Próxima', color: 'info' };
    return { status: 'active', text: 'Activa', color: 'primary' };
};

// Validar datos de presupuesto
export const validateBudgetData = (data) => {
    const errors = {};
    
    if (!data.category || data.category.trim() === '') {
        errors.category = 'La categoría es requerida';
    }
    
    if (!data.limit || isNaN(data.limit) || parseFloat(data.limit) <= 0) {
        errors.limit = 'El límite debe ser un número mayor a 0';
    }
    
    if (data.alertThreshold && (isNaN(data.alertThreshold) || data.alertThreshold < 0 || data.alertThreshold > 100)) {
        errors.alertThreshold = 'El umbral de alerta debe estar entre 0 y 100';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Validar datos de meta de ahorro
export const validateSavingsGoalData = (data) => {
    const errors = {};
    
    if (!data.name || data.name.trim() === '') {
        errors.name = 'El nombre de la meta es requerido';
    }
    
    if (!data.targetAmount || isNaN(data.targetAmount) || parseFloat(data.targetAmount) <= 0) {
        errors.targetAmount = 'El monto objetivo debe ser mayor a 0';
    }
    
    if (data.currentAmount && (isNaN(data.currentAmount) || parseFloat(data.currentAmount) < 0)) {
        errors.currentAmount = 'El monto actual no puede ser negativo';
    }
    
    if (!data.deadline) {
        errors.deadline = 'La fecha límite es requerida';
    } else {
        const deadlineDate = new Date(data.deadline);
        const today = new Date();
        if (deadlineDate <= today) {
            errors.deadline = 'La fecha límite debe ser futura';
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Generar ID único
export const generateUniqueId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Obtener período actual
export const getCurrentPeriod = (period = 'mensual') => {
    const now = new Date();
    
    switch (period) {
        case 'mensual':
            return {
                start: new Date(now.getFullYear(), now.getMonth(), 1),
                end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
                label: now.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
            };
        case 'trimestral':
            const quarter = Math.floor(now.getMonth() / 3);
            const quarterStart = new Date(now.getFullYear(), quarter * 3, 1);
            const quarterEnd = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
            return {
                start: quarterStart,
                end: quarterEnd,
                label: `Q${quarter + 1} ${now.getFullYear()}`
            };
        case 'anual':
            return {
                start: new Date(now.getFullYear(), 0, 1),
                end: new Date(now.getFullYear(), 11, 31),
                label: now.getFullYear().toString()
            };
        default:
            return getCurrentPeriod('mensual');
    }
};

// Calcular cuota mensual sugerida para una meta
export const calculateMonthlyContribution = (targetAmount, currentAmount, deadline) => {
    const daysLeft = getDaysUntilDeadline(deadline);
    const monthsLeft = Math.ceil(daysLeft / 30);
    const remaining = targetAmount - currentAmount;
    
    if (monthsLeft <= 0) return 0;
    return remaining / monthsLeft;
};

// Obtener ícono según categoría
export const getCategoryIcon = (category) => {
    const iconMap = {
        'Comida': '🍽️',
        'Transporte': '🚗',
        'Entretenimiento': '🎬',
        'Salud': '🏥',
        'Educación': '📚',
        'Ropa': '👕',
        'Tecnología': '💻',
        'Hogar': '🏠',
        'Deportes': '⚽',
        'Viajes': '✈️',
        'Otros': '📦'
    };
    
    return iconMap[category] || '💰';
};

// Obtener color según prioridad
export const getPriorityColor = (priority) => {
    const colorMap = {
        'baja': 'success',
        'media': 'warning',
        'alta': 'danger'
    };
    
    return colorMap[priority] || 'secondary';
};

// Obtener texto según prioridad
export const getPriorityText = (priority) => {
    const textMap = {
        'baja': 'Baja',
        'media': 'Media',
        'alta': 'Alta'
    };
    
    return textMap[priority] || 'No definida';
};
