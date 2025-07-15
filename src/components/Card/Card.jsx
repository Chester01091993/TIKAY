import React from 'react';
import './Card.module.css';

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  onClick,
  ...props 
}) => {
  const cardClasses = `card ${variant} ${className}`.trim();
  
  return (
    <div
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 