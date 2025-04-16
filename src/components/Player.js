import React from 'react';
import ReactPlayer from 'react-player';
import './Player.css';

function Player({ currentSong }) {
  return (
    <div className="player">
      <p>Reproduciendo: {currentSong ? `${currentSong.title} - ${currentSong.artist}` : 'Ninguna canción seleccionada'}</p>
      {currentSong && (
        <ReactPlayer
          url={currentSong.preview_url}
          playing
          controls
          width="100%"
          height="50px"
        />
      )}
    </div>
  );
}

export default Player;