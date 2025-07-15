import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ReservationManagement from './pages/ReservationManagement';
import MenuPage from './pages/MenuPage';
import styles from './styles/HomePage.module.css';
import { getProductsWithImages } from './data/menuData';
import MenuCarouselGrid from './components/MenuCarousel/MenuCarouselGrid';

// Componente Header con estilos andinos peruanos
const Header = ({ onAudioToggle, isAudioPlaying }) => {
  return (
    <header className={styles.mainHeader} style={{padding:0, minHeight:'450px', height:'450px', position:'relative', overflow:'hidden'}}>
      <img 
        src="/imagenes/banner tikay y restaurante.jpg" 
        alt="Banner Tikay Cafetería y Restaurante" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          position: 'absolute',
      top: 0,
          left: 0
        }}
      />
      <nav className={styles.navigation} style={{
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
        background:'rgba(0,0,0,0.32)',
        padding:'8px 0',
        display:'flex',
        justifyContent:'center',
        gap:'24px',
        color:'#fff',
        fontWeight:600
      }}>
        <Link to="/" className={styles.navLink} style={{color:'#fff',textShadow:'0 2px 8px #000'}}>Inicio</Link>
        <Link to="/menu" className={styles.navLink} style={{color:'#fff',textShadow:'0 2px 8px #000'}}>Menú</Link>
        <Link to="/management" className={styles.managementButton} style={{color:'#fff',textShadow:'0 2px 8px #000'}}>
          <i className="fas fa-cog"></i> Gestión
        </Link>
      </nav>
      <style>{`
        @media (max-width: 900px) {
          .${styles.mainHeader} {
            min-height: 280px !important;
            height: 280px !important;
          }
        }
        @media (max-width: 600px) {
          .${styles.mainHeader} {
            min-height: 200px !important;
            height: 200px !important;
          }
        }
        @media (max-width: 768px) {
          .logo-section {
            padding: 10px 0 !important;
          }
          .logo-section img {
            height: 60px !important;
          }
          .logo-section h2 {
            font-size: 1.4rem !important;
          }
          .logo-section p {
            font-size: 0.9rem !important;
          }
          .social-icons {
            gap: 10px !important;
          }
          .social-icons a {
            width: 45px !important;
            height: 45px !important;
          }
          .social-icons img {
            width: 28px !important;
            height: 28px !important;
          }
        }
        @media (max-width: 480px) {
          .logo-section {
            padding: 8px 0 !important;
          }
          .logo-section img {
            height: 50px !important;
          }
          .logo-section h2 {
            font-size: 1.2rem !important;
          }
          .logo-section p {
            font-size: 0.8rem !important;
          }
          .social-icons {
            gap: 8px !important;
          }
          .social-icons a {
            width: 40px !important;
            height: 40px !important;
          }
          .social-icons img {
            width: 25px !important;
            height: 25px !important;
          }
        }
      `}</style>
    </header>
  );
};

// Componente Hero con estilos andinos peruanos
const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span>Tikay</span> Cafetería & Restaurante
        </h1>
        <p className={styles.heroSubtitle}>
          Sabor auténtico peruano en el corazón de Pachacámac
        </p>
        <p className={styles.heroDescription}>
          Disfruta de nuestra deliciosa comida tradicional peruana, 
          preparada con ingredientes frescos y recetas que han pasado 
          de generación en generación.
        </p>
        
        <div className={styles.heroButtons}>
          <Link to="/management" className={styles.primaryButton}>
            <i className="fas fa-cog"></i>
            Sistema de Gestión
          </Link>
          <Link to="/menu" className={styles.secondaryButton}>
            Ver Menú
          </Link>
        </div>
      </div>
    </section>
  );
};

