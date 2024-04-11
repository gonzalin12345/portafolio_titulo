import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Logo</div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/registro" className="nav-link">Registro</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/buscar" className="nav-link">Buscar</Link>
          </li>
          <li className="nav-item">
            <Link to="/listar" className="nav-link">Listar</Link>
          </li>
          <li className="nav-item">
            <Link to="/editar" className="nav-link">Editar</Link>
          </li>
          <li className="nav-item">
            <Link to="/delete" className="nav-link">Eliminar</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
