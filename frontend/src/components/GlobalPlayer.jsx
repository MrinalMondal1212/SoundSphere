import React from 'react';
import { useSelector } from 'react-redux';

const GlobalPlayer = () => {
  const currentSong = useSelector((state) => state.player.currentSong);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-surface border-t border-border p-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3 w-1/4 min-w-[200px]">
        {currentSong.coverImageUrl && (
          <img
            src={currentSong.coverImageUrl}
            alt={currentSong.title}
            className="w-12 h-12 rounded-md object-cover flex-shrink-0"
          />
        )}
        <div className="min-w-0">
          <p className="text-text text-sm font-semibold truncate">{currentSong.title}</p>
          <p className="text-text-muted text-xs truncate">
            {currentSong.artistId?.name || 'Unknown Artist'}
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <audio
          src={currentSong.audioUrl}
          autoPlay
          controls
          className="h-10 w-[400px]"
        />
      </div>
      <div className="w-1/4 min-w-[200px]"></div>
    </div>
  );
};

export default GlobalPlayer;
