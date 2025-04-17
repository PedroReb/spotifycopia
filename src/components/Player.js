import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './Player.css';

function Player({ currentSong, queue, onNext, onPrevious, setQueue, setCurrentSong }) {
  const [progress, setProgress] = useState(0); // Estado para el progreso de la canción
  const [error, setError] = useState(false); // Estado para manejar errores de reproducción

  if (!currentSong) {
    return <div className="player">Selecciona una canción para reproducir.</div>;
  }

  // Formatear el tiempo en minutos:segundos
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Eliminar una canción de la cola
  const handleRemoveFromQueue = (index) => {
    const updatedQueue = queue.filter((_, i) => i !== index);
    setQueue(updatedQueue);
  };

  // Reproducir una canción directamente desde la cola
  const handlePlayFromQueue = (index) => {
    const selectedSong = queue[index];
    const updatedQueue = [...queue.slice(0, index), ...queue.slice(index + 1)];
    setCurrentSong(selectedSong);
    setQueue(updatedQueue);
  };

  return (
    <div className="player">
      <div className="player-info">
        <img src={currentSong.image} alt={currentSong.title} className="album-cover" />
        <div className="song-details">
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
      </div>
      {currentSong.preview_url ? (
  <ReactPlayer
    url={currentSong.preview_url}
    playing
    controls
    onProgress={({ playedSeconds }) => setProgress(playedSeconds)} // Actualizar el progreso
    onEnded={onNext} // Reproduce la siguiente canción automáticamente
    onError={() => setError(true)} // Manejar errores de reproducción
  />
) : (
  <p className="error">Esta canción no tiene una vista previa disponible.</p>
)}
      {error && <p className="error">Error al reproducir la canción. Intenta con otra.</p>}
      <div className="player-controls">
        <button onClick={onPrevious}>Anterior</button>
        <button onClick={onNext}>Siguiente</button>
      </div>
      <div className="progress">
        <p>Progreso: {formatTime(progress)}</p>
      </div>
      <div className="queue">
        <h4>Cola de reproducción</h4>
        <ul>
          {queue.map((song, index) => (
            <li key={index} className="queue-item">
              <span onClick={() => handlePlayFromQueue(index)}>
                {song.title} - {song.artist}
              </span>
              <button onClick={() => handleRemoveFromQueue(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Player;