import React from 'react';
import './Library.css';

function Library({ favorites, onToggleFavorite , onSongSelect }) {
  
  return (
    <div className="library-page">
      <h2>Tu Biblioteca</h2>
      {favorites.length === 0 ? (
        <p>No tienes canciones guardadas en tu biblioteca.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((song) => (
            <div key={song.id} className="favorite-item"
               onClick={() => onSongSelect(song)} 
               style={{ cursor: 'pointer' }}>
              <img
                src={song.image}
                alt={song.name}
                className="album-cover"
              />
              <div className="song-info">
                <p className="song-title">{song.name}</p>
                <p className="song-artist">{song.artists}</p>
              </div>
              <button
                 className="remove-favorite"
                 onClick={(e) => {
                   e.stopPropagation(); 
                   onToggleFavorite(song);
                 }}
               >
                Quitar de Favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;