import React, { createContext, useContext, useState, useEffect } from 'react';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    // Estados para presupuestos por categoría
    const [budgets, setBudgets] = useState([]);
    
    // Estados para metas de ahorro
    const [savingsGoals, setSavingsGoals] = useState([]);
    
    // Estados para alertas
    const [alerts, setAlerts] = useState([]);

    // Cargar datos del localStorage al inicializar
    useEffect(() => {
        const loadBudgetsFromLocalStorage = () => {
            const storedBudgets = localStorage.getItem('budgets');
            return storedBudgets ? JSON.parse(storedBudgets) : [];
        };

        const loadSavingsGoalsFromLocalStorage = () => {
            const storedGoals = localStorage.getItem('savingsGoals');
            return storedGoals ? JSON.parse(storedGoals) : [];
        };

        const loadAlertsFromLocalStorage = () => {
            const storedAlerts = localStorage.getItem('budgetAlerts');
            return storedAlerts ? JSON.parse(storedAlerts) : [];
        };

        setBudgets(loadBudgetsFromLocalStorage());
        setSavingsGoals(loadSavingsGoalsFromLocalStorage());
        setAlerts(loadAlertsFromLocalStorage());
    }, []);

    // Guardar presupuestos en localStorage
    useEffect(() => {
        if (budgets.length > 0) {
            localStorage.setItem('budgets', JSON.stringify(budgets));
        }
    }, [budgets]);

    // Guardar metas de ahorro en localStorage
    useEffect(() => {
        if (savingsGoals.length > 0) {
            localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
        }
    }, [savingsGoals]);

    // Guardar alertas en localStorage
    useEffect(() => {
        if (alerts.length > 0) {
            localStorage.setItem('budgetAlerts', JSON.stringify(alerts));
        }
    }, [alerts]);

    // === FUNCIONES PARA PRESUPUESTOS ===

    // Agregar nuevo presupuesto
    const addBudget = (budgetData) => {
        const newBudget = {
            id: Date.now(),
            category: budgetData.category,
            limit: parseFloat(budgetData.limit),
            period: budgetData.period || 'mensual', // mensual, trimestral, anual
            alertThreshold: budgetData.alertThreshold || 80, // Porcentaje para alerta
            createdAt: new Date().toISOString(),
            isActive: true
        };
        setBudgets(prev => [...prev, newBudget]);
        return newBudget;
    };

    // Actualizar presupuesto existente
    const updateBudget = (id, updates) => {
        setBudgets(prev => prev.map(budget => 
            budget.id === id ? { ...budget, ...updates } : budget
        ));
    };

    // Eliminar presupuesto
    const deleteBudget = (id) => {
        setBudgets(prev => prev.filter(budget => budget.id !== id));
    };

    // Activar/desactivar presupuesto
    const toggleBudgetStatus = (id) => {
        setBudgets(prev => prev.map(budget => 
            budget.id === id ? { ...budget, isActive: !budget.isActive } : budget
        ));
    };

    // === FUNCIONES PARA METAS DE AHORRO ===

    // Agregar nueva meta de ahorro
    const addSavingsGoal = (goalData) => {
        const newGoal = {
            id: Date.now(),
            name: goalData.name,
            targetAmount: parseFloat(goalData.targetAmount),
            currentAmount: parseFloat(goalData.currentAmount) || 0,
            deadline: goalData.deadline,
            priority: goalData.priority || 'media', // baja, media, alta
            createdAt: new Date().toISOString(),
            isCompleted: false
        };
        setSavingsGoals(prev => [...prev, newGoal]);
        return newGoal;
    };

    // Actualizar meta de ahorro
    const updateSavingsGoal = (id, updates) => {
        setSavingsGoals(prev => prev.map(goal => 
            goal.id === id ? { ...goal, ...updates } : goal
        ));
    };

    // Eliminar meta de ahorro
    const deleteSavingsGoal = (id) => {
        setSavingsGoals(prev => prev.filter(goal => goal.id !== id));
    };

    // Agregar dinero a una meta
    const addToSavingsGoal = (id, amount) => {
        setSavingsGoals(prev => prev.map(goal => {
            if (goal.id === id) {
                const newAmount = goal.currentAmount + parseFloat(amount);
                return {
                    ...goal,
                    currentAmount: newAmount,
                    isCompleted: newAmount >= goal.targetAmount
                };
            }
            return goal;
        }));
    };

    // === FUNCIONES PARA CÁLCULOS Y ANÁLISIS ===

    // Calcular gastos por categoría en un período
    const getCategoryExpenses = (category, period = 'mensual') => {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const now = new Date();
        let startDate;

        switch (period) {
            case 'mensual':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'trimestral':
                const quarter = Math.floor(now.getMonth() / 3);
                startDate = new Date(now.getFullYear(), quarter * 3, 1);
                break;
            case 'anual':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        const categoryTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transaction.category === category &&
                   transaction.type === 'Egreso' &&
                   transactionDate >= startDate &&
                   transactionDate <= now;
        });

        return categoryTransactions.reduce((total, transaction) => 
            total + (parseFloat(transaction.amount) || 0), 0
        );
    };

    // Obtener progreso de presupuesto
    const getBudgetProgress = (budget) => {
        const expenses = getCategoryExpenses(budget.category, budget.period);
        const percentage = budget.limit > 0 ? (expenses / budget.limit) * 100 : 0;
        
        return {
            spent: expenses,
            limit: budget.limit,
            percentage: Math.min(percentage, 100),
            remaining: Math.max(budget.limit - expenses, 0),
            isOverLimit: expenses > budget.limit
        };
    };

    // Verificar si necesita alerta
    const checkBudgetAlerts = (budget) => {
        const progress = getBudgetProgress(budget);
        
        if (progress.percentage >= budget.alertThreshold && progress.percentage < 100) {
            return {
                type: 'warning',
                message: `¡Atención! Has gastado ${progress.percentage.toFixed(1)}% de tu presupuesto de ${budget.category}`,
                budget: budget
            };
        } else if (progress.isOverLimit) {
            return {
                type: 'danger',
                message: `¡Límite excedido! Has gastado ${progress.percentage.toFixed(1)}% de tu presupuesto de ${budget.category}`,
                budget: budget
            };
        }
        
        return null;
    };

    // Generar todas las alertas
    const generateAlerts = () => {
        const newAlerts = [];
        
        budgets.forEach(budget => {
            if (budget.isActive) {
                const alert = checkBudgetAlerts(budget);
                if (alert) {
                    newAlerts.push({
                        ...alert,
                        id: Date.now() + Math.random(),
                        timestamp: new Date().toISOString(),
                        read: false
                    });
                }
            }
        });

        setAlerts(newAlerts);
        return newAlerts;
    };

    // Marcar alerta como leída
    const markAlertAsRead = (alertId) => {
        setAlerts(prev => prev.map(alert => 
            alert.id === alertId ? { ...alert, read: true } : alert
        ));
    };

    // Limpiar todas las alertas
    const clearAllAlerts = () => {
        setAlerts([]);
    };

    // === FUNCIONES PARA ESTADÍSTICAS ===

    // Obtener resumen de presupuestos
    const getBudgetSummary = () => {
        const activeBudgets = budgets.filter(budget => budget.isActive);
        const totalLimit = activeBudgets.reduce((sum, budget) => sum + budget.limit, 0);
        const totalSpent = activeBudgets.reduce((sum, budget) => 
            sum + getCategoryExpenses(budget.category, budget.period), 0
        );

        return {
            totalBudgets: activeBudgets.length,
            totalLimit,
            totalSpent,
            totalRemaining: totalLimit - totalSpent,
            averageUsage: totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0
        };
    };

    // Obtener resumen de metas de ahorro
    const getSavingsSummary = () => {
        const activeGoals = savingsGoals.filter(goal => !goal.isCompleted);
        const totalTarget = activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
        const totalCurrent = activeGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);

        return {
            totalGoals: savingsGoals.length,
            completedGoals: savingsGoals.filter(goal => goal.isCompleted).length,
            activeGoals: activeGoals.length,
            totalTarget,
            totalCurrent,
            totalRemaining: totalTarget - totalCurrent,
            completionRate: totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0
        };
    };

    const value = {
        // Estados
        budgets,
        savingsGoals,
        alerts,

        // Funciones de presupuestos
        addBudget,
        updateBudget,
        deleteBudget,
        toggleBudgetStatus,

        // Funciones de metas de ahorro
        addSavingsGoal,
        updateSavingsGoal,
        deleteSavingsGoal,
        addToSavingsGoal,

        // Funciones de análisis
        getCategoryExpenses,
        getBudgetProgress,
        checkBudgetAlerts,
        generateAlerts,
        markAlertAsRead,
        clearAllAlerts,

        // Funciones de estadísticas
        getBudgetSummary,
        getSavingsSummary
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget debe ser usado dentro de BudgetProvider');
    }
    return context;
};
