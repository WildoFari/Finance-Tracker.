import React, { useState, useEffect } from 'react';
import { FaChartLine, FaChevronUp, FaChevronDown, FaInfoCircle } from 'react-icons/fa';
import AddInvestment from '../components/AddInvestment';
import ManageInvestment from '../components/ManageInvestment';

const Inversiones = () => {
    const [investments, setInvestments] = useState([]);
    const [mostrarInversiones, setMostrarInversiones] = useState(false);

    useEffect(() => {
        const storedInvestments = localStorage.getItem('investments');
        if (storedInvestments) {
            try {
                setInvestments(JSON.parse(storedInvestments));
            } catch (error) {
                console.error("Error al leer localStorage:", error);
                setInvestments([]);
            }
        }
    }, []);

    useEffect(() => {
        if (investments.length > 0) {
            localStorage.setItem('investments', JSON.stringify(investments));
        }
    }, [investments]);

    const addInvestment = (newInvestment) => {
        const updatedInvestments = [...investments, newInvestment];
        setInvestments(updatedInvestments);
    };

    const handleDeleteInvestment = (investmentId) => {
        if (!window.confirm("¿Estás seguro de eliminar esta inversión? Esta acción no se puede deshacer.")) {
            return;
        }

        const updatedInvestments = investments.filter(inv => inv.id !== investmentId);
        setInvestments(updatedInvestments);
        localStorage.setItem('investments', JSON.stringify(updatedInvestments));
    };


    return (
        <div className="container-sm mt-4 mb-6">
            <h2 className="fw-bold text-center mb-4 text-primary">
                <FaChartLine className="me-2" />
                Gestión de Inversiones
            </h2>

            <div className="mb-4">
                <AddInvestment addInvestment={addInvestment} existingInvestments={investments} />
            </div>

            <div className="d-grid gap-2">
                <button
                    className={`btn ${mostrarInversiones ? "btn-outline-secondary" : "btn-primary"}`}
                    onClick={() => setMostrarInversiones(!mostrarInversiones)}
                >
                    {mostrarInversiones ? (
                        <>
                            <FaChevronUp className="me-2" />
                            Ocultar Inversiones
                        </>
                    ) : (
                        <>
                            <FaChevronDown className="me-2" />
                            Mostrar Inversiones
                        </>
                    )}
                </button>
            </div>

            {mostrarInversiones && (
                <div className="mt-4">
                    {investments.length === 0 ? (
                        <div className="alert alert-info text-center">
                            <FaInfoCircle className="me-2" />
                            No hay inversiones registradas.
                        </div>
                    ) : (
                        <div className="list-group">
                            {investments.map((inv) => (
                                <ManageInvestment
                                    key={inv.id}
                                    investment={inv}
                                    onDelete={() => handleDeleteInvestment(inv.id)}
                                    className="list-group-item list-group-item-action"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Inversiones;
