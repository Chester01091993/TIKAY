import React, { useState, useEffect } from 'react';
import { menuData } from '../../data/menuData';
import styles from './MenuCarousel.module.css';

const MenuCarousel = ({ categoryId, showControls = false, autoPlay = true, interval = 4000, onAddToOrder }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Obtener la categoría específica
  const category = menuData.find(cat => cat.id === categoryId);
  const items = category ? category.items : [];

  // Función para avanzar al siguiente elemento
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para retroceder al elemento anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  // Función para ir a un slide específico
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Efecto para el autoplay
  useEffect(() => {
    let intervalId;
    if (isPlaying && autoPlay && items.length > 1) {
      intervalId = setInterval(nextSlide, interval);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, autoPlay, interval, items.length]);

  const currentItem = items[currentIndex];

  if (!category || items.length === 0) {
    return null;
  }

  return (
    <div className={styles.categoryCarousel}>
      <div className={styles.categoryHeader}>
        <h3 className={styles.categoryTitle}>{category.name}</h3>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselSlide}>
          <div className={styles.slideImageContainer}>
            <img 
              src={currentItem.image} 
              alt={currentItem.name}
              className={styles.slideImage}
              onError={(e) => {
                e.target.src = '/imagenes/placeholder.jpg';
              }}
            />
          </div>
          
          <div className={styles.slideContent}>
            <h4 className={styles.slideTitle}>{currentItem.name}</h4>
            
            <p className={styles.slideDescription}>
              {currentItem.description}
            </p>
            
            <div className={styles.slidePrice}>
              <span className={styles.priceSymbol}>S/</span>
              <span className={styles.priceAmount}>{currentItem.price}</span>
            </div>

                          {showControls && onAddToOrder && (
                <button 
                  className={styles.addToOrderButton}
                  onClick={() => onAddToOrder(currentItem)}
                >
                  <i className="fas fa-plus"></i>
                  Agregar
                </button>
              )}
          </div>
        </div>

        {/* Controles de navegación - solo si hay más de un elemento */}
        {items.length > 1 && (
          <>
            <button 
              className={`${styles.carouselControl} ${styles.prevControl}`}
              onClick={prevSlide}
              aria-label="Anterior"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button 
              className={`${styles.carouselControl} ${styles.nextControl}`}
              onClick={nextSlide}
              aria-label="Siguiente"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Indicadores */}
            <div className={styles.carouselIndicators}>
              {items.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuCarousel; 