import React, { useState } from 'react';
import './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica para suscribir al newsletter
    alert('¡Gracias por suscribirte a nuestro newsletter!');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerContent">
          <div className="footerSection">
            <div className="footerLogo">
              <img src="/imagenes/logo con tikay.jpeg" alt="Tikay Logo" />
              <h3>Tikay Cafetería & Restaurante</h3>
            </div>
            <p className="footerDescription">
              Sabor auténtico peruano en el corazón de Pachacámac. 
              Disfruta de nuestra deliciosa comida tradicional preparada 
              con ingredientes frescos y recetas que han pasado de 
              generación en generación.
            </p>
            <div className="footerCertifications">
              <div className="certification">
                <i className="fas fa-award"></i>
                <span>Certificación Sanitaria</span>
              </div>
              <div className="certification">
                <i className="fas fa-leaf"></i>
                <span>Ingredientes Frescos</span>
              </div>
            </div>
          </div>

          <div className="footerSection">
            <h4>Enlaces Rápidos</h4>
            <ul className="footerLinks">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#menu">Menú</a></li>
              <li><a href="#reservas">Reservas</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="#galeria">Galería</a></li>
              <li><a href="#eventos">Eventos</a></li>
            </ul>
          </div>

          <div className="footerSection">
            <h4>Servicios Especiales</h4>
            <ul className="footerServices">
              <li><i className="fas fa-utensils"></i> Catering para Eventos</li>
              <li><i className="fas fa-birthday-cake"></i> Celebraciones</li>
              <li><i className="fas fa-users"></i> Grupos Grandes</li>
              <li><i className="fas fa-motorcycle"></i> Delivery</li>
              <li><i className="fas fa-gift"></i> Regalos Corporativos</li>
            </ul>
          </div>

          <div className="footerSection">
            <h4>Horarios</h4>
            <div className="footerHours">
              <div className="hourItem">
                <span>Lunes - Viernes:</span>
                <span>12:00 PM - 10:00 PM</span>
              </div>
              <div className="hourItem">
                <span>Sábados:</span>
                <span>11:00 AM - 11:00 PM</span>
              </div>
              <div className="hourItem">
                <span>Domingos:</span>
                <span>11:00 AM - 9:00 PM</span>
              </div>
              <p className="footerNote">
                * Horarios especiales en días festivos
              </p>
            </div>
          </div>

          <div className="footerSection">
            <h4>Contacto</h4>
            <div className="footerContact">
              <div className="contactItem">
                <i className="fas fa-map-marker-alt"></i>
                <span>Av. La Molina 1234, Pachacámac, Lima</span>
              </div>
              <div className="contactItem">
                <i className="fas fa-phone"></i>
                <span>+51 999 999 999</span>
              </div>
              <div className="contactItem">
                <i className="fas fa-envelope"></i>
                <span>info@tikay.com</span>
              </div>
              <div className="contactItem">
                <i className="fas fa-clock"></i>
                <span>Reservas: Lun-Dom 9AM-8PM</span>
              </div>
            </div>
          </div>

          <div className="footerSection">
            <h4>Newsletter</h4>
            <p className="newsletterText">
              Suscríbete para recibir ofertas especiales, nuevos platos y eventos exclusivos.
            </p>
            <form className="newsletterForm" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="footerMiddle">
          <div className="footerPolicies">
            <div className="policySection">
              <h5>Políticas</h5>
              <ul>
                <li><a href="#privacidad">Política de Privacidad</a></li>
                <li><a href="#terminos">Términos y Condiciones</a></li>
                <li><a href="#reservas">Política de Reservas</a></li>
                <li><a href="#cancelacion">Política de Cancelación</a></li>
              </ul>
            </div>
            <div className="policySection">
              <h5>Información</h5>
              <ul>
                <li><a href="#nosotros">Sobre Nosotros</a></li>
                <li><a href="#historia">Nuestra Historia</a></li>
                <li><a href="#chef">Nuestro Chef</a></li>
                <li><a href="#trabajo">Trabaja con Nosotros</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <div className="footerBottomContent">
            <p className="copyright">
              © {currentYear} Tikay Cafetería & Restaurante. Todos los derechos reservados.
            </p>
            <div className="footerSocial">
              <a href="https://www.instagram.com/tikay_cafeteria" target="_blank" rel="noopener noreferrer" title="Síguenos en Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/tikaycafeteria" target="_blank" rel="noopener noreferrer" title="Síguenos en Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.tiktok.com/@tikay_cafeteria" target="_blank" rel="noopener noreferrer" title="Síguenos en TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://www.youtube.com/@tikaycafeteria" target="_blank" rel="noopener noreferrer" title="Síguenos en YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 