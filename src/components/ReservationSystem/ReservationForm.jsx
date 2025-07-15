import React, { useState, useEffect } from 'react';
import styles from './ReservationForm.module.css';

const ReservationForm = ({ 
  reservation, 
  tables, 
  selectedDate, 
  selectedTime, 
  selectedTable, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    numberOfGuests: 1,
    specialRequests: '',
    occasion: '',
    isVIP: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar formulario con datos de reserva existente
  useEffect(() => {
    if (reservation) {
      setFormData({
        customerName: reservation.customerName || '',
        customerEmail: reservation.customerEmail || '',
        customerPhone: reservation.customerPhone || '',
        numberOfGuests: reservation.numberOfGuests || 1,
        specialRequests: reservation.specialRequests || '',
        occasion: reservation.occasion || '',
        isVIP: reservation.isVIP || false
      });
    }
  }, [reservation]);

  // Validaciones
  const validateForm = () => {
    console.log('Validando formulario con datos:', formData);
    const newErrors = {};

    // Validar nombre
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'El nombre es obligatorio';
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'El email es obligatorio';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.customerEmail)) {
        newErrors.customerEmail = 'El email no es válido';
      }
    }

    // Validar teléfono
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'El teléfono es obligatorio';
    } else {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
      if (!phoneRegex.test(formData.customerPhone.replace(/\s/g, ''))) {
        newErrors.customerPhone = 'El teléfono no es válido';
      }
    }

    // Validar número de personas
    if (formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = 'Debe ser al menos 1 persona';
    } else if (formData.numberOfGuests > 20) {
      newErrors.numberOfGuests = 'Máximo 20 personas por reserva';
    }

    // Validar capacidad de mesa
    if (selectedTable) {
      const table = tables.find(t => t.id === selectedTable);
      if (table && formData.numberOfGuests > table.capacity) {
        newErrors.numberOfGuests = `La mesa seleccionada solo tiene capacidad para ${table.capacity} personas`;
      }
    }

    console.log('Errores encontrados:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('Formulario válido:', isValid);
    return isValid;
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Formulario enviado con datos:', formData);
    console.log('Fecha seleccionada:', selectedDate);
    console.log('Hora seleccionada:', selectedTime);
    console.log('Mesa seleccionada:', selectedTable);
    
    if (!validateForm()) {
      console.log('Validación del formulario falló');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Llamando a onSubmit con:', formData);
      onSubmit(formData);
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      setErrors({ submit: 'Error al procesar la reserva. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener información de la mesa seleccionada
  const selectedTableInfo = tables.find(t => t.id === selectedTable);

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formModal}>
        <div className={styles.formHeader}>
          <h2>{reservation ? 'Editar Reserva' : 'Nueva Reserva'}</h2>
          <button onClick={onCancel} className={styles.closeButton}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className={styles.formSummary}>
          <div className={styles.summaryItem}>
            <i className="fas fa-calendar"></i>
            <span>{selectedDate.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className={styles.summaryItem}>
            <i className="fas fa-clock"></i>
            <span>{selectedTime}</span>
          </div>
          {selectedTableInfo && (
            <div className={styles.summaryItem}>
              <i className="fas fa-chair"></i>
              <span>{selectedTableInfo.name} - {selectedTableInfo.location}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className={styles.reservationForm}>
          <div className={styles.formSection}>
            <h3>Información del Cliente</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="customerName">
                Nombre Completo <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={errors.customerName ? styles.error : ''}
                placeholder="Ingresa el nombre completo"
                disabled={isSubmitting}
              />
              {errors.customerName && (
                <span className={styles.errorMessage}>{errors.customerName}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="customerEmail">
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={errors.customerEmail ? styles.error : ''}
                placeholder="ejemplo@email.com"
                disabled={isSubmitting}
              />
              {errors.customerEmail && (
                <span className={styles.errorMessage}>{errors.customerEmail}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="customerPhone">
                Teléfono <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className={errors.customerPhone ? styles.error : ''}
                placeholder="+51 999 999 999"
                disabled={isSubmitting}
              />
              {errors.customerPhone && (
                <span className={styles.errorMessage}>{errors.customerPhone}</span>
              )}
            </div>
          </div>

          <div className={styles.formSection}>
            <h3>Detalles de la Reserva</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="numberOfGuests">
                Número de Personas <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                min="1"
                max="20"
                className={errors.numberOfGuests ? styles.error : ''}
                disabled={isSubmitting}
              />
              {errors.numberOfGuests && (
                <span className={styles.errorMessage}>{errors.numberOfGuests}</span>
              )}
              {selectedTableInfo && (
                <span className={styles.capacityInfo}>
                  Capacidad de la mesa: {selectedTableInfo.capacity} personas
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="occasion">Ocasión Especial</label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Seleccionar ocasión</option>
                <option value="cumpleaños">Cumpleaños</option>
                <option value="aniversario">Aniversario</option>
                <option value="cita">Cita Romántica</option>
                <option value="negocios">Reunión de Negocios</option>
                <option value="familia">Reunión Familiar</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="specialRequests">Solicitudes Especiales</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Alergias, preferencias especiales, decoración, etc."
                rows="3"
                disabled={isSubmitting}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isVIP"
                  checked={formData.isVIP}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span className={styles.checkmark}></span>
                Cliente VIP (Servicio prioritario)
              </label>
            </div>
          </div>

          {errors.submit && (
            <div className={styles.submitError}>
              <i className="fas fa-exclamation-triangle"></i>
              {errors.submit}
            </div>
          )}

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              <i className="fas fa-times"></i>
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Procesando...
                </>
              ) : (
                <>
                  <i className="fas fa-check"></i>
                  {reservation ? 'Actualizar Reserva' : 'Crear Reserva'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm; 