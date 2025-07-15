import React from 'react';
import './Notification.module.css';

const Notification = ({ notification, onClose }) => {
  if (!notification.show) return null;

  const { message, type } = notification;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'info':
        return 'fas fa-info-circle';
      default:
        return 'fas fa-bell';
    }
  };

  return (
    <div className={`notification ${type}`}>
      <i className={getIcon()}></i>
      <span>{message}</span>
      {onClose && (
        <button className="notificationClose" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  );
};

export default Notification; 