import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h1 className="logo">SpotifyCopia</h1>
        <ul className="nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/search">Buscar</a></li>
          <li><a href="/library">Tu Biblioteca</a></li>
          <li><a href="/playlists">Tus Playlists</a></li>
        </ul>
       
      </div>
    </div>
  );
}

export default Navbar;