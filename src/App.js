import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import PlaylistDetails from './pages/PlaylistDetails';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleSongSelect = (song) => {
    setCurrentSong({
      title: song.name,
      artist: song.artists,
      preview_url: song.preview_url,
      image: song.image,
    });
  };

  const handleToggleFavorite = (song) => {
    if (favorites.some((fav) => fav.id === song.id)) {
      // Si la canción ya está en favoritos, la elimina
      const updatedFavorites = favorites.filter((fav) => fav.id !== song.id);
      setFavorites(updatedFavorites);
    } else {
      // Si no está en favoritos, la añade
      const updatedFavorites = [...favorites, song];
      setFavorites(updatedFavorites);
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
                favorites={favorites}
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