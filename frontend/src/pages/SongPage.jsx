import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Play, Pause, Heart, Download, SkipBack, SkipForward,
  Shuffle, Repeat, ArrowLeft, Music, Volume2
} from 'lucide-react'
import { togglePlay } from '../store/playerSlice'

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00'
  const min = Math.floor(time / 60)
  const sec = Math.floor(time % 60)
  return `${min}:${sec < 10 ? '0' : ''}${sec}`
}

export default function SongPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentSong, isPlaying } = useSelector((state) => state.player)
  
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [liked, setLiked] = useState(false)

  // Listen to GlobalPlayer's time updates
  useEffect(() => {
    const handleTimeUpdate = (e) => {
      setCurrentTime(e.detail.currentTime)
      setDuration(e.detail.duration)
    }
    window.addEventListener('audio-time-update', handleTimeUpdate)
    return () => window.removeEventListener('audio-time-update', handleTimeUpdate)
  }, [])

  const handleSeek = (e) => {
    const newTime = (Number(e.target.value) / 100) * duration
    window.dispatchEvent(new CustomEvent('audio-seek', { detail: { newTime } }))
  }

  // If no song selected, show empty state
  if (!currentSong) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex items-center justify-center text-center">
        <div>
          <Music size={56} className="mx-auto text-text-muted mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">No song selected</h2>
          <p className="text-text-secondary text-sm mb-6">Click play on any song to get started.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:scale-105 transition-all"
          >
            Browse Songs
          </button>
        </div>
      </div>
    )
  }

  const progress = (currentTime / duration) * 100 || 0

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full bg-black text-white flex flex-col overflow-y-auto overflow-x-hidden">
      
      {/* Blurred Background Image */}
      {currentSong.coverImageUrl && (
        <div 
          className="fixed inset-0 bg-cover bg-center opacity-40 blur-[100px] scale-150 z-0 pointer-events-none transition-all duration-1000"
          style={{ backgroundImage: `url(${currentSong.coverImageUrl})` }}
        />
      )}
      
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/70 to-[#0a0a0a] z-0 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between w-full max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 backdrop-blur-md text-white transition-all shadow-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold mb-1">Now Playing</p>
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold backdrop-blur-md shadow-sm">
            {currentSong.category || 'SoundSphere'}
          </span>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </header>

      {/* Main content - Side by Side on Desktop */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6 py-8 w-full max-w-6xl mx-auto">

        {/* Left Column: Cover Art */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 shrink-0 relative group">
          {currentSong.coverImageUrl ? (
            <img
              src={currentSong.coverImageUrl}
              alt={currentSong.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Music size={80} className="text-white/60" />
            </div>
          )}
          
          {/* Subtle inner shadow for depth */}
          <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none" />
        </div>

        {/* Right Column: Player Controls (Glassmorphism card) */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col">
          
          {/* Track Info */}
          <div className="flex items-start justify-between mb-8 gap-4">
            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white truncate drop-shadow-md mb-2">{currentSong.title}</h2>
              <p className="text-gray-400 text-base sm:text-lg truncate drop-shadow-sm font-medium">{currentSong.artistId?.name || 'Unknown Artist'}</p>
            </div>
            <button 
              onClick={() => setLiked(!liked)}
              className="p-3 shrink-0 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-gray-300 hover:text-white mt-1"
            >
              <Heart size={22} className={liked ? 'text-primary fill-primary' : ''} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex flex-col gap-3 mb-8">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-2 bg-black/40 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer accent-white hover:[&::-webkit-slider-thumb]:scale-125 transition-all shadow-inner"
            />
            <div className="flex items-center justify-between text-xs text-gray-400 font-semibold tracking-wide px-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Primary Controls */}
          <div className="w-full flex items-center justify-between px-2 mb-6">
            <button className="text-gray-500 hover:text-white transition-colors p-2"><Shuffle size={20} /></button>
            
            <button className="text-white hover:scale-110 hover:text-primary transition-all p-2">
              <SkipBack size={28} fill="currentColor" />
            </button>
            
            <button
              onClick={() => dispatch(togglePlay())}
              className="w-20 h-20 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-[0_10px_40px_rgba(238,16,176,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause size={32} fill="white" />
              ) : (
                <Play size={32} fill="white" className="ml-2" />
              )}
            </button>
            
            <button className="text-white hover:scale-110 hover:text-primary transition-all p-2">
              <SkipForward size={28} fill="currentColor" />
            </button>
            
            <button className="text-gray-500 hover:text-white transition-colors p-2"><Repeat size={20} /></button>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/10 text-gray-400">
            <button className="hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <Download size={16} /> Save
            </button>
          </div>
          
        </div>
      </main>
    </div>
  )
}