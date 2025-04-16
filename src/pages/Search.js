import React, { useState } from 'react';
import { searchSongs } from '../api/spotify';
import './Search.css';

function Search({ onSongSelect, onToggleFavorite, favorites }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const songs = await searchSongs(query);
    setResults(songs);
  };

  const isFavorite = (song) => favorites.some((fav) => fav.id === song.id);

  return (
    <div className="search-page">
      <h2>Buscar Canciones</h2>
      <input
        type="text"
        placeholder="Busca tu canción favorita..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div className="search-results">
        {results.map((song) => (
          <div
            key={song.id}
            className="search-item"
            onClick={() => onSongSelect(song)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={song.album.images[0]?.url}
              alt={song.name}
              className="album-cover"
            />
            <div className="song-info">
              <p className="song-title">{song.name}</p>
              <p className="song-artist">{song.artists[0].name}</p>
            </div>
            <button
              className="toggle-favorite"
              onClick={(e) => {
                e.stopPropagation(); // Evita que el clic seleccione la canción
                onToggleFavorite(song);
              }}
            >
              {isFavorite(song) ? 'Quitar de Favoritos' : 'Guardar en Favoritas'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;