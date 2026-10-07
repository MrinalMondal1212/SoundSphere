import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { X, ChevronUp, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { togglePlay, stopSong } from '../store/playerSlice'

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00'
  const min = Math.floor(time / 60)
  const sec = Math.floor(time % 60)
  return `${min}:${sec < 10 ? '0' : ''}${sec}`
}

const GlobalPlayer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentSong, isPlaying } = useSelector((state) => state.player)
  
  const audioRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  // Sync play/pause state with the audio element
  useEffect(() => {
    if (!audioRef.current) return
    
    // When currentSong changes, load the new source
    if (audioRef.current.src !== currentSong.audioUrl) {
      audioRef.current.load()
    }

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Audio play failed:", err)
        // If play fails (e.g. browser policy), revert Redux state to paused
        // dispatch(togglePlay()) or similar. For now just log it.
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentSong])

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const current = audioRef.current.currentTime || 0
    const total = audioRef.current.duration || 0
    setCurrentTime(current)
    setDuration(total)
    setProgress(total > 0 ? (current / total) * 100 : 0)

    // Dispatch global event so SongPage can sync
    window.dispatchEvent(new CustomEvent('audio-time-update', { 
      detail: { currentTime: current, duration: total } 
    }))
  }

  // Handle native audio events to keep Redux in sync
  const handleNativePlay = () => {
    if (!isPlaying) dispatch(togglePlay())
  }
  
  const handleNativePause = () => {
    if (isPlaying) dispatch(togglePlay())
  }

  const handleSeek = (e) => {
    if (!audioRef.current) return
    const newTime = (Number(e.target.value) / 100) * (duration || 0)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolume = (e) => {
    const vol = Number(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  useEffect(() => {
    const handleGlobalSeek = (e) => {
      if (!audioRef.current) return
      audioRef.current.currentTime = e.detail.newTime
    }
    window.addEventListener('audio-seek', handleGlobalSeek)
    return () => window.removeEventListener('audio-seek', handleGlobalSeek)
  }, [])

  if (!currentSong) return null

  // Hide visually when on the dedicated SongPage so it doesn't overlap
  const isSongPage = location.pathname.startsWith('/song/')

  return (
    <div className={`fixed bottom-0 left-0 w-full z-50 bg-[#121212] border-t border-border shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 ${isSongPage ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => {
           if (isPlaying) dispatch(togglePlay());
        }}
        onPlay={handleNativePlay}
        onPause={handleNativePause}
      />

      <div className="flex flex-col md:flex-row items-center px-4 py-2 gap-4 max-w-[1600px] mx-auto h-20">

        {/* Song Info (Left) */}
        <button
          onClick={() => navigate(`/song/${currentSong._id}`)}
          className="hidden md:flex items-center gap-3 w-1/4 min-w-[200px] group text-left"
          title="Open full song page"
        >
          {currentSong.coverImageUrl ? (
            <img
              src={currentSong.coverImageUrl}
              alt={currentSong.title}
              className="w-14 h-14 rounded shadow-md object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-14 h-14 rounded shadow-md bg-gradient-to-br from-primary to-secondary flex-shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate group-hover:text-primary transition-colors">
              {currentSong.title}
            </p>
            <p className="text-text-muted text-xs truncate mt-0.5">
              {currentSong.artistId?.name || 'Unknown Artist'}
            </p>
          </div>
          <ChevronUp size={16} className="text-text-muted group-hover:text-primary transition-colors flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100" />
        </button>

        {/* Player Controls (Center) */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-2xl w-full">
          <div className="flex items-center gap-6 mb-1">
            <button className="text-text-muted hover:text-white transition-colors">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button
              onClick={() => dispatch(togglePlay())}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              {isPlaying ? (
                <Pause size={16} fill="black" />
              ) : (
                <Play size={16} fill="black" className="ml-1" />
              )}
            </button>
            <button className="text-text-muted hover:text-white transition-colors">
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full text-[10px] text-text-muted font-medium">
            <span className="w-8 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-card rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer accent-primary"
            />
            <span className="w-8">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center justify-end w-1/4 min-w-[200px] gap-3">
          <Volume2 size={18} className="text-text-muted" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="w-24 h-1.5 bg-card rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer accent-primary"
          />
          <button
            onClick={() => dispatch(stopSong())}
            className="ml-4 p-2 rounded-full text-text-muted hover:text-danger hover:bg-danger/10 transition-all"
            title="Close player"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GlobalPlayer
