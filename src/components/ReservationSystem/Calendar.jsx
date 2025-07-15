import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = ({ selectedDate, onDateSelect, reservations, onReservationClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Obtener el primer día del mes
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  // Obtener el último día del mes
  const getLastDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  // Obtener días del mes
  const getDaysInMonth = (date) => {
    const firstDay = getFirstDayOfMonth(date);
    const lastDay = getLastDayOfMonth(date);
    const days = [];

    // Agregar días del mes anterior para completar la primera semana
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(firstDay.getDate() - i - 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Agregar días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    // Agregar días del mes siguiente para completar la última semana
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      const nextDate = new Date(lastDay);
      nextDate.setDate(lastDay.getDate() + i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  // Obtener reservas para una fecha específica
  const getReservationsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return reservations.filter(reservation => reservation.date === dateStr);
  };

  // Verificar si una fecha es hoy
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Verificar si una fecha es la seleccionada
  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  // Verificar si una fecha es del pasado
  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Navegar al mes anterior
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Navegar al mes siguiente
  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Ir a hoy
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={goToPreviousMonth} className={styles.navButton}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className={styles.monthYear}>
          <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
        </div>
        <button onClick={goToNextMonth} className={styles.navButton}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className={styles.todayButton}>
        <button onClick={goToToday} className={styles.todayBtn}>
          <i className="fas fa-calendar-day"></i>
          Ir a Hoy
        </button>
      </div>

      <div className={styles.calendarGrid}>
        {/* Nombres de los días */}
        <div className={styles.dayNames}>
          {dayNames.map(day => (
            <div key={day} className={styles.dayName}>{day}</div>
          ))}
        </div>

        {/* Días del calendario */}
        <div className={styles.daysGrid}>
          {days.map((dayInfo, index) => {
            const dayReservations = getReservationsForDate(dayInfo.date);
            const hasReservations = dayReservations.length > 0;
            
            return (
              <div
                key={index}
                className={`${styles.calendarDay} ${
                  !dayInfo.isCurrentMonth ? styles.otherMonth : ''
                } ${
                  isToday(dayInfo.date) ? styles.today : ''
                } ${
                  isSelected(dayInfo.date) ? styles.selected : ''
                } ${
                  isPast(dayInfo.date) ? styles.past : ''
                } ${
                  hasReservations ? styles.hasReservations : ''
                }`}
                onClick={() => {
                  if (!isPast(dayInfo.date)) {
                    onDateSelect(dayInfo.date);
                  }
                }}
                title={hasReservations ? `${dayReservations.length} reserva(s)` : ''}
              >
                <span className={styles.dayNumber}>{dayInfo.date.getDate()}</span>
                {hasReservations && (
                  <div className={styles.reservationIndicator}>
                    <span className={styles.reservationCount}>{dayReservations.length}</span>
                  </div>
                )}
                {dayReservations.length > 0 && (
                  <div className={styles.reservationTooltip}>
                    <div className={styles.tooltipContent}>
                      <h4>Reservas para {dayInfo.date.toLocaleDateString('es-ES')}</h4>
                      {dayReservations.map(reservation => (
                        <div 
                          key={reservation.id} 
                          className={styles.tooltipReservation}
                          onClick={(e) => {
                            e.stopPropagation();
                            onReservationClick(reservation);
                          }}
                        >
                          <span className={styles.reservationTime}>{reservation.time}</span>
                          <span className={styles.reservationName}>{reservation.customerName}</span>
                          <span className={styles.reservationGuests}>{reservation.numberOfGuests} personas</span>
                          <span className={`${styles.reservationStatus} ${styles[reservation.status]}`}>
                            {reservation.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Leyenda */}
      <div className={styles.calendarLegend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.today}`}></div>
          <span>Hoy</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.selected}`}></div>
          <span>Seleccionado</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.hasReservations}`}></div>
          <span>Con Reservas</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.past}`}></div>
          <span>Pasado</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 