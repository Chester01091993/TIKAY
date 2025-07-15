import React, { useState } from 'react';
import { menuData, categorias, getPlatosByCategoria, getBebidasByCategoria } from '../../data/menuData';
import MenuItem from './MenuItem';
import './MenuSection.module.css';

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeTab, setActiveTab] = useState('platos');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory('Todos');
  };

  const getFilteredItems = () => {
    if (activeTab === 'platos') {
      return getPlatosByCategoria(selectedCategory);
    } else if (activeTab === 'bebidas') {
      return getBebidasByCategoria(selectedCategory);
    } else {
      return menuData.postres;
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <section id="menu" className="menuSection">
      <div className="menuContainer">
        <div className="menuHeader">
          <h2 className="menuTitle">Nuestro Menú</h2>
          <p className="menuSubtitle">
            Descubre los sabores auténticos de la cocina peruana
          </p>
        </div>

        <div className="menuTabs">
          <button
            className={`menuTab ${activeTab === 'platos' ? 'active' : ''}`}
            onClick={() => handleTabChange('platos')}
          >
            <i className="fas fa-utensils"></i>
            Platos Principales
          </button>
          <button
            className={`menuTab ${activeTab === 'bebidas' ? 'active' : ''}`}
            onClick={() => handleTabChange('bebidas')}
          >
            <i className="fas fa-glass-martini-alt"></i>
            Bebidas
          </button>
          <button
            className={`menuTab ${activeTab === 'postres' ? 'active' : ''}`}
            onClick={() => handleTabChange('postres')}
          >
            <i className="fas fa-ice-cream"></i>
            Postres
          </button>
        </div>

        {(activeTab === 'platos' || activeTab === 'bebidas') && (
          <div className="categoryFilters">
            {categorias.map((category) => (
              <button
                key={category}
                className={`categoryFilter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="menuGrid">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="noItems">
            <i className="fas fa-search"></i>
            <p>No se encontraron elementos en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection; 