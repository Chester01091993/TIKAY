import React, { useState } from 'react';
import './MenuItem.module.css';

const MenuItem = ({ item }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="menuItem">
      <div className="menuItemImage">
        {!imageError ? (
          <img 
            src={item.imagen} 
            alt={item.nombre}
            onError={handleImageError}
          />
        ) : (
          <div className="imagePlaceholder">
            <i className="fas fa-image"></i>
          </div>
        )}
        {item.popular && (
          <div className="popularBadge">
            <i className="fas fa-star"></i>
            Popular
          </div>
        )}
      </div>
      
      <div className="menuItemContent">
        <div className="menuItemHeader">
          <h3 className="menuItemTitle">{item.nombre}</h3>
          <span className="menuItemPrice">S/ {item.precio.toFixed(2)}</span>
        </div>
        
        <p className="menuItemDescription">{item.descripcion}</p>
        
        <div className="menuItemFooter">
          <span className="menuItemCategory">{item.categoria}</span>
          <button className="orderButton">
            <i className="fas fa-plus"></i>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem; 