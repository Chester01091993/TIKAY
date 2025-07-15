import React, { useRef, useEffect } from 'react';
import './AudioBackground.module.css';

const AudioBackground = ({ isPlaying, onToggle }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(error => {
        console.log('Error reproduciendo audio:', error);
        // En algunos navegadores, el autoplay está bloqueado
        // El usuario debe interactuar primero con la página
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  // Manejar el final del audio para que se repita
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log('Error reproduciendo audio en loop:', error);
      });
    }
  };

  return (
    <div className="audioBackground">
      <audio
        ref={audioRef}
        src="/audio/Jazz Music.mp3"
        onEnded={handleEnded}
        preload="metadata"
        loop
      />
      
      {/* Botón flotante para controlar el audio */}
      <button
        className={`audioControlButton ${isPlaying ? 'playing' : ''}`}
        onClick={onToggle}
        title={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
      >
        <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
        <span className="audioLabel">
          {isPlaying ? 'Pausar' : 'Música'}
        </span>
      </button>
    </div>
  );
};

export default AudioBackground; 