// Componente Footer con estilos andinos peruanos
const Footer = () => {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img src="/imagenes/logo con tikay.jpeg" alt="Logo" />
          <h3 className={styles.footerBrand}>
                Tikay Cafetería & Restaurante
              </h3>
            </div>
        <p className={styles.footerDescription}>
              Sabor auténtico peruano en el corazón de Pachacámac. 
              Disfruta de nuestra deliciosa comida tradicional preparada 
              con ingredientes frescos y recetas que han pasado de 
              generación en generación.
            </p>
        <div className={styles.footerDivider}>
          <p className={styles.footerCopyright}>
            © {new Date().getFullYear()} Tikay Cafetería & Restaurante. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const audioRef = useRef(null);

  // Intentar reproducir el audio automáticamente y tras la primera interacción
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };
    // Intento inicial (por si el navegador lo permite)
    playAudio();
    // Listener para el primer clic en cualquier parte
    const handleFirstClick = () => {
      playAudio();
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => {
      window.removeEventListener('click', handleFirstClick);
    };
  }, []);

  const handleAudioToggle = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <Router>
      <div className={`App ${styles.homePage}`}>
        {/* Audio global en toda la app */}
        <audio ref={audioRef} src="/audio/Jazz Music.mp3" autoPlay loop style={{ display: 'none' }} />
        <Routes>
          <Route path="/management" element={<ReservationManagement />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/" element={
            <>
      <Header onAudioToggle={handleAudioToggle} isAudioPlaying={isAudioPlaying} />
      
      {/* Zona marrón con logo */}
      <section className="logo-section" style={{
        background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
        padding: '15px 0',
        borderTop: '3px solid #DAA520',
        borderBottom: '3px solid #DAA520',
        boxShadow: '0 4px 15px rgba(139, 69, 19, 0.3)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <img 
              src="/imagenes/logo con tikay.jpeg" 
              alt="Logo Tikay" 
              style={{
                height: '80px',
                width: 'auto',
                borderRadius: '8px',
                border: '2px solid #DAA520',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
              }}
            />
            <div style={{
              color: '#F5DEB3',
              fontFamily: 'Georgia, serif'
            }}>
              <h2 style={{
                margin: '0',
                fontSize: '1.8rem',
                fontWeight: '700',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                Tikay Cafetería & Restaurante
              </h2>
              <p style={{
                margin: '5px 0 0 0',
                fontSize: '1rem',
                fontStyle: 'italic',
                opacity: '0.9'
              }}>
                Sabor auténtico peruano en el corazón de Pachacámac
              </p>
            </div>
          </div>
          
          {/* Iconos de Redes Sociales */}
          <div className="social-icons" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <a 
              href="https://www.facebook.com/p/Tikay-Cafeter%C3%ADa-100086534575514/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'transparent',
                border: '2px solid #DAA520',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#DAA520';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <img 
                src="/imagenes/facebook.jpg" 
                alt="Facebook" 
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%'
                }}
              />
            </a>
            
            <a 
              href="https://www.instagram.com/tikaycafeteria/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'transparent',
                border: '2px solid #DAA520',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#DAA520';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <img 
                src="/imagenes/instegram.jpg" 
                alt="Instagram" 
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%'
                }}
              />
            </a>
            
            <a 
              href="https://www.youtube.com/shorts/QUh7nNZlbn8" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'transparent',
                border: '2px solid #DAA520',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#DAA520';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <img 
                src="/imagenes/youtube.png" 
                alt="YouTube" 
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%'
                }}
              />
            </a>
            
            <a 
              href="https://www.tiktok.com/@tikaycafeteria" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'transparent',
                border: '2px solid #DAA520',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#DAA520';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <img 
                src="/imagenes/tiktok.png" 
                alt="TikTok" 
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%'
                }}
              />
            </a>
          </div>
        </div>
      </section>
      
      <main style={{ marginTop: '20px' }}>
                {/* Carruseles de Menú por Categorías */}
                <MenuCarouselGrid 
                  autoPlay={true} 
                  showControls={false}
                  featuredCategories={['espresso-bar', 'desayunos', 'platos-carta']}
                />
                
                {/* Mapa de ubicación */}
                <section style={{
                  background: 'linear-gradient(135deg, #F5DEB3 60%, #CD853F 100%)',
                  padding: '40px 20px 60px 20px',
                  textAlign: 'center',
                  borderTop: '3px solid #DAA520'
                }}>
                  <h2 style={{
                    fontSize: '2rem',
                    color: '#8B4513',
                    fontWeight: 700,
                    marginBottom: '20px',
                    textShadow: '1px 1px 2px rgba(139, 69, 19, 0.15)'
                  }}>¿Dónde estamos?</h2>
                  <div style={{
                    maxWidth: '800px',
                    margin: '0 auto 20px auto',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(139, 69, 19, 0.2)'
                  }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.307484063046!2d-76.8663302!3d-12.237512700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105bd5190c29bcb%3A0x9031a7fa4f7b1598!2sTIKAY%20Cafeteria%20%26%20Restaurante!5e1!3m2!1ses-419!2spe!4v1752213901554!5m2!1ses-419!2pe"
                      width="100%"
                      height="400"
                      style={{ border: 0, borderRadius: '16px', width: '100%', maxWidth: '800px', margin: '0 auto', display: 'block' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación Tikay Cafetería & Restaurante"
                    ></iframe>
                  </div>
                  <p style={{
                    marginTop: '18px',
                    color: '#8B4513',
                    fontSize: '1.1rem',
                    fontWeight: 500
                  }}>
                    <strong>Referencia:</strong> Av. Manuel Valle Valle con Las Magnolias. Al frente de la Universidad San Ignacio de Loyola (USIL) - Pachacámac
                  </p>
                </section>
      </main>
      <Footer />
            </>
          } />
        </Routes>
    </div>
    </Router>
  );
}

export default App; 