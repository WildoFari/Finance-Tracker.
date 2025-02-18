import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaGhost } from "react-icons/fa";

const NotFound = () => (
    <div className="container my-5 text-center">
        <div className="d-flex flex-column align-items-center">
            <FaExclamationTriangle size={80} className="text-warning mb-3 animate__animated animate__flash" />
            <h1 className="display-1 fw-bold text-danger animate__animated animate__wobble">404</h1>
            <h3 className="mb-3">Oops! Página no encontrada</h3>
            <p className="lead text-muted">
                Soy <span className="fw-bold text-primary">WilDev</span> y aún estoy trabajando en esta sección.
            </p>

            <div className="text-muted mb-3">
                <FaGhost size={50} className="mb-2 text-secondary" />
                <p className="fst-italic">Tal vez la página se fue a comprar café... ☕</p>
                <p className="fst-italic">O está escondida en el código fuente... 🤔</p>
            </div>

            <Link to="/" className="btn btn-lg btn-outline-primary mt-3 px-4 shadow-sm">
                Volver al Inicio
            </Link>
        </div>

        <style>
            {`
                .btn-outline-primary:hover {
                    background-color: #007bff !important;
                    color: white !important;
                    transform: scale(1.05);
                    transition: all 0.3s ease-in-out;
                }

                .text-muted p {
                    font-size: 1.1rem;
                }

                .animate__wobble {
                    animation-duration: 1.5s;
                }
            `}
        </style>
    </div>
);

export default NotFound;
