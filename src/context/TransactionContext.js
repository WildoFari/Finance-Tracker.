import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const loadCategoriesFromLocalStorage = () => {
        const storedCategories = localStorage.getItem('categories');
        return storedCategories
            ? JSON.parse(storedCategories)
            : ['Comida', 'Alquiler', 'Transporte', 'Entretenimiento', 'Salud'];
    };

    const [categories, setCategories] = useState(loadCategoriesFromLocalStorage());

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const [transactions, setTransactions] = useState([]);

    const addTransaction = (transaction) => {
        setTransactions((prev) => [...prev, transaction]);
    };

    const addCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories((prev) => [...prev, category]);
        }
    };

    const deleteCategory = (category) => {
        setCategories((prev) => prev.filter((cat) => cat !== category));
    };

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                addTransaction,
                categories,
                addCategory,
                deleteCategory,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};