import { useState } from 'react'
import { Play, Heart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { playSong } from '../../store/playerSlice'
import { toggleLike } from '../../store/songSlice'

const CARD_GRADIENTS = [
  'from-yellow-500 via-orange-600 to-red-700',
  'from-violet-500 via-purple-600 to-indigo-700',
  'from-cyan-500 via-blue-600 to-blue-800',
  'from-green-500 via-emerald-600 to-teal-700',
  'from-pink-500 via-rose-600 to-red-700',
  'from-amber-500 via-orange-500 to-yellow-600',
]

const SongCard = ({ song, index }) => {
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(false)

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
      <div className={`relative w-full aspect-square rounded-xl bg-gradient-to-br ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} mb-3 overflow-hidden`}>
        {song.coverImageUrl && (
          <img src={song.coverImageUrl} alt={song.title} className="w-full h-full object-cover" />
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play size={18} className="text-white ml-0.5" fill="white" />
          </button>
        </div>

        <button onClick={handleLike} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/50 hover:bg-black/70">
          <Heart size={14} className={liked ? 'text-primary' : 'text-white'} fill={liked ? '#ee10b0' : 'none'} />
        </button>
      </div>

      <h4 className="text-text text-sm font-semibold truncate">{song.title}</h4>
      <p className="text-text-muted text-xs mt-0.5 truncate">{song.artistId?.name || 'Unknown Artist'}</p>
      <p className="text-text-muted text-xs">{song.category || 'Music'}</p>
    </div>
  )
}

const WeeklyTopSongs = ({ songs = [] }) => {
  const topSongs = [...songs].reverse().slice(0, 6)

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-text">
          Weekly Top <span className="text-primary">Songs</span>
        </h2>
        <button className="text-primary text-xs font-medium hover:underline">
          View More &rarr;
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {topSongs.length > 0 ? (
          topSongs.map((song, index) => (
            <SongCard key={song._id} song={song} index={index} />
          ))
        ) : (
          <p className="text-sm text-text-muted">No songs available.</p>
        )}
      </div>
    </section>
  )
}

export default WeeklyTopSongs
