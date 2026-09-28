import { useState } from 'react'
import { Play, Heart, Zap } from 'lucide-react'

const CARD_GRADIENTS = [
  'from-blue-600 via-indigo-700 to-purple-800',
  'from-pink-500 via-fuchsia-600 to-purple-700',
  'from-orange-500 via-red-600 to-rose-700',
  'from-teal-500 via-cyan-600 to-blue-700',
  'from-green-600 via-lime-500 to-yellow-500',
  'from-rose-500 via-pink-600 to-fuchsia-700',
]

/**
 * TODO: Replace with API call
 * GET /api/songs/new-releases
 * Response shape matches Song model (populated artistId)
 */
const newReleaseSongs = [
  { _id: 'nr1', title: 'Chaos Theory',   artistId: { _id: 'a7',  name: 'Static Pulse' }, coverImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80', audioUrl: null, createdAt: '2025-09-20' },
  { _id: 'nr2', title: 'Solar Flare',    artistId: { _id: 'a8',  name: 'Nova Beat'    }, coverImageUrl: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&q=80', audioUrl: null, createdAt: '2025-09-22' },
  { _id: 'nr3', title: 'Dark Matter',    artistId: { _id: 'a9',  name: 'Void Walker'  }, coverImageUrl: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=300&q=80', audioUrl: null, createdAt: '2025-09-24' },
  { _id: 'nr4', title: 'Crimson Tide',   artistId: { _id: 'a10', name: 'Red Echo'     }, coverImageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80', audioUrl: null, createdAt: '2025-09-25' },
  { _id: 'nr5', title: 'Frozen Horizon', artistId: { _id: 'a11', name: 'Arctic Tone'  }, coverImageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&q=80', audioUrl: null, createdAt: '2025-09-26' },
  { _id: 'nr6', title: 'Digital Rain',   artistId: { _id: 'a12', name: 'Cyber Flow'   }, coverImageUrl: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=300&q=80', audioUrl: null, createdAt: '2025-09-27' },
]

// ─── Card ────────────────────────────────────────────────────────────────────

const NewReleaseCard = ({ song, index }) => {
  const [liked, setLiked] = useState(false)

  const formattedDate = new Date(song.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="min-w-[155px] max-w-[155px] group cursor-pointer">

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
      <p className="text-text-muted text-xs">{formattedDate}</p>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

const NewReleaseSongs = () => {
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
        {newReleaseSongs.map((song, index) => (
          <NewReleaseCard key={song._id} song={song} index={index} />
        ))}
      </div>
    </section>
  )
}

export default NewReleaseSongs
