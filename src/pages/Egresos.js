import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const Egresos = () => {
    const { transactions } = useContext(TransactionContext);

    const egresos = transactions.filter((t) => t.type === 'Egreso');

    return (
        <div>
            <h2 className="text-center">Lista de Egresos</h2>
            <ul className="list-group mt-3">
                {egresos.length > 0 ? (
                    egresos.map((egreso, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <span>{egreso.category} - {egreso.date}</span>
                            <span className="text-danger fw-bold">{egreso.amount.toLocaleString('es-ES')}</span>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-center text-muted">
                        No hay egresos registrados.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Egresos;
