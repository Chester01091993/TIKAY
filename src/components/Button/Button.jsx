import React from 'react';
import './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  icon,
  ...props 
}) => {
  const buttonClasses = `button ${variant} ${size} ${className}`.trim();
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <i className={icon}></i>}
      {children}
    </button>
  );
};

export default Button; 