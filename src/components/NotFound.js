import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="container my-5 text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h3 className="mb-3">Oops! Página no encontrada</h3>
        <p className="lead text-muted">Soy WilDev y aún estoy trabajando en esta sección.</p>

        <Link to="/" className="btn btn-primary mt-3">
            Volver al Inicio
        </Link>
    </div>
);

export default NotFound;
