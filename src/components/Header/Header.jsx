import React, { useState, useEffect } from 'react';
import './Header.module.css';

const Header = ({ onAudioToggle, isAudioPlaying }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="headerContainer">
        <div className="logo">
          <img src="/imagenes/logo con tikay.jpeg" alt="Tikay Logo" />
          <span>Tikay Cafetería & Restaurante</span>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? 'mobileOpen' : ''}`}>
          <ul className="navList">
            <li><button onClick={() => scrollToSection('inicio')}>Inicio</button></li>
            <li><button onClick={() => scrollToSection('menu')}>Menú</button></li>
            <li><button onClick={() => scrollToSection('reservas')}>Reservas</button></li>
            <li><button onClick={() => scrollToSection('contacto')}>Contacto</button></li>
          </ul>
        </nav>

        <div className="headerControls">
          {/* Botón de audio eliminado */}
          <button 
            className="mobileMenuButton"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas fa-${isMobileMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 