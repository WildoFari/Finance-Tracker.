import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const Ingresos = () => {
    const { transactions } = useContext(TransactionContext);

    const ingresos = transactions.filter((t) => t.type === 'Ingreso');

    return (
        <div>
            <h2 className="text-center">Lista de Ingresos</h2>
            <ul className="list-group mt-3">
                {ingresos.length > 0 ? (
                    ingresos.map((ingreso, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <span>{ingreso.category} - {ingreso.date}</span>
                            <span className="text-success fw-bold">${ingreso.amount.toLocaleString('es-ES')}</span>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-center text-muted">
                        No hay ingresos registrados.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Ingresos;
