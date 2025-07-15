import React from 'react';
import { Link } from 'react-router-dom';
import ReservationSystem from '../components/ReservationSystem/ReservationSystem';
import styles from './ReservationManagement.module.css';

const ReservationManagement = () => {
  return (
    <div className={styles.reservationManagementPage}>
      <Link to="/" className={styles.backButton}>
        <i className="fas fa-arrow-left"></i>
        Volver al Inicio
      </Link>
      
      <div className={styles.pageHeader}>
        <h1>Sistema de Gestión de Reservas</h1>
        <p>Gestiona las reservas de mesas de Tikay Cafetería & Restaurante</p>
      </div>
      
      <ReservationSystem />
    </div>
  );
};

export default ReservationManagement; 