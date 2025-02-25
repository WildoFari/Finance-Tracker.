import React, { useState, useEffect } from 'react';
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
                setInvestments([]); // Evita errores si los datos están corruptos
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

    return (
        <div className="container mt-4">
            <h2 className="fw-bold text-center">📈 Gestión de Inversiones</h2>

            {/* Componente para agregar inversiones */}
            <AddInvestment addInvestment={addInvestment} existingInvestments={investments} />

            {/* Botón para desplegar la lista de inversiones */}
            <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => setMostrarInversiones(!mostrarInversiones)}
            >
                {mostrarInversiones ? "Ocultar Inversiones ⬆️" : "Mostrar Inversiones ⬇️"}
            </button>

            {/* Lista desplegable de inversiones */}
            {mostrarInversiones && (
                <div className="mt-3">
                    {investments.length === 0 ? (
                        <p className="text-center text-muted">No hay inversiones registradas.</p>
                    ) : (
                        investments.map((inv) => (
                            <ManageInvestment key={inv.id} investment={inv} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Inversiones;
