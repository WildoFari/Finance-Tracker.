import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';


const AddTransaction = () => {
    const { addTransaction, categories, addCategory } = useContext(TransactionContext);
    const [form, setForm] = useState({
        amount: '',
        category: '',
        date: '',
        type: 'Ingreso',
    });
    const [newCategory, setNewCategory] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [error, setError] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() === '') {
            setError('La categoría no puede estar vacía.');
            return;
        }

        if (categories.includes(newCategory)) {
            setError('Esta categoría ya existe.');
            return;
        }

        addCategory(newCategory);
        setNewCategory('');
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.amount && form.category && form.date) {
            addTransaction(form);
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
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Nueva Categoría</label>
                <div className="input-group">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="form-control"
                        placeholder="Agregar nueva categoría"
                    />
                    <button type="button" className="btn btn-secondary" onClick={handleAddCategory}>
                        Agregar
                    </button>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
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