import React, { useState } from 'react'; // Importa useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import PlaylistDetails from './pages/PlaylistDetails';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null); // Estado para la canción actual
  const [favorites, setFavorites] = useState([]); // Estado para las canciones favoritas

  const handleSongSelect = (song) => {
    setCurrentSong({
      title: song.name,
      artist: song.artists[0].name,
      preview_url: song.preview_url,
    });
  };

  const handleToggleFavorite = (song) => {
    if (favorites.some((fav) => fav.id === song.id)) {
      // Si la canción ya está en favoritos, la elimina
      setFavorites(favorites.filter((fav) => fav.id !== song.id));
    } else {
      // Si no está en favoritos, la añade
      setFavorites([...favorites, song]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={
              <Search
                onSongSelect={handleSongSelect}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites} // Pasa favorites como prop
              />
            }
          />
          <Route
            path="/library"
            element={
              <Library
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/playlists/:playlistId"
            element={<PlaylistDetails onSongSelect={handleSongSelect} />}
          />
        </Routes>
        <Player currentSong={currentSong} />
      </div>
    </Router>
  );
}

export default App;