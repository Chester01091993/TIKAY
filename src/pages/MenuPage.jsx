import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { menuData, getProductsWithImages, getProductsByCategory, searchProducts } from '../data/menuData';
import styles from '../styles/MenuPage.module.css';
import MenuCarouselGrid from '../components/MenuCarousel/MenuCarouselGrid';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(getProductsWithImages());
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderType, setOrderType] = useState('local');
  const [orderPayment, setOrderPayment] = useState('efectivo');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Al cargar y actualizar el carrito, usar localStorage
  useEffect(() => {
    // Cargar pedido guardado
    const savedOrder = localStorage.getItem('tikayPedido');
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed)) setSelectedProducts(parsed);
      } catch {}
    }
  }, []);
  useEffect(() => {
    // Guardar pedido en localStorage
    localStorage.setItem('tikayPedido', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchTerm('');
    setCurrentSlide(0);
    
    if (categoryId === 'all') {
      setFilteredProducts(getProductsWithImages());
    } else {
      setFilteredProducts(getProductsByCategory(categoryId));
    }
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setSelectedCategory('all');
    setCurrentSlide(0);
    
    if (searchValue.trim() === '') {
      setFilteredProducts(getProductsWithImages());
    } else {
      setFilteredProducts(searchProducts(searchValue));
    }
  };

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      setSelectedProducts(selectedProducts.map(p => 
        p.id === product.id 
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    } else {
      setSelectedProducts(selectedProducts.map(p => 
        p.id === productId 
          ? { ...p, quantity: newQuantity }
          : p
      ));
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === filteredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? filteredProducts.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const formatPrice = (price) => {
    return `S/${price.toFixed(2)}`;
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  };

  const handlePlaceOrder = () => {
    if (!orderName.trim() || !orderPhone.trim()) {
      alert('Por favor, ingresa tu nombre y teléfono.');
      return;
    }
    // Guardar el resumen del pedido enviado
    setLastOrder({
      productos: selectedProducts,
      total: calculateTotal(),
      nombre: orderName,
      telefono: orderPhone,
      observaciones: orderNotes,
      tipo: orderType,
      pago: orderPayment
    });
    setOrderSuccess(true);
    setSelectedProducts([]);
    setShowOrderSummary(false);
    setOrderName('');
    setOrderPhone('');
    setOrderNotes('');
    setOrderType('local');
    setOrderPayment('efectivo');
    localStorage.removeItem('tikayPedido');
    setTimeout(() => {
      setOrderSuccess(false);
      setLastOrder(null);
    }, 7000);
  };

  // Función para generar el texto del resumen del pedido
  const getOrderSummaryText = (order) => {
    if (!order) return '';
    let lines = [];
    lines.push('🧾 *Pedido Tikay*');
    lines.push('-------------------------');
    order.productos.forEach(item => {
      lines.push(`${item.quantity} x ${item.name} - S/${(item.price * item.quantity).toFixed(2)}`);
    });
    lines.push('-------------------------');
    lines.push(`*Total:* S/${order.total.toFixed(2)}`);
    lines.push(`*Cliente:* ${order.nombre}`);
    lines.push(`*Teléfono:* ${order.telefono}`);
    if (order.observaciones) lines.push(`*Obs.:* ${order.observaciones}`);
    lines.push(`*Consumo:* ${order.tipo === 'local' ? 'En local' : order.tipo === 'llevar' ? 'Para llevar' : 'Delivery'}`);
    lines.push(`*Pago:* ${order.pago.charAt(0).toUpperCase() + order.pago.slice(1)}`);
    return lines.join('\n');
  };

  return (
    <div className={styles.menuPage}>
      {/* Header del menú */}
      <header className={styles.menuHeader}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.backButton}>
            <i className="fas fa-arrow-left"></i>
            Volver al Inicio
          </Link>
          <h1 className={styles.menuTitle}>Menú Tikay</h1>
          <p className={styles.menuSubtitle}>
            Sabor auténtico peruano en cada plato
          </p>
        </div>
      </header>

      {/* Filtros y búsqueda */}
      <section className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Buscar en el menú..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.categoriesContainer}>
          <button
            className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            Todos
          </button>
          {menuData.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Carrusel de productos */}
      <main className={styles.menuContent}>
        {filteredProducts.length === 0 ? (
          <div className={styles.noResults}>
            <i className="fas fa-search"></i>
            <h3>No se encontraron productos</h3>
            <p>Intenta con otra búsqueda o selecciona una categoría diferente</p>
          </div>
        ) : (
          <MenuCarouselGrid
            autoPlay={false}
            showControls={true}
            featuredCategories={selectedCategory === 'all' ? null : [selectedCategory]}
            onAddToOrder={handleProductSelect}
          />
        )}
      </main>

      {/* Botón flotante del pedido (carrito) */}
      {selectedProducts.length > 0 && (
        <button 
          className={styles.orderButton}
          style={{position:'fixed',bottom:30,right:30,zIndex:1300}}
          onClick={() => setShowOrderSummary(true)}
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Ver pedido ({selectedProducts.length})</span>
          <span className={styles.orderTotal}>{formatPrice(calculateTotal())}</span>
        </button>
      )}

      {/* El .orderCart solo contiene la lista del carrito (cartQuickView) */}
      {selectedProducts.length > 0 && (
        <div className={styles.orderCart}>
          <div className={styles.cartQuickView}>
            {selectedProducts.map((product) => (
              <div key={product.id} className={styles.cartItem}>
                <span className={styles.cartItemName}>{product.name}</span>
                <div className={styles.cartItemControls}>
                  <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)} className={styles.quantityButton} aria-label="Restar">
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className={styles.quantity}>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)} className={styles.quantityButton} aria-label="Sumar">
                    <i className="fas fa-plus"></i>
                  </button>
                  <button onClick={() => removeProduct(product.id)} className={styles.removeButton} aria-label="Eliminar">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <span className={styles.cartItemTotal}>{formatPrice(product.price * product.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal del resumen del pedido */}
      {showOrderSummary && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Resumen del pedido</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setShowOrderSummary(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {/* Resumen de productos */}
            <div className={styles.orderItems}>
              {selectedProducts.map((product) => (
                <div key={product.id} className={styles.orderItem}>
                  <div className={styles.itemInfo}>
                    <h4>{product.name}</h4>
                    <p>{formatPrice(product.price)}</p>
                  </div>
                  <div className={styles.itemControls}>
                    <button 
                      onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className={styles.quantity}>{product.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    <button 
                      onClick={() => removeProduct(product.id)}
                      className={styles.removeButton}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div className={styles.itemTotal}>
                    {formatPrice(product.price * product.quantity)}
                  </div>
                </div>
              ))}
            </div>
            {/* Formulario de datos del cliente y opciones */}
            <form className={styles.orderForm} onSubmit={e => { e.preventDefault(); handlePlaceOrder(); }}>
              <h4>Datos del cliente</h4>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre <span style={{color:'#B22222'}}>*</span></label>
                <input id="nombre" type="text" required value={orderName || ''} onChange={e => setOrderName(e.target.value)} placeholder="Nombre completo" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="telefono">Teléfono <span style={{color:'#B22222'}}>*</span></label>
                <input id="telefono" type="tel" required value={orderPhone || ''} onChange={e => setOrderPhone(e.target.value)} placeholder="Celular o WhatsApp" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="observaciones">Observaciones</label>
                <textarea id="observaciones" value={orderNotes || ''} onChange={e => setOrderNotes(e.target.value)} placeholder="Ej: Sin azúcar, mesa cerca a la ventana, etc." />
              </div>
              <div className={styles.formGroup}>
                <label>Tipo de consumo</label>
                <select value={orderType || 'local'} onChange={e => setOrderType(e.target.value)}>
                  <option value="local">En local</option>
                  <option value="llevar">Para llevar</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Método de pago</label>
                <select value={orderPayment || 'efectivo'} onChange={e => setOrderPayment(e.target.value)}>
                  <option value="efectivo">Efectivo</option>
                  <option value="yape">Yape</option>
                  <option value="plin">Plin</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>
              <div className={styles.orderTotal}>
                <h4>Total: {formatPrice(calculateTotal())}</h4>
              </div>
              <div className={styles.modalActions}>
                <button 
                  className={styles.cancelButton}
                  type="button"
                  onClick={() => setShowOrderSummary(false)}
                >
                  Cancelar
                </button>
                <button 
                  className={styles.placeOrderButton}
                  type="submit"
                >
                  Realizar pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer del menú */}
      <footer className={styles.menuFooter}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            Todos nuestros productos están preparados con ingredientes frescos y recetas tradicionales peruanas.
          </p>
          <Link to="/" className={styles.homeButton}>
            <i className="fas fa-home"></i>
            Volver al inicio
          </Link>
        </div>
      </footer>

      {orderSuccess && lastOrder && (
        <div className={styles.orderSuccess}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <i className="fas fa-check-circle"></i>
              <span>¡Pedido enviado correctamente!</span>
            </div>
            <div className={styles.orderSuccessResumen}>
              <h4 style={{margin:'10px 0 4px 0',color:'#228B22'}}>Resumen del pedido</h4>
              <ul className={styles.orderSuccessList}>
                {lastOrder.productos.map(item => (
                  <li key={item.id}>
                    <span>{item.quantity} x {item.name}</span>
                    <span>S/{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.orderSuccessTotal}>Total: <b>S/{lastOrder.total.toFixed(2)}</b></div>
              <div className={styles.orderSuccessDatos}>
                <div><b>Cliente:</b> {lastOrder.nombre}</div>
                <div><b>Teléfono:</b> {lastOrder.telefono}</div>
                {lastOrder.observaciones && <div><b>Obs.:</b> {lastOrder.observaciones}</div>}
                <div><b>Consumo:</b> {lastOrder.tipo === 'local' ? 'En local' : lastOrder.tipo === 'llevar' ? 'Para llevar' : 'Delivery'}</div>
                <div><b>Pago:</b> {lastOrder.pago.charAt(0).toUpperCase() + lastOrder.pago.slice(1)}</div>
              </div>
              <div className={styles.orderSuccessActions}>
                <button type="button" onClick={() => {navigator.clipboard.writeText(getOrderSummaryText(lastOrder));}} className={styles.orderSuccessBtn}>
                  <i className="fas fa-copy"></i> Copiar
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(getOrderSummaryText(lastOrder))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.orderSuccessBtn}
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
                <button type="button" onClick={() => window.print()} className={styles.orderSuccessBtn}>
                  <i className="fas fa-print"></i> Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage; 