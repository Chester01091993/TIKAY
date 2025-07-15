import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import useNotification from '../../hooks/useNotification';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Notification from '../Notification/Notification';
import './ReservationSection.module.css';

const ReservationSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: 2,
    mensaje: ''
  });

  const [reservas, setReservas] = useLocalStorage('tikayReservas', []);
  const { notification, showSuccess, showError } = useNotification();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      showError('El nombre es obligatorio');
      return false;
    }
    if (!formData.email.trim()) {
      showError('El email es obligatorio');
      return false;
    }
    if (!formData.telefono.trim()) {
      showError('El teléfono es obligatorio');
      return false;
    }
    if (!formData.fecha) {
      showError('La fecha es obligatoria');
      return false;
    }
    if (!formData.hora) {
      showError('La hora es obligatoria');
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('El formato del email no es válido');
      return false;
    }

    // Validar que la fecha no sea anterior a hoy
    const selectedDate = new Date(formData.fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      showError('La fecha no puede ser anterior a hoy');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const nuevaReserva = {
      id: Date.now(),
      ...formData,
      fechaCreacion: new Date().toISOString(),
      estado: 'pendiente'
    };

    setReservas([...reservas, nuevaReserva]);

    // Limpiar formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      fecha: '',
      hora: '',
      personas: 2,
      mensaje: ''
    });

    showSuccess('¡Reserva confirmada exitosamente!');
  };

  const handleDeleteReserva = (id) => {
    const reservasActualizadas = reservas.filter(reserva => reserva.id !== id);
    setReservas(reservasActualizadas);
    localStorage.setItem('tikayReservas', JSON.stringify(reservasActualizadas));
  };

  return (
    <section id="reservas" className="reservationSection">
      <div className="reservationContainer">
        <div className="reservationHeader">
          <h2 className="reservationTitle">Reserva tu Mesa</h2>
          <p className="reservationSubtitle">
            Asegura tu lugar en Tikay Cafetería & Restaurante
          </p>
        </div>

        <div className="reservationContent">
          <div className="reservationForm">
            <form onSubmit={handleSubmit}>
              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="telefono">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+51 999 999 999"
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="personas">Número de Personas</label>
                  <select
                    id="personas"
                    name="personas"
                    value={formData.personas}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'persona' : 'personas'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="fecha">Fecha *</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="hora">Hora *</label>
                  <select
                    id="hora"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona una hora</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="formGroup">
                <label htmlFor="mensaje">Mensaje Especial (Opcional)</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  placeholder="Algún requerimiento especial, celebración, etc."
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="submitButton">
                <i className="fas fa-calendar-check"></i>
                Confirmar Reserva
              </button>
            </form>
          </div>

          <div className="reservationInfo">
            <div className="infoCard">
              <i className="fas fa-clock"></i>
              <h3>Horarios</h3>
              <p>Lunes a Domingo</p>
              <p>12:00 PM - 10:00 PM</p>
            </div>
            
            <div className="infoCard">
              <i className="fas fa-phone"></i>
              <h3>Contacto Directo</h3>
              <p>+51 999 999 999</p>
              <p>reservas@tikay.com</p>
            </div>
            
            <div className="infoCard">
              <i className="fas fa-users"></i>
              <h3>Capacidad</h3>
              <p>Hasta 50 personas</p>
              <p>Grupos y eventos</p>
            </div>
          </div>
        </div>

        {reservas.length > 0 && (
          <div className="reservasList">
            <h3>Mis Reservas</h3>
            <div className="reservasGrid">
              {reservas.map(reserva => (
                <div key={reserva.id} className="reservaCard">
                  <div className="reservaHeader">
                    <h4>{reserva.nombre}</h4>
                    <button
                      onClick={() => handleDeleteReserva(reserva.id)}
                      className="deleteButton"
                      title="Cancelar reserva"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="reservaDetails">
                    <p><i className="fas fa-calendar"></i> {new Date(reserva.fecha).toLocaleDateString()}</p>
                    <p><i className="fas fa-clock"></i> {reserva.hora}</p>
                    <p><i className="fas fa-users"></i> {reserva.personas} personas</p>
                    <p><i className="fas fa-envelope"></i> {reserva.email}</p>
                    <p><i className="fas fa-phone"></i> {reserva.telefono}</p>
                  </div>
                  {reserva.mensaje && (
                    <div className="reservaMensaje">
                      <p><strong>Mensaje:</strong> {reserva.mensaje}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notificación */}
      <Notification notification={notification} />
    </section>
  );
};

export default ReservationSection; 