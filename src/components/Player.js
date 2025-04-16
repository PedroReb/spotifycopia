import React from 'react';
import ReactPlayer from 'react-player';
import './Player.css';

function Player({ currentSong }) {
  return (
    <div className="player">
      {currentSong ? (
        <>
          <p className="player-info">
            Reproduciendo: <strong>{currentSong.title}</strong> - {currentSong.artist}
          </p>
          <ReactPlayer
            url={currentSong.preview_url}
            playing
            controls
            width="100%"
            height="50px"
          />
        </>
      ) : (
        <p className="player-placeholder">Selecciona una canción para reproducir</p>
      )}
    </div>
  );
}

export default Player;