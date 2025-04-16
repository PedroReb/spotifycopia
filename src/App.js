import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SongList from './components/SongList';
import Player from './components/Player';
import Search from './pages/Search';
import Library from './pages/Library';
import './App.css';

function App() {
  const [songs] = useState([
    { title: 'Canción 1', artist: 'Artista 1', preview_url: 'https://example.com/song1.mp3' },
    { title: 'Canción 2', artist: 'Artista 2', preview_url: 'https://example.com/song2.mp3' },
    { title: 'Canción 3', artist: 'Artista 3', preview_url: 'https://example.com/song3.mp3' },
  ]);
  const [currentSong, setCurrentSong] = useState(null);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<SongList songs={songs} onSongSelect={handleSongSelect} />} />
          <Route path="/search" element={<Search onSongSelect={handleSongSelect} />} />
          <Route path="/library" element={<Library />} />
        </Routes>
        <Player currentSong={currentSong} />
      </div>
    </Router>
  );
}

export default App;