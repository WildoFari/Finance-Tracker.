import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
    const location = useLocation();
    const [theme, setTheme] = useState('dark');
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    const closeMenu = () => setMenuOpen(false);

    const navLinks = [
        { path: '/', label: 'Inicio' },
        { path: '/Ingresos', label: 'Ingresos' },
        { path: '/Egresos', label: 'Egresos' },
        { path: '/Graficos', label: 'Gráficos' },
        { path: '/Inversiones', label: 'Propiedades' },
    ];

    return (
        <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme} shadow`}>
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center fw-bold" to="/" onClick={closeMenu}>
                    <img
                        src="/finanzas-logo.svg"
                        alt="Logo"
                        style={{
                            width: '35px',
                            marginRight: '10px',
                            filter: theme === 'dark' ? 'invert(1)' : 'none',
                            transition: 'filter 0.3s ease-in-out'
                        }}
                    />
                    Finanzas
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                >
                    {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>

                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav mx-auto text-center">
                        {navLinks.map(({ path, label }, index) => (
                            <li className="nav-item" key={index}>
                                <Link
                                    className={`nav-link px-3 fw-semibold ${location.pathname === path
                                        ? ''
                                        : ''
                                        }`}
                                    to={path}
                                    onClick={closeMenu}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="ms-auto d-flex align-items-center">
                        <button
                            className={`btn btn-outline-${theme === 'dark' ? 'light' : 'dark'} me-2`}
                            onClick={toggleTheme}
                        >
                            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            <style>
                {`
                /* Ajuste del navbar en mobile */
                @media (max-width: 992px) {
                    .navbar-nav {
                        width: 100%;
                        text-align: center;
                    }

                    .navbar-nav .nav-item {
                        padding: 8px 0;
                    }

                    /* Ajustar alineación del elemento activo en mobile */
                    .navbar-nav .nav-link.active {
                        background-color: rgba(0, 0, 0, 0.1);
                        border-left: 4px solid #007bff;
                        padding: 10px;
                        border-radius: 5px;
                        font-weight: bold;
                        transition: all 0.3s ease-in-out;
                    }

                    /* Animación suave en la apertura del menú */
                    .collapse:not(.show) {
                        display: none;
                    }
                }

                /* Efecto en hover para los enlaces */
                .nav-link {
                    transition: color 0.3s ease-in-out;
                }

                .nav-link:hover {
                    color: #007bff !important;
                }
                `}
            </style>
        </nav>
    );
};

export default NavBar;
