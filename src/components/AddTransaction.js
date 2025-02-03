import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTransaction = () => {
    const { addTransaction, categories, addCategory, deleteCategory } = useContext(TransactionContext);
    const [form, setForm] = useState({
        amount: '',
        category: '',
        date: '',
        type: 'Ingreso',
    });
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState('');
    const [loadingTransaction, setLoadingTransaction] = useState(false);
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState({});
    const [showCategories, setShowCategories] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAmountChange = (e) => {
        let rawValue = e.target.value.replace(/\D/g, '');
        let formattedValue = new Intl.NumberFormat('es-ES').format(rawValue);
        setForm({ ...form, amount: formattedValue });
    };

    const handleAddCategory = () => {
        if (newCategory.trim() === '') {
            setError('La categoría no puede estar vacía.');
            return;
        }
        if (categories.includes(newCategory)) {
            setError('Esta categoría ya existe.');
            return;
        }

        setLoadingCategory(true);
        setTimeout(() => {
            addCategory(newCategory);
            toast.success(`Categoría "${newCategory}" agregada con éxito.`);
            setNewCategory('');
            setError('');
            setLoadingCategory(false);
        }, 1000);
    };

    const handleDeleteCategory = (category) => {
        setLoadingDelete((prev) => ({ ...prev, [category]: true }));
        setTimeout(() => {
            deleteCategory(category);
            toast.info(`Categoría "${category}" eliminada.`);
            setLoadingDelete((prev) => ({ ...prev, [category]: false }));
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.amount && form.category && form.date) {
            setLoadingTransaction(true);
            setTimeout(() => {
                addTransaction(form);
                toast.success('Transacción agregada con éxito.');
                setForm({ amount: '', category: '', date: '', type: 'Ingreso' });
                setLoadingTransaction(false);
            }, 1000);
        } else {
            toast.error('Por favor, completa todos los campos.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container my-4">
            <h2 className="text-center">Agregar Transacción</h2>
            <div className="mb-3">
                <label className="form-label">Monto</label>
                <input
                    type="text"
                    name="amount"
                    value={form.amount}
                    onChange={handleAmountChange}
                    className="form-control"
                    placeholder="Ingrese el monto"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Categoría</label>
                <select name="category" value={form.category} onChange={handleChange} className="form-select">
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
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
                    <button
                        type="button"
                        className={`btn btn-${loadingCategory ? 'dark' : 'primary'}`}
                        onClick={handleAddCategory}
                        disabled={loadingCategory || newCategory.trim() === ''}
                    >
                        {loadingCategory ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Agregando...
                            </>
                        ) : (
                            "Agregar"
                        )}
                    </button>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select name="type" value={form.type} onChange={handleChange} className="form-select">
                    <option value="Ingreso">Ingreso</option>
                    <option value="Egreso">Egreso</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loadingTransaction}>
                {loadingTransaction ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Agregando...
                    </>
                ) : (
                    "Agregar"
                )}
            </button>
            <div className="mt-4">
                <h4
                    className="d-flex justify-content-between align-items-center bg-light p-2 rounded"
                    onClick={() => setShowCategories(!showCategories)}
                    style={{ cursor: 'pointer' }}
                >
                    Categorías Existentes
                    <i className={`fas ${showCategories ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </h4>

                {showCategories && (
                    <ul className="list-group">
                        {categories.map((category, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {category}
                                <button
                                    className={`btn btn-sm ${loadingDelete[category] ? 'btn-secondary' : 'btn-danger'}`}
                                    onClick={() => {
                                        if (window.confirm(`¿Seguro que quieres eliminar la categoría "${category}"?`)) {
                                            handleDeleteCategory(category);
                                        }
                                    }}
                                    disabled={loadingDelete[category]}
                                >
                                    {loadingDelete[category] ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Eliminando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-trash-alt me-1"></i> Eliminar
                                        </>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ToastContainer />
        </form>
    );
};

export default AddTransaction;