import { useState, useCallback } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success', // 'success', 'error', 'warning', 'info'
    duration: 3000
  });

  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    setNotification({
      show: true,
      message,
      type,
      duration
    });

    // Auto-hide notification
    setTimeout(() => {
      hideNotification();
    }, duration);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      show: false
    }));
  }, []);

  const showSuccess = useCallback((message, duration) => {
    showNotification(message, 'success', duration);
  }, [showNotification]);

  const showError = useCallback((message, duration) => {
    showNotification(message, 'error', duration);
  }, [showNotification]);

  const showWarning = useCallback((message, duration) => {
    showNotification(message, 'warning', duration);
  }, [showNotification]);

  const showInfo = useCallback((message, duration) => {
    showNotification(message, 'info', duration);
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export default useNotification; 