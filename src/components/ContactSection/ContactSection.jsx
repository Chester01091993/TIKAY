import React from 'react';
import './ContactSection.module.css';

const ContactSection = () => {
  return (
    <section id="contacto" className="contactSection">
      <div className="contactContainer">
        <div className="contactHeader">
          <h2 className="contactTitle">Ubicación y Contacto</h2>
          <p className="contactSubtitle">
            Visítanos en el corazón de Pachacámac, cerca de la USIL
          </p>
        </div>

        <div className="contactContent">
          <div className="contactInfo">
            <div className="infoItem">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Dirección</h3>
                <p>Av. La Molina 1234, Pachacámac</p>
                <p>Lima, Perú</p>
                <p className="usilReference">Frente a la Universidad San Ignacio de Loyola (USIL)</p>
              </div>
            </div>

            <div className="infoItem">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Teléfono</h3>
                <p>+51 999 999 999</p>
                <p>+51 888 888 888</p>
              </div>
            </div>

            <div className="infoItem">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>info@tikay.com</p>
                <p>reservas@tikay.com</p>
              </div>
            </div>

            <div className="infoItem">
              <i className="fas fa-clock"></i>
              <div>
                <h3>Horarios</h3>
                <p><strong>Lunes a Domingo:</strong></p>
                <p>12:00 PM - 10:00 PM</p>
                <p className="note">Cerramos los días festivos</p>
              </div>
            </div>

            <div className="infoItem">
              <i className="fas fa-wifi"></i>
              <div>
                <h3>Servicios</h3>
                <p>WiFi Gratuito</p>
                <p>Estacionamiento</p>
                <p>Acceso para discapacitados</p>
              </div>
            </div>
          </div>

          <div className="mapContainer">
            <div className="mapFrame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.3712345678901!2d-76.82345678901234!3d-12.34567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIwJzQ0LjQiUyA3NsKwNDknMjQuNCJX!5e0!3m2!1ses!2spe!4v1234567890123"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Tikay Cafetería & Restaurante"
              ></iframe>
            </div>
            <div className="mapInfo">
              <h3>¿Cómo llegar?</h3>
              <p>Nos encontramos en una ubicación privilegiada en Pachacámac, muy cerca de la Universidad San Ignacio de Loyola (USIL).</p>
              <div className="directions">
                <div className="direction">
                  <i className="fas fa-car"></i>
                  <span>En auto: 15 min desde el centro de Lima</span>
                </div>
                <div className="direction">
                  <i className="fas fa-bus"></i>
                  <span>En bus: Líneas 301, 302, 303</span>
                </div>
                <div className="direction">
                  <i className="fas fa-walking"></i>
                  <span>A pie: 5 min desde la USIL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="socialLinks">
          <h3>Síguenos en Redes Sociales</h3>
          <div className="socialButtons">
            <a href="https://www.instagram.com/tikay_cafeteria" target="_blank" rel="noopener noreferrer" className="socialButton instagram">
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
            <a href="https://www.facebook.com/tikaycafeteria" target="_blank" rel="noopener noreferrer" className="socialButton facebook">
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </a>
            <a href="https://www.tiktok.com/@tikay_cafeteria" target="_blank" rel="noopener noreferrer" className="socialButton tiktok">
              <i className="fab fa-tiktok"></i>
              <span>TikTok</span>
            </a>
            <a href="https://www.youtube.com/@tikaycafeteria" target="_blank" rel="noopener noreferrer" className="socialButton youtube">
              <i className="fab fa-youtube"></i>
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 