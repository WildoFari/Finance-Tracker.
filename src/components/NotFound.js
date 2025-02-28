import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaGhost, FaArrowLeft } from "react-icons/fa";

const NotFound = () => (
    <div className="container my-5 text-center">
        <div className="d-flex flex-column align-items-center">
            <FaExclamationTriangle size={90} className="text-warning mb-3 animate__animated animate__flash animate__infinite" />
            <h1 className="display-1 fw-bold text-danger animate__animated animate__tada animate__repeat-2">404</h1>
            <h3 className="mb-3 fw-bold text-uppercase text-warning animate__animated animate__heartBeat animate__infinite">
                ¡Oops! Página Perdida
            </h3>
            <p className="lead text-muted fs-5 animate__animated animate__fadeInUp animate__delay-1s">
                Soy <span className="fw-bold text-primary">WilDev</span> y aún estoy trabajando en esta sección.
                <br />
                Mientras tanto, disfruta de este 404 con estilo. 😎
            </p>

            <div className="text-muted mb-4 animate__animated animate__bounceIn">
                <FaGhost size={60} className="mb-2 text-secondary animate__animated animate__shakeX animate__repeat-3" />
                <p className="fst-italic fw-bold text-info animate__animated animate__pulse animate__infinite">
                    Tal vez la página se fue a comprar café... ☕
                </p>
                <p className="fst-italic fw-bold text-danger animate__animated animate__jello animate__repeat-2">
                    O se perdió en el código fuente... 🤔
                </p>
            </div>

            <Link
                to="/"
                className="btn btn-lg btn-warning text-dark fw-bold px-5 py-3 shadow-lg d-flex align-items-center gap-3 animate__animated animate__rubberBand animate__delay-2s"
                onMouseEnter={(e) => e.target.classList.add("animate__heartBeat")}
                onMouseLeave={(e) => e.target.classList.remove("animate__heartBeat")}
                style={{ transition: "all 0.3s ease-in-out", borderRadius: "10px" }}
            >
                <FaArrowLeft size={20} />
                Volver al Inicio
            </Link>
        </div>

        <style>
            {`
                .btn-warning:hover {
                    background-color: #ff6f00 !important;
                    color: white !important;
                    transform: scale(1.1);
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0 4px 15px rgba(255, 111, 0, 0.6);
                }

                .text-muted p {
                    font-size: 1.2rem;
                }

                .animate__infinite {
                    animation-iteration-count: infinite;
                }

                .animate__repeat-2 {
                    animation-iteration-count: 2;
                }

                .animate__repeat-3 {
                    animation-iteration-count: 3;
                }
            `}
        </style>
    </div>
);

export default NotFound;
