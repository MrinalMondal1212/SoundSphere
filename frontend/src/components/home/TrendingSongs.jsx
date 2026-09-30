import { useState } from 'react'
import { Heart, Play, Clock } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { playSong } from '../../store/playerSlice'

const MINI_GRADIENTS = [
  'from-pink-500 to-rose-700',
  'from-purple-500 to-indigo-700',
  'from-blue-500 to-cyan-700',
  'from-green-500 to-teal-700',
  'from-yellow-500 to-orange-700',
  'from-red-500 to-pink-700',
  'from-teal-500 to-blue-700',
]

/**
 * TODO: Replace with API call
 * GET /api/songs/trending
 * Response shape: Song model + populated artistId + extra fields (rank, album, releaseDate, duration)
 */
const trendingSongs = [
  { _id: 't1', rank: 1, title: 'Starfire',       artistId: { _id: 'a1', name: 'Thunder Beats' }, coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&q=80',  releaseDate: 'Mar 11, 2025', album: 'Starfire Galaxy',           duration: '3:29', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { _id: 't2', rank: 2, title: 'Digital Beats',  artistId: { _id: 'a2', name: 'Digital Wave'  }, coverImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&q=80',  releaseDate: 'Apr 5,  2025', album: 'Frequency',                 duration: '4:12', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { _id: 't3', rank: 3, title: 'Groovy',          artistId: { _id: 'a3', name: 'Luna Sky'      }, coverImageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=80&q=80',  releaseDate: 'Feb 28, 2025', album: 'Night Owl',                 duration: '3:45' },
  { _id: 't4', rank: 4, title: 'Love This Time',  artistId: { _id: 'a4', name: 'Volt Echo'     }, coverImageUrl: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=80&q=80',  releaseDate: 'Feb 20, 2025', album: 'Echoes of Time',            duration: '4:00' },
  { _id: 't5', rank: 5, title: 'Join the Summer', artistId: { _id: 'a5', name: 'Skyline Drift' }, coverImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&q=80',  releaseDate: 'May 17, 2025', album: 'The Night (Of the Summer)', duration: '3:55' },
  { _id: 't6', rank: 6, title: 'Dance On Night',  artistId: { _id: 'a6', name: 'Neon Pulse'    }, coverImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&q=80',  releaseDate: 'May 7,  2025', album: 'Neon',                      duration: '3:08' },
  { _id: 't7', rank: 7, title: 'Winter',           artistId: { _id: 'a7', name: 'Arctic Chill'  }, coverImageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=80&q=80',  releaseDate: 'Jan 3,  2025', album: 'Seasons',                   duration: '4:22' },
]

// ─── Trending Row ─────────────────────────────────────────────────────────────

const TrendingRow = ({ song, index }) => {
  const [liked,     setLiked]     = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()

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
        onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
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
        {songs.length > 0 ? (
          songs.map((song, index) => (
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
