import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './PlaylistDetails.css';

function PlaylistDetails({ onSongSelect }) {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([
    { id: 1, title: 'Canción 1', artist: 'Artista 1', preview_url: 'https://example.com/song1.mp3' },
    { id: 2, title: 'Canción 2', artist: 'Artista 2', preview_url: 'https://example.com/song2.mp3' },
    { id: 3, title: 'Canción 3', artist: 'Artista 3', preview_url: 'https://example.com/song3.mp3' },
  ]);

  return (
    <div className="playlist-details">
      <h2>Playlist {playlistId}</h2>
      <div className="songs-list">
        {songs.map((song) => (
          <div
            key={song.id}
            className="song-item"
            onClick={() => onSongSelect(song)}
            style={{ cursor: 'pointer' }}
          >
            <p>{song.title} - {song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistDetails;