import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import PlaylistDetails from './pages/PlaylistDetails';
import { fetchFeaturedPlaylists } from './api/spotify';
import { fetchNewReleases } from './api/spotify';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [queue, setQueue] = useState([]);
const[history, setHistory] = useState([]); 
const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [fetchNewReleases, setFetchNewReleases] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);


  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const playlists = await fetchNewReleases(); // Cambiar a fetchNewReleases
        setPlaylists(playlists);
      } catch (error) {
        console.error('Error al obtener datos de Spotify:', error.message);
        setError(error.message); // Mostrar el error en la UI
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleSongSelect = (song) => {
    setCurrentSong(song)
      setQueue([song]); 
      setCurrentSong(song); 
     
    };
    
  

  const handleToggleFavorite = (song) => {
    if (favorites.some((fav) => fav.id === song.id)) {

      const updatedFavorites = favorites.filter((fav) => fav.id !== song.id);
      setFavorites(updatedFavorites);
    } else {
    
      const updatedFavorites = [...favorites, song];
      setFavorites(updatedFavorites);
    }
  };
  const handleNextSong = () => {
    if (queue.length > 1) {
      const [, ...remainingQueue] = queue; 
      setQueue(remainingQueue);
      setCurrentSong(remainingQueue[0]); 
    }
  };

  const handlePreviousSong = () => {

    
    console.log('Funcionalidad de canción anterior no implementada aún.');
  };
const handleAddToHistory = (song) => {
  setHistory((prevHistory) => [...prevHistory, song]);
  setCurrentSong(song);
  setQueue([song]);
}
const handleRemoveFromHistory = (song) => {
  setHistory((prevHistory) => prevHistory.filter((item) => item.id !== song.id));
  setCurrentSong(null);
  setQueue([]);
}

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
                onSongSelect={handleSongSelect}
              />
            }
          />
          <Route
            path="/playlists/:playlistId"
            element={<PlaylistDetails onSongSelect={handleSongSelect} />}
          />
        </Routes>
        <Player currentSong={currentSong} 
        queue={queue}
        onSongSelect={handleSongSelect}
        onToggleFavorite={handleToggleFavorite}
        onNext={handleNextSong}
        onPrevious={handlePreviousSong}
        />
      
          

      </div>
    </Router>
  );
}

export default App;