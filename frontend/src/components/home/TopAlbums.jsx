import { useState } from 'react'
import { Play, Heart } from 'lucide-react'

const ALBUM_GRADIENTS = [
  'from-indigo-600 via-purple-700 to-pink-800',
  'from-yellow-500 via-orange-600 to-red-700',
  'from-teal-600 via-cyan-600 to-blue-700',
  'from-rose-500 via-pink-600 to-fuchsia-700',
  'from-lime-500 via-green-600 to-emerald-700',
]

/**
 * TODO: Replace with API call
 * GET /api/albums/top
 * Backend will need an Album model (title, artistId, coverImageUrl, songs[])
 */
const topAlbums = [
  { _id: 'al1', title: 'Midnight Galaxy',   artistId: { _id: 'a1', name: 'Luna Sky'    }, coverImageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80', songCount: 12, year: 2025 },
  { _id: 'al2', title: 'Electric Universe', artistId: { _id: 'a2', name: 'Digital Wave' }, coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80', songCount: 10, year: 2025 },
  { _id: 'al3', title: 'Neon Echoes',       artistId: { _id: 'a3', name: 'Volt Echo'   }, coverImageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&q=80', songCount: 14, year: 2024 },
  { _id: 'al4', title: 'Solar Dreams',      artistId: { _id: 'a4', name: 'Nova Beat'   }, coverImageUrl: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&q=80', songCount:  9, year: 2025 },
  { _id: 'al5', title: 'Crimson Skies',     artistId: { _id: 'a5', name: 'Red Echo'    }, coverImageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80', songCount: 11, year: 2024 },
]

// ─── Album Card ───────────────────────────────────────────────────────────────

const AlbumCard = ({ album, index }) => {
  const [liked, setLiked] = useState(false)

  return (
    <div className="min-w-[155px] max-w-[155px] group cursor-pointer">
      <div
        className={`relative w-full aspect-square rounded-xl bg-gradient-to-br ${ALBUM_GRADIENTS[index % ALBUM_GRADIENTS.length]} mb-3 overflow-hidden`}
      >
        {album.coverImageUrl && (
          <img src={album.coverImageUrl} alt={album.title} className="w-full h-full object-cover" />
        )}

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

      <h4 className="text-text text-sm font-semibold truncate">{album.title}</h4>
      <p className="text-text-muted text-xs mt-0.5 truncate">{album.artistId.name}</p>
      <p className="text-text-muted text-xs">{album.songCount} songs · {album.year}</p>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

const TopAlbums = () => (
  <section className="mt-10">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-bold text-text">
        Top <span className="text-primary">Albums</span>
      </h2>
      {/* TODO: Link to /albums */}
      <button className="text-primary text-xs font-medium hover:underline">View More →</button>
    </div>

    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
      {topAlbums.map((album, index) => (
        <AlbumCard key={album._id} album={album} index={index} />
      ))}
    </div>
  </section>
)

export default TopAlbums
