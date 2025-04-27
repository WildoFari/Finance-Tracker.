import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

const TransactionTable = () => {
    const { transactions } = useContext(TransactionContext);
    const [showMobileList, setShowMobileList] = useState(false);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Listado de Transacciones', 14, 10);

        const tableColumn = ['Fecha', 'Categoría', 'Monto', 'Tipo'];
        const tableRows = transactions.map((transaction) => [
            transaction.date,
            transaction.category,
            `${transaction.amount.toLocaleString('es-ES')}`,
            transaction.type,
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [44, 62, 80], textColor: 255 },
        });

        doc.save('transacciones.pdf');
    };


    return (
        <div className="container my-4">
            <button
                className={`btn w-100 fw-bold py-3 mb-3 d-md-none ${showMobileList ? 'btn-primary text-white' : 'btn-outline-primary'}`}
                onClick={() => setShowMobileList(!showMobileList)}
            >
                Listado de Transacciones
                <i className={`ms-2 fas ${showMobileList ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>

            <div className="table-responsive d-none d-md-block">
                <table className="table table-striped table-hover shadow-sm rounded">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Categoría</th>
                            <th>Monto</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction, index) => (
                                <tr key={index} className="align-middle">
                                    <td>{index + 1}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.category}</td>
                                    <td className={transaction.type === 'Ingreso' ? 'text-success' : 'text-danger'}>
                                        {transaction.amount.toLocaleString('es-ES')}
                                    </td>
                                    <td>{transaction.type}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No hay transacciones registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showMobileList && (
                <div className="d-block d-md-none">
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <div key={index} className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{transaction.category}</h5>
                                    <p className="mb-1"><strong>Fecha:</strong> {transaction.date}</p>
                                    <p className={`mb-1 ${transaction.type === 'Ingreso' ? 'text-success' : 'text-danger'}`}>
                                        <strong>Monto:</strong> {transaction.amount.toLocaleString('es-ES')}
                                    </p>
                                    <p className="mb-0"><strong>Tipo:</strong> {transaction.type}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-warning text-center">
                            No hay transacciones registradas.
                        </div>
                    )}
                </div>
            )}

            <div className="text-center mt-4 d-flex justify-content-center">
                <button
                    className="btn btn-danger fw-bold px-4 py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    onClick={exportToPDF}
                    style={{ transition: "all 0.3s ease-in-out" }}
                    onMouseEnter={(e) => e.target.classList.add("shadow-lg")}
                    onMouseLeave={(e) => e.target.classList.remove("shadow-lg")}
                >
                    <FaFilePdf size={20} />
                    Exportar a PDF
                </button>
            </div>

            <style jsx>{`
                .table-hover tbody tr:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }

                .btn-danger:hover {
                    transform: scale(1.05);
                    transition: 0.3s ease-in-out;
                }

                .card {
                    border-radius: 10px;
                    transition: all 0.3s ease-in-out;
                }

                .card:hover {
                    transform: scale(1.02);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
};

export default TransactionTable;
