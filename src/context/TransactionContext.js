import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([
        'Comida',
        'Alquiler',
        'Transporte',
        'Entretenimiento',
        'Salud',
        'Educación',
        'Gimnasio',
        'Ropa',
        'Viajes',
    ]); // Categorías predeterminadas

    const addTransaction = (transaction) => {
        setTransactions((prev) => [...prev, transaction]);
    };

    const addCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories((prev) => [...prev, category]);
        }
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, categories, addCategory }}>
            {children}
        </TransactionContext.Provider>
    );
};