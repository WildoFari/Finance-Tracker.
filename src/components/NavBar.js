import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/finanzas-logo.svg"
                        alt="Logo"
                        style={{
                            width: '30px',
                            marginRight: '10px',
                            filter: theme === 'dark' ? 'invert(1)' : 'none',
                        }}
                    />
                    Gestión De Finanzas
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                to="/"
                                aria-current={location.pathname === '/' ? 'page' : undefined}
                            >
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/ingresos' ? 'active' : ''}`}
                                to="/ingresos"
                                aria-current={location.pathname === '/ingresos' ? 'page' : undefined}
                            >
                                Ingresos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/egresos' ? 'active' : ''}`}
                                to="/egresos"
                                aria-current={location.pathname === '/egresos' ? 'page' : undefined}
                            >
                                Egresos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/graficos' ? 'active' : ''}`}
                                to="/graficos"
                                aria-current={location.pathname === '/graficos' ? 'page' : undefined}
                            >
                                Gráficos
                            </Link>
                        </li>
                    </ul>
                    <div className="ms-auto d-flex align-items-center">
                        <button
                            className={`btn btn-outline-${theme === 'dark' ? 'light' : 'dark'} me-2`}
                            onClick={toggleTheme}
                        >
                            {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                        </button>
                        {/* <div className="dropdown">
                            <button
                                className={`btn btn-${theme} dropdown-toggle`}
                                id="userDropdown"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Usuario
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-${theme}`} aria-labelledby="userDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/perfil">
                                        Perfil
                                    </Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/logout">
                                        Cerrar sesión
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;