import { useState } from 'react'
import { Play, Heart } from 'lucide-react'

// Gradient placeholders — replaced by song.coverImageUrl from backend
const CARD_GRADIENTS = [
  'from-yellow-500 via-orange-600 to-red-700',
  'from-violet-500 via-purple-600 to-indigo-700',
  'from-cyan-500 via-blue-600 to-blue-800',
  'from-green-500 via-emerald-600 to-teal-700',
  'from-pink-500 via-rose-600 to-red-700',
  'from-amber-500 via-orange-500 to-yellow-600',
]

/**
 * TODO: Replace with API call
 * GET /api/songs/weekly-top
 * Response shape matches Song model (populated artistId)
 */
const weeklyTopSongs = [
  { _id: '1', title: 'Starfire',       artistId: { _id: 'a1', name: 'Thunder Beats' }, coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80', audioUrl: null, playCount: '2.3M' },
  { _id: '2', title: 'Neon Dreams',    artistId: { _id: 'a2', name: 'Digital Wave'  }, coverImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80', audioUrl: null, playCount: '1.9M' },
  { _id: '3', title: 'Midnight Soul',  artistId: { _id: 'a3', name: 'Luna Sky'      }, coverImageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&q=80', audioUrl: null, playCount: '1.7M' },
  { _id: '4', title: 'Electric Surge', artistId: { _id: 'a4', name: 'Volt Echo'     }, coverImageUrl: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300&q=80', audioUrl: null, playCount: '1.5M' },
  { _id: '5', title: 'Gravity Fall',   artistId: { _id: 'a5', name: 'Skyline Drift' }, coverImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80', audioUrl: null, playCount: '1.3M' },
  { _id: '6', title: 'Ocean Haze',     artistId: { _id: 'a6', name: 'Wave Runner'   }, coverImageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&q=80', audioUrl: null, playCount: '1.1M' },
]

// ─── Song Card ───────────────────────────────────────────────────────────────

const SongCard = ({ song, index }) => {
  const [liked, setLiked] = useState(false)

  return (
    <div className="min-w-[155px] max-w-[155px] group cursor-pointer">

      {/* Cover Art */}
      <div
        className={`relative w-full aspect-square rounded-xl bg-gradient-to-br ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} mb-3 overflow-hidden`}
      >
        {/* Real image when available */}
        {song.coverImageUrl && (
          <img src={song.coverImageUrl} alt={song.title} className="w-full h-full object-cover" />
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play size={18} className="text-white ml-0.5" fill="white" />
          </button>
        </div>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
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
      <p className="text-text-muted text-xs mt-0.5 truncate">{song.artistId.name}</p>
      <p className="text-text-muted text-xs">{song.playCount} plays</p>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

const WeeklyTopSongs = () => {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-text">
          Weekly Top <span className="text-primary">Songs</span>
        </h2>
        {/* TODO: Link to /songs?filter=weekly-top */}
        <button className="text-primary text-xs font-medium hover:underline">
          View More →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {weeklyTopSongs.map((song, index) => (
          <SongCard key={song._id} song={song} index={index} />
        ))}
      </div>
    </section>
  )
}

export default WeeklyTopSongs
