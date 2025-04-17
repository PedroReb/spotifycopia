import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, searchSongs } from '../api/spotify';
import './Home.css';

function Home({ onSongSelect }) {
  const [playlists, setPlaylists] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
  
        // Obtener playlists
        const playlistsResponse = await fetch(
          'https://api.spotify.com/v1/browse/featured-playlists',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!playlistsResponse.ok) {
          throw new Error(`Error al obtener playlists: ${playlistsResponse.status}`);
        }
  
        const playlistsData = await playlistsResponse.json();
        console.log('Playlists obtenidas:', playlistsData); // Depuración
  
        setPlaylists(
          playlistsData.playlists.items.map((playlist) => ({
            id: playlist.id,
            name: playlist.name,
            image: playlist.images[0]?.url,
          }))
        );
      } catch (error) {
        console.error('Error al obtener datos de Spotify:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlists/${playlistId}`);
  };

  if (loading) {
    return <div className="home">Cargando contenido...</div>;
  }

  return (
    <div className="home">
      <header className="header">
        <h2>Bienvenido a SpotifyCopia</h2>
      </header>
      <section className="content">
        <h3>Tus Playlists</h3>
        <div className="carousel">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="card"
              onClick={() => handlePlaylistClick(playlist.id)}
            >
              <img src={playlist.image} alt={playlist.name} />
              <p>{playlist.name}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="content">
        <h3>Canciones Recomendadas</h3>
        <div className="carousel">
          {recommendedSongs.map((song) => (
            <div
              key={song.id}
              className="card"
              onClick={() => onSongSelect(song)}
            >
              <img src={song.image} alt={song.title} />
              <div className="song-info">
                <p className="song-title">{song.title}</p>
                <p className="song-artist">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="content">
        <h3>Álbumes Populares</h3>
        <div className="carousel">
          {popularAlbums.map((album) => (
            <div key={album.id} className="card">
              <img src={album.image} alt={album.name} />
              <div className="song-info">
                <p className="song-title">{album.name}</p>
                <p className="song-artist">{album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;