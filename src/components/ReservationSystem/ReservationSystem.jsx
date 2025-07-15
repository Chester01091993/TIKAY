import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import ReservationForm from './ReservationForm';
import ReservationList from './ReservationList';
import TableManagement from './TableManagement';
import styles from './ReservationSystem.module.css';

const ReservationSystem = () => {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Horarios disponibles con capacidad de gestión dinámica
  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  // Inicializar mesas si no existen
  useEffect(() => {
    const savedTables = localStorage.getItem('tikayTables');
    if (!savedTables) {
      const defaultTables = [
        { id: 1, name: 'Mesa 1', capacity: 2, status: 'available', location: 'Interior' },
        { id: 2, name: 'Mesa 2', capacity: 4, status: 'available', location: 'Interior' },
        { id: 3, name: 'Mesa 3', capacity: 6, status: 'available', location: 'Terraza' },
        { id: 4, name: 'Mesa 4', capacity: 2, status: 'available', location: 'Interior' },
        { id: 5, name: 'Mesa 5', capacity: 4, status: 'available', location: 'Terraza' },
        { id: 6, name: 'Mesa VIP', capacity: 8, status: 'available', location: 'Privado' }
      ];
      setTables(defaultTables);
      localStorage.setItem('tikayTables', JSON.stringify(defaultTables));
    } else {
      setTables(JSON.parse(savedTables));
    }

    // Cargar reservas existentes
    const savedReservations = localStorage.getItem('tikayReservations');
    console.log('Reservas guardadas en localStorage:', savedReservations);
    if (savedReservations) {
      const parsedReservations = JSON.parse(savedReservations);
      console.log('Reservas cargadas:', parsedReservations);
      setReservations(parsedReservations);
    }

    // Verificar conflictos al cargar
    checkForConflicts();
  }, []);

  // Guardar reservas en localStorage
  useEffect(() => {
    console.log('Guardando reservas en localStorage:', reservations);
    localStorage.setItem('tikayReservations', JSON.stringify(reservations));
    checkForConflicts();
  }, [reservations]);

  // Guardar mesas en localStorage
  useEffect(() => {
    localStorage.setItem('tikayTables', JSON.stringify(tables));
  }, [tables]);

  // Verificar conflictos de reservas
  const checkForConflicts = () => {
    const conflictsFound = [];
    const dateStr = selectedDate.toISOString().split('T')[0];
    
    reservations.forEach(reservation => {
      if (reservation.date === dateStr) {
        const sameTimeReservations = reservations.filter(r => 
          r.date === dateStr && 
          r.time === reservation.time && 
          r.id !== reservation.id
        );
        
        if (sameTimeReservations.length > 0) {
          conflictsFound.push({
            type: 'time_conflict',
            reservation: reservation,
            conflicting: sameTimeReservations
          });
        }
      }
    });

    setConflicts(conflictsFound);
  };

  // Verificar disponibilidad de mesa
  const checkTableAvailability = (tableId, date, time, excludeReservationId = null) => {
    const dateStr = date.toISOString().split('T')[0];
    return !reservations.some(reservation => 
      reservation.tableId === tableId && 
      reservation.date === dateStr && 
      reservation.time === time &&
      reservation.id !== excludeReservationId
    );
  };

  // Obtener mesas disponibles para una fecha y hora
  const getAvailableTables = (date, time) => {
    return tables.filter(table => 
      table.status === 'available' && 
      checkTableAvailability(table.id, date, time)
    );
  };

  // Verificar capacidad de mesa
  const checkTableCapacity = (tableId, numberOfGuests) => {
    const table = tables.find(t => t.id === tableId);
    return table && numberOfGuests <= table.capacity;
  };

  // Crear nueva reserva con validaciones
  const createReservation = (reservationData) => {
    console.log('Creando reserva con datos:', reservationData);
    console.log('Mesa seleccionada:', selectedTable);
    console.log('Fecha seleccionada:', selectedDate);
    console.log('Hora seleccionada:', selectedTime);
    
    // Validaciones previas
    if (!selectedTable) {
      addNotification('error', 'Debe seleccionar una mesa');
      return;
    }

    if (!selectedTime) {
      addNotification('error', 'Debe seleccionar una hora');
      return;
    }

    if (!checkTableAvailability(selectedTable, selectedDate, selectedTime)) {
      addNotification('error', 'La mesa seleccionada no está disponible en este horario');
      return;
    }

    if (!checkTableCapacity(selectedTable, reservationData.numberOfGuests)) {
      addNotification('error', 'El número de personas excede la capacidad de la mesa');
      return;
    }

    const newReservation = {
      id: Date.now(),
      ...reservationData,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      tableId: selectedTable,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      confirmedAt: new Date().toISOString()
    };

    console.log('Nueva reserva creada:', newReservation);

    setReservations(prev => {
      const updatedReservations = [...prev, newReservation];
      console.log('Reservas actualizadas:', updatedReservations);
      return updatedReservations;
    });
    
    addNotification('success', 'Reserva creada exitosamente');
    setIsFormOpen(false);
    setEditingReservation(null);
    setSelectedTable(null);
    setSelectedTime('');
  };

  // Actualizar reserva existente
  const updateReservation = (reservationData) => {
    // Validaciones para actualización
    if (!checkTableAvailability(selectedTable, selectedDate, selectedTime, editingReservation.id)) {
      addNotification('error', 'La mesa seleccionada no está disponible en este horario');
      return;
    }

    if (!checkTableCapacity(selectedTable, reservationData.numberOfGuests)) {
      addNotification('error', 'El número de personas excede la capacidad de la mesa');
      return;
    }

    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === editingReservation.id 
          ? { 
              ...reservation, 
              ...reservationData,
              date: selectedDate.toISOString().split('T')[0],
              time: selectedTime,
              tableId: selectedTable,
              updatedAt: new Date().toISOString()
            }
          : reservation
      )
    );
    
    addNotification('success', 'Reserva actualizada exitosamente');
    setIsFormOpen(false);
    setEditingReservation(null);
    setSelectedTable(null);
    setSelectedTime('');
  };

  // Eliminar reserva
  const deleteReservation = (reservationId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      setReservations(prev => prev.filter(r => r.id !== reservationId));
      addNotification('success', 'Reserva eliminada exitosamente');
    }
  };

  // Editar reserva
  const editReservation = (reservation) => {
    setEditingReservation(reservation);
    setSelectedDate(new Date(reservation.date));
    setSelectedTime(reservation.time);
    setSelectedTable(reservation.tableId);
    setIsFormOpen(true);
  };

  // Cambiar estado de reserva
  const changeReservationStatus = (reservationId, newStatus) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === reservationId 
          ? { 
              ...reservation, 
              status: newStatus,
              updatedAt: new Date().toISOString()
            }
          : reservation
      )
    );
    addNotification('success', `Reserva marcada como ${newStatus}`);
  };

  // Obtener reservas para una fecha específica
  const getReservationsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return reservations.filter(reservation => reservation.date === dateStr);
  };

  // Obtener estadísticas avanzadas
  const getStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayReservations = reservations.filter(r => r.date === today);
    const thisWeek = getWeekDates();
    const weekReservations = reservations.filter(r => thisWeek.includes(r.date));
    
    return {
      total: reservations.length,
      today: todayReservations.length,
      thisWeek: weekReservations.length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      pending: reservations.filter(r => r.status === 'pending').length,
      cancelled: reservations.filter(r => r.status === 'cancelled').length,
      averageGuests: reservations.length > 0 
        ? (reservations.reduce((sum, r) => sum + r.numberOfGuests, 0) / reservations.length).toFixed(1)
        : 0
    };
  };

  // Obtener fechas de la semana actual
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Agregar notificación
  const addNotification = (type, message) => {
    const notification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remover notificación después de 5 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  // Exportar datos
  const exportData = () => {
    const data = {
      reservations,
      tables,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tikay-reservations-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    addNotification('success', 'Datos exportados exitosamente');
  };

  const stats = getStats();

  return (
    <div className={styles.reservationSystem}>
      {/* Notificaciones */}
      <div className={styles.notificationsContainer}>
        {notifications.map(notification => (
          <div key={notification.id} className={`${styles.notification} ${styles[notification.type]}`}>
            <span>{notification.message}</span>
            <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.systemHeader}>
        <h1>Sistema de Gestión de Reservas - Tikay Cafetería</h1>
        <div className={styles.headerActions}>
          <button onClick={exportData} className={styles.exportButton}>
            <i className="fas fa-download"></i>
            Exportar Datos
          </button>
          <button 
            onClick={() => {
              console.log('Estado actual de reservas:', reservations);
              console.log('localStorage actual:', localStorage.getItem('tikayReservations'));
            }} 
            className={styles.exportButton}
            style={{ marginLeft: '10px' }}
          >
            <i className="fas fa-bug"></i>
            Debug
          </button>
          <button 
            onClick={() => {
              const testReservation = {
                customerName: 'Cliente Prueba',
                customerEmail: 'test@test.com',
                customerPhone: '999999999',
                numberOfGuests: 2,
                specialRequests: 'Reserva de prueba',
                occasion: 'prueba',
                isVIP: false
              };
              console.log('Creando reserva de prueba');
              createReservation(testReservation);
            }} 
            className={styles.exportButton}
            style={{ marginLeft: '10px' }}
          >
            <i className="fas fa-plus"></i>
            Test
          </button>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Total Reservas</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.today}</span>
            <span className={styles.statLabel}>Hoy</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.thisWeek}</span>
            <span className={styles.statLabel}>Esta Semana</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.confirmed}</span>
            <span className={styles.statLabel}>Confirmadas</span>
          </div>
        </div>
      </div>

      {/* Alertas de conflictos */}
      {conflicts.length > 0 && (
        <div className={styles.conflictsAlert}>
          <h3><i className="fas fa-exclamation-triangle"></i> Conflictos Detectados</h3>
          {conflicts.map((conflict, index) => (
            <div key={index} className={styles.conflictItem}>
              <p>Conflicto en {conflict.reservation.time} - Mesa {conflict.reservation.tableId}</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.systemContent}>
        <div className={styles.leftPanel}>
          <Calendar 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            reservations={reservations}
            onReservationClick={editReservation}
          />
          
          <div className={styles.timeSelection}>
            <h3>Horarios Disponibles</h3>
            <div className={styles.timeSlots}>
              {timeSlots.map(time => {
                const availableTables = getAvailableTables(selectedDate, time);
                const isAvailable = availableTables.length > 0;
                
                return (
                  <button
                    key={time}
                    className={`${styles.timeSlot} ${selectedTime === time ? styles.selected : ''} ${!isAvailable ? styles.unavailable : ''}`}
                    onClick={() => setSelectedTime(time)}
                    disabled={!isAvailable}
                    title={isAvailable ? `${availableTables.length} mesas disponibles` : 'No hay mesas disponibles'}
                  >
                    {time}
                    {isAvailable && <span className={styles.availabilityCount}>{availableTables.length}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <TableManagement 
            tables={tables}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            reservations={reservations}
            onTableSelect={setSelectedTable}
            selectedTable={selectedTable}
            onTableUpdate={setTables}
          />

          <div className={styles.actionButtons}>
            <button 
              className={styles.newReservationBtn}
              onClick={() => setIsFormOpen(true)}
              disabled={!selectedTime || !selectedTable}
            >
              <i className="fas fa-plus"></i>
              Nueva Reserva
            </button>
          </div>

          <ReservationList 
            reservations={getReservationsForDate(selectedDate)}
            onEdit={editReservation}
            onDelete={deleteReservation}
            onChangeStatus={changeReservationStatus}
          />
        </div>
      </div>

      {isFormOpen && (
        <ReservationForm
          reservation={editingReservation}
          tables={tables}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedTable={selectedTable}
          onSubmit={editingReservation ? updateReservation : createReservation}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingReservation(null);
            setSelectedTable(null);
            setSelectedTime('');
          }}
        />
      )}
    </div>
  );
};

export default ReservationSystem; 