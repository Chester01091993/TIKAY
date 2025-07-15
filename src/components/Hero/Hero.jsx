import React from 'react';
import './Hero.module.css';

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="heroBackground">
        <img src="/imagenes/banner_restaurante.avif" alt="Tikay Restaurante" />
        <div className="heroOverlay"></div>
      </div>
      
      <div className="heroContent">
        <div className="heroText">
          <h1 className="heroTitle">
            <span className="highlight">Tikay</span> Cafetería & Restaurante
          </h1>
          <p className="heroSubtitle">
            Sabor auténtico peruano en el corazón de Pachacámac
          </p>
          <p className="heroDescription">
            Disfruta de nuestra deliciosa comida tradicional peruana, 
            preparada con ingredientes frescos y recetas que han pasado 
            de generación en generación.
          </p>
          
          <div className="heroButtons">
            <button 
              className="primaryButton"
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Menú
            </button>
            <button 
              className="secondaryButton"
              onClick={() => document.getElementById('reservas').scrollIntoView({ behavior: 'smooth' })}
            >
              Hacer Reserva
            </button>
          </div>
        </div>
        
        <div className="heroFeatures">
          <div className="feature">
            <i className="fas fa-utensils"></i>
            <span>Cocina Peruana</span>
          </div>
          <div className="feature">
            <i className="fas fa-clock"></i>
            <span>Abierto 7 días</span>
          </div>
          <div className="feature">
            <i className="fas fa-star"></i>
            <span>Calidad Premium</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 