import React from 'react';
import { menuData } from '../../data/menuData';
import MenuCarousel from './MenuCarousel';
import styles from './MenuCarousel.module.css';

const MenuCarouselGrid = ({ showControls = false, autoPlay = true, featuredCategories = null, onAddToOrder }) => {
  // Si no se especifican categorías, mostrar todas
  const categoriesToShow = featuredCategories || menuData.map(cat => cat.id);

  return (
    <section className={styles.menuCarouselSection}>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselHeader}>
          <h2 className={styles.carouselTitle}>Nuestro Menú por Categorías</h2>
          <p className={styles.carouselSubtitle}>
            Explora nuestros deliciosos platos organizados por categorías
          </p>
        </div>

        <div className={styles.carouselGrid}>
          {categoriesToShow.map(categoryId => (
            <MenuCarousel
              key={categoryId}
              categoryId={categoryId}
              showControls={showControls}
              autoPlay={autoPlay}
              interval={5000}
              onAddToOrder={onAddToOrder}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuCarouselGrid; 