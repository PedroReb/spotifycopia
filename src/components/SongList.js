import React from 'react';
import './SongList.css';

function SongList({ songs, onSongSelect }) {
  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <div
          key={index}
          className="song-item"
          onClick={() => onSongSelect(song)}
          style={{ cursor: 'pointer' }}
        >
          <p>{song.title} - {song.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default SongList;