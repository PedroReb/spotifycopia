import React, { useState } from 'react';
import { searchSongs } from '../api/spotify'; // Importa la función de búsqueda
import './Search.css';

function Search({ onSongSelect, onToggleFavorite, favorites = [] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const tracks = await searchSongs(query); // Usa la función de búsqueda
      const formattedTracks = tracks.map((track) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name).join(', '),
        preview_url: track.preview_url,
        album: track.album.name,
        image: track.album.images[0]?.url,
      }));

      setResults(formattedTracks);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Hubo un problema al buscar canciones. Intenta nuevamente.');
    }
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
      {error && <p className="error">{error}</p>}
      <div className="search-results">
        {results.map((song) => (
          <div key={song.id} className="search-item">
            <img src={song.image} alt={song.name} className="album-cover" />
            <div className="song-info">
              <p className="song-title">{song.name}</p>
              <p className="song-artist">{song.artists}</p>
            </div>
            <button onClick={() => onToggleFavorite(song)}>
              {isFavorite(song) ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
            </button>
            {song.preview_url && (
              <button onClick={() => onSongSelect(song)}>Reproducir</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;