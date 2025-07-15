import React, { useState } from 'react';
import styles from './ReservationList.module.css';

const ReservationList = ({ 
  reservations, 
  onEdit, 
  onDelete, 
  onChangeStatus 
}) => {
  const [sortBy, setSortBy] = useState('time');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar y ordenar reservas
  const getFilteredAndSortedReservations = () => {
    let filtered = reservations;

    // Filtrar por estado
    if (filterBy !== 'all') {
      filtered = filtered.filter(reservation => reservation.status === filterBy);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(reservation =>
        reservation.customerName.toLowerCase().includes(term) ||
        reservation.customerEmail.toLowerCase().includes(term) ||
        reservation.customerPhone.includes(term) ||
        reservation.time.includes(term)
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return a.time.localeCompare(b.time);
        case 'name':
          return a.customerName.localeCompare(b.customerName);
        case 'guests':
          return b.numberOfGuests - a.numberOfGuests;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'table':
          return a.tableId - b.tableId;
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Obtener estadísticas de las reservas mostradas
  const getListStats = () => {
    const filtered = getFilteredAndSortedReservations();
    return {
      total: filtered.length,
      confirmed: filtered.filter(r => r.status === 'confirmed').length,
      pending: filtered.filter(r => r.status === 'pending').length,
      cancelled: filtered.filter(r => r.status === 'cancelled').length,
      totalGuests: filtered.reduce((sum, r) => sum + r.numberOfGuests, 0)
    };
  };

  // Formatear hora para mostrar
  const formatTime = (time) => {
    return time;
  };

  // Obtener color de estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Obtener texto de estado
  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const filteredReservations = getFilteredAndSortedReservations();
  const stats = getListStats();

  return (
    <div className={styles.reservationList}>
      <div className={styles.listHeader}>
        <h3>Reservas del Día</h3>
        <div className={styles.listStats}>
          <span className={styles.stat}>
            <i className="fas fa-users"></i>
            {stats.total} reservas
          </span>
          <span className={styles.stat}>
            <i className="fas fa-user-friends"></i>
            {stats.totalGuests} personas
          </span>
        </div>
      </div>

      <div className={styles.listControls}>
        <div className={styles.searchBox}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterControls}>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Todos los estados</option>
            <option value="confirmed">Confirmadas</option>
            <option value="pending">Pendientes</option>
            <option value="cancelled">Canceladas</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="time">Ordenar por hora</option>
            <option value="name">Ordenar por nombre</option>
            <option value="guests">Ordenar por personas</option>
            <option value="status">Ordenar por estado</option>
            <option value="table">Ordenar por mesa</option>
          </select>
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className={styles.emptyState}>
          <i className="fas fa-calendar-times"></i>
          <p>
            {searchTerm || filterBy !== 'all' 
              ? 'No se encontraron reservas con los filtros aplicados'
              : 'No hay reservas para este día'
            }
          </p>
        </div>
      ) : (
        <div className={styles.reservationsContainer}>
          {filteredReservations.map(reservation => (
            <div key={reservation.id} className={styles.reservationCard}>
              <div className={styles.reservationHeader}>
                <div className={styles.reservationTime}>
                  <i className="fas fa-clock"></i>
                  {formatTime(reservation.time)}
                </div>
                <div className={`${styles.reservationStatus} ${styles[reservation.status]}`}>
                  <span className={`${styles.statusDot} ${styles[getStatusColor(reservation.status)]}`}></span>
                  {getStatusText(reservation.status)}
                </div>
              </div>

              <div className={styles.reservationInfo}>
                <div className={styles.customerInfo}>
                  <h4 className={styles.customerName}>
                    {reservation.customerName}
                    {reservation.isVIP && (
                      <span className={styles.vipBadge}>
                        <i className="fas fa-crown"></i>
                        VIP
                      </span>
                    )}
                  </h4>
                  <div className={styles.contactInfo}>
                    <span className={styles.email}>
                      <i className="fas fa-envelope"></i>
                      {reservation.customerEmail}
                    </span>
                    <span className={styles.phone}>
                      <i className="fas fa-phone"></i>
                      {reservation.customerPhone}
                    </span>
                  </div>
                </div>

                <div className={styles.reservationDetails}>
                  <div className={styles.detailItem}>
                    <i className="fas fa-users"></i>
                    <span>{reservation.numberOfGuests} personas</span>
                  </div>
                  <div className={styles.detailItem}>
                    <i className="fas fa-chair"></i>
                    <span>Mesa {reservation.tableId}</span>
                  </div>
                  {reservation.occasion && (
                    <div className={styles.detailItem}>
                      <i className="fas fa-gift"></i>
                      <span>{reservation.occasion}</span>
                    </div>
                  )}
                </div>

                {reservation.specialRequests && (
                  <div className={styles.specialRequests}>
                    <i className="fas fa-star"></i>
                    <span>{reservation.specialRequests}</span>
                  </div>
                )}
              </div>

              <div className={styles.reservationActions}>
                <div className={styles.statusActions}>
                  <select
                    value={reservation.status}
                    onChange={(e) => onChangeStatus(reservation.id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="confirmed">Confirmada</option>
                    <option value="pending">Pendiente</option>
                    <option value="cancelled">Cancelada</option>
                  </select>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    onClick={() => onEdit(reservation)}
                    className={styles.editButton}
                    title="Editar reserva"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => onDelete(reservation.id)}
                    className={styles.deleteButton}
                    title="Eliminar reserva"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className={styles.reservationMeta}>
                <span className={styles.createdAt}>
                  Creada: {new Date(reservation.createdAt).toLocaleString('es-ES')}
                </span>
                {reservation.updatedAt && (
                  <span className={styles.updatedAt}>
                    Actualizada: {new Date(reservation.updatedAt).toLocaleString('es-ES')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredReservations.length > 0 && (
        <div className={styles.listFooter}>
          <div className={styles.footerStats}>
            <span>Mostrando {filteredReservations.length} de {reservations.length} reservas</span>
            <span>Total de personas: {stats.totalGuests}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationList; 