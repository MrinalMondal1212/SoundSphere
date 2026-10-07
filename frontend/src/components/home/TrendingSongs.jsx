import { useState } from 'react'
import { Heart, Play, Clock } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { playSong } from '../../store/playerSlice'
import { toggleLike } from '../../store/songSlice'

const MINI_GRADIENTS = [
  'from-pink-500 to-rose-700',
  'from-purple-500 to-indigo-700',
  'from-blue-500 to-cyan-700',
  'from-green-500 to-teal-700',
  'from-yellow-500 to-orange-700',
  'from-red-500 to-pink-700',
  'from-teal-500 to-blue-700',
]

// ─── Trending Row ─────────────────────────────────────────────────────────────

const TrendingRow = ({ song, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()
  
  // Since we don't have user specific liked status in publicSongs, 
  // you might rely on global state or local for UI. Let's just use local for visual + dispatch
  const [liked, setLiked] = useState(false)

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
    dispatch(toggleLike(song._id))
  }

  return (
    <div
      onClick={() => dispatch(playSong(song))}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="grid items-center gap-4 px-4 py-3 rounded-xl hover:bg-card transition-colors cursor-pointer"
      style={{ gridTemplateColumns: '40px 1fr 150px 200px 70px 36px' }}
    >
      {/* Rank / Play toggle */}
      <div className="flex items-center justify-center w-full">
        {isHovered ? (
          <button className="text-primary">
            <Play size={15} fill="#ee10b0" />
          </button>
        ) : (
          <span className="text-text-muted text-sm font-medium">#{song.rank}</span>
        )}
      </div>

      {/* Thumbnail + Title + Artist */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${MINI_GRADIENTS[index % MINI_GRADIENTS.length]} flex-shrink-0 overflow-hidden`}
        >
          {song.coverImageUrl && (
            <img src={song.coverImageUrl} alt={song.title} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-text text-sm font-medium truncate">{song.title}</p>
          <p className="text-text-muted text-xs truncate">{song.artistId?.name || 'Unknown Artist'}</p>
        </div>
      </div>

      {/* Release Date */}
      <p className="text-text-secondary text-xs truncate">{song.releaseDate || (song.createdAt ? new Date(song.createdAt).toDateString() : 'Unknown')}</p>

      {/* Album */}
      <p className="text-text-secondary text-xs truncate">{song.album || 'Single'}</p>

      {/* Duration */}
      <div className="flex items-center gap-1 text-text-muted text-xs">
        <Clock size={11} />
        <span>{song.duration || '--:--'}</span>
      </div>

      {/* Like */}
      <button
        onClick={handleLike}
        className="p-1.5 rounded-full hover:bg-border transition-colors"
      >
        <Heart
          size={15}
          className={liked ? 'text-primary' : 'text-text-muted'}
          fill={liked ? '#ee10b0' : 'none'}
        />
      </button>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

const TrendingSongs = ({ songs = [] }) => {
  const topSongs = songs.slice(0, 5)

  return (
    <section className="mt-10">
      <h2 className="text-base font-bold text-text mb-5">
        Trending <span className="text-primary">Songs</span>
      </h2>

      {/* Table Header */}
      <div
        className="grid gap-4 px-4 py-2"
        style={{ gridTemplateColumns: '40px 1fr 150px 200px 70px 36px' }}
      >
        <span className="text-text-muted text-xs">#</span>
        <span className="text-text-muted text-xs">Song Name</span>
        <span className="text-text-muted text-xs">Release Date</span>
        <span className="text-text-muted text-xs">Album</span>
        <span className="text-text-muted text-xs">Time</span>
        <span />
      </div>

      <div className="border-t border-border mb-1" />

      {/* Rows */}
      <div className="flex flex-col gap-0.5">
        {topSongs.length > 0 ? (
          topSongs.map((song, index) => (
            <TrendingRow key={song._id} song={{ ...song, rank: index + 1 }} index={index} />
          ))
        ) : (
          <div className="py-10 text-center text-text-muted text-sm">
            No trending songs found.
          </div>
        )}
      </div>

      {/* View All */}
      <div className="mt-4 text-center">
        <button className="text-primary text-xs font-medium hover:underline">
          View All →
        </button>
      </div>
    </section>
  )
}

export default TrendingSongs
