import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const AddTransaction = () => {
    const { addTransaction } = useContext(TransactionContext);

    const [form, setForm] = useState({
        amount: '',
        category: '',
        date: '',
        type: 'Ingreso', // Default: 'Ingreso' or 'Egreso'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.amount && form.category && form.date) {
            addTransaction(form); // Agrega la transacción al contexto
            setForm({ amount: '', category: '', date: '', type: 'Ingreso' });
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container my-4">
            <h2 className="text-center">Agregar Transacción</h2>
            <div className="mb-3">
                <label className="form-label">Monto</label>
                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ingrese el monto"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Categoría</label>
                <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ej: Comida, Alquiler, etc."
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="Ingreso">Ingreso</option>
                    <option value="Egreso">Egreso</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
                Agregar
            </button>
        </form>
    );
};

export default AddTransaction;