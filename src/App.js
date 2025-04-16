import React, { useState } from 'react'; // Importa React y useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Router, Routes y Route
import Navbar from './components/Navbar'; // Importa el componente Navbar
import Player from './components/Player'; // Importa el componente Player
import Home from './pages/Home'; // Importa la página Home
import Search from './pages/Search'; // Importa la página Search
import Library from './pages/Library'; // Importa la página Library
import PlaylistDetails from './pages/PlaylistDetails'; // Importa la página PlaylistDetails
import './App.css'; // Importa los estilos globales

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  const handleSongSelect = (song) => {
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      preview_url: song.preview_url,
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search onSongSelect={handleSongSelect} />} />
          <Route path="/library" element={<Library />} />
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