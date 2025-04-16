import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>SpotifyCopia</h1>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/search">Buscar</a></li>
        <li><a href="/library">Tu Biblioteca</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;