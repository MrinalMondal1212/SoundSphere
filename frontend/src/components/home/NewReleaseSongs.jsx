import { useState } from 'react'
import { Play, Heart, Zap } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { playSong } from '../../store/playerSlice'
import { toggleLike } from '../../store/songSlice'

const CARD_GRADIENTS = [
  'from-blue-600 via-indigo-700 to-purple-800',
  'from-pink-500 via-fuchsia-600 to-purple-700',
  'from-orange-500 via-red-600 to-rose-700',
  'from-teal-500 via-cyan-600 to-blue-700',
  'from-green-600 via-lime-500 to-yellow-500',
  'from-rose-500 via-pink-600 to-fuchsia-700',
]

// ─── Card ────────────────────────────────────────────────────────────────────

const NewReleaseCard = ({ song, index }) => {
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(false)

  const formattedDate = new Date(song.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
    dispatch(toggleLike(song._id))
  }

  return (
    <div 
      className="min-w-[155px] max-w-[155px] group cursor-pointer"
      onClick={() => dispatch(playSong(song))}
    >

      {/* Cover Art */}
      <div
        className={`relative w-full aspect-square rounded-xl bg-gradient-to-br ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} mb-3 overflow-hidden`}
      >
        {song.coverImageUrl && (
          <img src={song.coverImageUrl} alt={song.title} className="w-full h-full object-cover" />
        )}

        {/* NEW badge */}
        <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          <Zap size={9} fill="white" />
          NEW
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play size={18} className="text-white ml-0.5" fill="white" />
          </button>
        </div>

        {/* Like button */}
        <button
          onClick={handleLike}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/50 hover:bg-black/70"
        >
          <Heart
            size={14}
            className={liked ? 'text-primary' : 'text-white'}
            fill={liked ? '#ee10b0' : 'none'}
          />
        </button>
      </div>

      {/* Info */}
      <h4 className="text-text text-sm font-semibold truncate">{song.title}</h4>
      <p className="text-text-muted text-xs mt-0.5 truncate">{song.artistId?.name || 'Unknown Artist'}</p>
      <p className="text-text-muted text-xs">{formattedDate}</p>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

const NewReleaseSongs = ({ songs = [] }) => {
  // Songs from backend are already sorted by createdAt: -1 (newest first). 
  // Let's take the first 6 as new releases.
  const newReleases = songs.slice(0, 6)

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-text">
          New Release <span className="text-primary">Songs</span>
        </h2>
        {/* TODO: Link to /songs?filter=new */}
        <button className="text-primary text-xs font-medium hover:underline">
          View More →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {newReleases.length > 0 ? (
          newReleases.map((song, index) => (
            <NewReleaseCard key={song._id} song={song} index={index} />
          ))
        ) : (
          <p className="text-sm text-text-muted">No new releases found.</p>
        )}
      </div>
    </section>
  )
}

export default NewReleaseSongs
