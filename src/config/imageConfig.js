// Configuración de imágenes optimizadas
// Generado automáticamente por el script de optimización

export const imageConfig = {
  "images": {
    "Americano": "/imagenes/optimized/Americano.jpg",
    "Asado de la Abuela": "/imagenes/optimized/Asado de la Abuela.jpg",
    "banner": "/imagenes/optimized/banner.jpg",
    "bolitos de angry birs": "/imagenes/optimized/bolitos de angry birs.jpg",
    "Cappuccino": "/imagenes/optimized/Cappuccino.jpeg",
    "Causa de Pollo Tikay": "/imagenes/optimized/Causa de Pollo Tikay.jpg",
    "Chai de los Apus": "/imagenes/optimized/Chai de los Apus.jpg",
    "Clásica": "/imagenes/optimized/Clásica.jpg",
    "Cortado": "/imagenes/optimized/Cortado.png",
    "Delirio de Amor": "/imagenes/optimized/Delirio de Amor.jpg",
    "Desayuno Americano": "/imagenes/optimized/Desayuno Americano.jpg",
    "Desayuno Light": "/imagenes/optimized/Desayuno Light.jpg",
    "Desayuno Tikay": "/imagenes/optimized/Desayuno Tikay.jpg",
    "Dulzura de Lúcuma": "/imagenes/optimized/Dulzura de Lúcuma.jpg",
    "Espresso Doble": "/imagenes/optimized/Espresso Doble.jpg",
    "Espresso": "/imagenes/optimized/Espresso.jpg",
    "Eterno Deseo": "/imagenes/optimized/Eterno Deseo.jpg",
    "facebook": "/imagenes/optimized/facebook.jpg",
    "instegram": "/imagenes/optimized/instegram.jpg",
    "Jugo de Naranja": "/imagenes/optimized/Jugo de Naranja.jpg",
    "Jugo de Papaya": "/imagenes/optimized/Jugo de Papaya.jpg",
    "Latte": "/imagenes/optimized/Latte.jpg",
    "Limonada": "/imagenes/optimized/Limonada.jpg",
    "logo1": "/imagenes/optimized/logo1.jpg",
    "logo con tikay": "/imagenes/logo con tikay.jpeg",
    "Lomo Saltado Flameado": "/imagenes/optimized/Lomo Saltado Flameado.jpg",
    "Macchiato": "/imagenes/optimized/Macchiato.jpg",
    "menú": "/imagenes/optimized/menú.jpg",
    "Milkshake.": "/imagenes/optimized/Milkshake..jpg",
    "MilkShake": "/imagenes/optimized/MilkShake.jpg",
    "reservas": "/imagenes/optimized/reservas.jpg",
    "Royal": "/imagenes/optimized/Royal.jpg",
    "Tallarín Saltado Tikay": "/imagenes/optimized/Tallarín Saltado Tikay.jpg",
    "Tikay": "/imagenes/optimized/Tikay.jpg",
    "tiktok": "/imagenes/optimized/tiktok.png",
    "Tostones": "/imagenes/optimized/Tostones.jpg",
    "youtube": "/imagenes/optimized/youtube.png"
  },
  "webp": {
    "Americano": "/imagenes/optimized/Americano.webp",
    "Asado de la Abuela": "/imagenes/optimized/Asado de la Abuela.webp",
    "banner": "/imagenes/optimized/banner.webp",
    "bolitos de angry birs": "/imagenes/optimized/bolitos de angry birs.webp",
    "Cappuccino": "/imagenes/optimized/Cappuccino.webp",
    "Causa de Pollo Tikay": "/imagenes/optimized/Causa de Pollo Tikay.webp",
    "Chai de los Apus": "/imagenes/optimized/Chai de los Apus.webp",
    "Clásica": "/imagenes/optimized/Clásica.webp",
    "Cortado": "/imagenes/optimized/Cortado.webp",
    "Delirio de Amor": "/imagenes/optimized/Delirio de Amor.webp",
    "Desayuno Americano": "/imagenes/optimized/Desayuno Americano.webp",
    "Desayuno Light": "/imagenes/optimized/Desayuno Light.webp",
    "Desayuno Tikay": "/imagenes/optimized/Desayuno Tikay.webp",
    "Dulzura de Lúcuma": "/imagenes/optimized/Dulzura de Lúcuma.webp",
    "Espresso Doble": "/imagenes/optimized/Espresso Doble.webp",
    "Espresso": "/imagenes/optimized/Espresso.webp",
    "Eterno Deseo": "/imagenes/optimized/Eterno Deseo.webp",
    "facebook": "/imagenes/optimized/facebook.webp",
    "instegram": "/imagenes/optimized/instegram.webp",
    "Jugo de Naranja": "/imagenes/optimized/Jugo de Naranja.webp",
    "Jugo de Papaya": "/imagenes/optimized/Jugo de Papaya.webp",
    "Latte": "/imagenes/optimized/Latte.webp",
    "Limonada": "/imagenes/optimized/Limonada.webp",
    "logo1": "/imagenes/optimized/logo1.webp",
    "logo con tikay": "/imagenes/logo con tikay.jpeg",
    "Lomo Saltado Flameado": "/imagenes/optimized/Lomo Saltado Flameado.webp",
    "Macchiato": "/imagenes/optimized/Macchiato.webp",
    "menú": "/imagenes/optimized/menú.webp",
    "Milkshake.": "/imagenes/optimized/Milkshake..webp",
    "MilkShake": "/imagenes/optimized/MilkShake.webp",
    "reservas": "/imagenes/optimized/reservas.webp",
    "Royal": "/imagenes/optimized/Royal.webp",
    "Tallarín Saltado Tikay": "/imagenes/optimized/Tallarín Saltado Tikay.webp",
    "Tikay": "/imagenes/optimized/Tikay.webp",
    "tiktok": "/imagenes/optimized/tiktok.webp",
    "Tostones": "/imagenes/optimized/Tostones.webp",
    "youtube": "/imagenes/optimized/youtube.webp"
  }
};

// Función helper para obtener la imagen optimizada
export const getOptimizedImage = (name, preferWebp = true) => {
  if (preferWebp && imageConfig.webp[name]) {
    return imageConfig.webp[name];
  }
  return imageConfig.images[name] || `/imagenes/${name}.jpg`;
};

// Función para precargar imágenes críticas
export const preloadCriticalImages = () => {
  const criticalImages = [
    'logo con tikay',
    'banner',
    'menú'
  ];
  
  criticalImages.forEach(imageName => {
    const img = new Image();
    img.src = getOptimizedImage(imageName);
  });
};

// Función para cargar imagen con fallback
export const loadImageWithFallback = (name, onLoad, onError) => {
  const img = new Image();
  
  img.onload = () => onLoad && onLoad(img);
  img.onerror = () => {
    // Fallback a imagen original
    img.src = `/imagenes/${name}.jpg`;
    img.onerror = () => onError && onError();
  };
  
  img.src = getOptimizedImage(name);
  return img;
};
