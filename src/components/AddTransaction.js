import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
                const formattedAmount = parseFloat(form.amount.replace(/\./g, '')) || 0;
                addTransaction({ ...form, amount: formattedAmount });
                toast.success('Transacción agregada con éxito.');
                setForm({ amount: '', category: '', date: '', type: 'Ingreso' });
                setLoadingTransaction(false);
            }, 1000);
        } else {
            toast.error('Por favor, completa todos los campos.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container my-4 p-4 border rounded shadow">
            <h4 className="text-center fw-bold mb-3">Agregar Transacción</h4>
            <div className="mb-3">
                <label className="form-label fw-semibold">Monto</label>
                <input
                    type="tel"
                    name="amount"
                    value={form.amount}
                    onChange={handleAmountChange}
                    className="form-control shadow-sm"
                    placeholder="Ingrese el monto"
                    inputMode="numeric"
                />
            </div>
            <div className="mb-3">
                <label className="form-label fw-semibold">Categoría</label>
                <select name="category" value={form.category} onChange={handleChange} className="form-select shadow-sm">
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold">Nueva Categoría</label>
                <div className="input-group">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="form-control shadow-sm"
                        placeholder="Agregar nueva categoría"
                    />
                    <button
                        type="button"
                        className={`btn btn-${loadingCategory ? 'dark' : 'primary'}`}
                        onClick={handleAddCategory}
                        disabled={loadingCategory}
                    >
                        {loadingCategory ? (
                            <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                            <FaPlus />
                        )}
                    </button>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold">Fecha</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control shadow-sm" />
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold">Tipo</label>
                <select name="type" value={form.type} onChange={handleChange} className="form-select shadow-sm">
                    <option value="Ingreso">Ingreso</option>
                    <option value="Egreso">Egreso</option>
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                disabled={loadingTransaction}
                style={{
                    transition: 'all 0.3s ease-in-out',
                    borderRadius: '10px',
                    padding: '12px',
                    boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                onMouseEnter={(e) => e.target.classList.add("shadow-lg")}
                onMouseLeave={(e) => e.target.classList.remove("shadow-lg")}
                onMouseDown={(e) => e.target.style.transform = 'scale(0.97)'}
                onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            >
                {loadingTransaction ? (
                    <>
                        <span className="spinner-border spinner-border-sm" style={{ animation: 'spin 0.6s linear infinite' }}></span>
                        <span style={{ opacity: 1, transition: 'opacity 0.3s ease-in-out' }}>
                            Cargando...
                        </span>
                    </>
                ) : (
                    "Agregar"
                )}
            </button>

            <div className="mt-4">
                <h5
                    className="btn btn-outline-primary w-100 fw-bold d-flex justify-content-between align-items-center px-3 py-2"
                    onClick={() => setShowCategories(!showCategories)}
                    style={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0, 123, 255, 0.2)',
                    }}
                    onMouseEnter={(e) => e.target.classList.add("shadow-lg")}
                    onMouseLeave={(e) => e.target.classList.remove("shadow-lg")}
                >
                    Categorías Existentes
                    <span style={{ transition: 'transform 0.3s ease-in-out' }}>
                        {showCategories ? <FaChevronUp className="rotate-icon" /> : <FaChevronDown className="rotate-icon" />}
                    </span>
                </h5>

                {showCategories && (
                    <ul className="list-group">
                        {categories.map((category, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {category}
                                <button
                                    className={`btn btn-sm ${loadingDelete[category] ? 'btn-secondary' : 'btn-danger'}`}
                                    onClick={() => handleDeleteCategory(category)}
                                    disabled={loadingDelete[category]}
                                >
                                    {loadingDelete[category] ? (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    ) : (
                                        <FaTrashAlt />
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
