import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const [theme, setTheme] = useState('dark');
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" onClick={closeMenu}>
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
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" onClick={closeMenu}>
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/ingresos' ? 'active' : ''}`} to="/ingresos" onClick={closeMenu}>
                                Ingresos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/egresos' ? 'active' : ''}`} to="/egresos" onClick={closeMenu}>
                                Egresos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/graficos' ? 'active' : ''}`} to="/graficos" onClick={closeMenu}>
                                Gráficos
                            </Link>
                        </li>
                    </ul>

                    <div className="ms-auto d-flex align-items-center">
                        <button className={`btn btn-outline-${theme === 'dark' ? 'light' : 'dark'} me-2`} onClick={toggleTheme}>
                            {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
