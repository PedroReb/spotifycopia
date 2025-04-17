import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Playlist 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Playlist 2', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Playlist 3', image: 'https://via.placeholder.com/150' },
  ]);

  const navigate = useNavigate();

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlists/${playlistId}`);
  };
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
    };


  return (
    <div className="home">
    
      <div className="main-content">
        <header className="header">
          <h2>{getGreeting()}</h2>
        </header>
        <div className="content">
          <h3>Tus Playlists</h3>
          <div className="carousel">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="card"
                onClick={() => handlePlaylistClick(playlist.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={playlist.image} alt={playlist.name} />
                <p>{playlist.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;