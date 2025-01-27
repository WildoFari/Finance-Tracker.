import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    // Cargar categorías desde localStorage
    const loadCategoriesFromLocalStorage = () => {
        const storedCategories = localStorage.getItem('categories');
        return storedCategories
            ? JSON.parse(storedCategories)
            : ['Comida', 'Alquiler', 'Transporte', 'Entretenimiento', 'Salud'];
    };

    const [categories, setCategories] = useState(loadCategoriesFromLocalStorage());

    // Persistir categorías en localStorage
    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const [transactions, setTransactions] = useState([]);

    // Agregar una transacción
    const addTransaction = (transaction) => {
        setTransactions((prev) => [...prev, transaction]);
    };

    // Agregar una categoría
    const addCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories((prev) => [...prev, category]);
        }
    };

    // Eliminar una categoría
    const deleteCategory = (category) => {
        setCategories((prev) => prev.filter((cat) => cat !== category));
    };

    // Calcular ingresos y egresos dinámicamente
    const ingresos = transactions
        .filter((t) => t.type === 'Ingreso')
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const egresos = transactions
        .filter((t) => t.type === 'Egreso')
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                addTransaction,
                categories,
                addCategory,
                deleteCategory,
                ingresos,
                egresos,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};