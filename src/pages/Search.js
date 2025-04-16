import React, { useState } from 'react';
import { searchSongs } from '../api/spotify';

function Search({ onSongSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const songs = await searchSongs(query);
    setResults(songs);
  };

  return (
    <div>
      <h2>Buscar Canciones</h2>
      <input
        type="text"
        placeholder="Busca tu canción favorita..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div>
        {results.map((song) => (
          <div
            key={song.id}
            onClick={() => onSongSelect(song)}
            style={{ cursor: 'pointer' }}
          >
            <p>{song.name} - {song.artists[0].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;