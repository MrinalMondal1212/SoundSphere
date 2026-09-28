import { useState } from 'react'
import { Heart, MoreHorizontal, Play, Clock } from 'lucide-react'

// TODO: Replace with API call → GET /api/artists/:id/popular-songs
// Response: array of Song model (populated artistId) + extra: playCount, releaseDate, duration
const popularSongs = [
  { _id: 's1', rank: 1, title: 'Without Me',       artist: 'Eminem', coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&q=80', releaseDate: 'May 15, 2002', playCount: '21,215,618', duration: '4:50' },
  { _id: 's2', rank: 2, title: 'Mockingbird',       artist: 'Eminem', coverImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&q=80', releaseDate: 'Apr 25, 2005', playCount: '19,856,112', duration: '4:10' },
  { _id: 's3', rank: 3, title: 'The Real Slim Shady',artist: 'Eminem', coverImageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=80&q=80', releaseDate: 'Nov 30, 2023', playCount: '16,564,223', duration: '4:44' },
  { _id: 's4', rank: 4, title: 'Lose Yourself',     artist: 'Eminem', coverImageUrl: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=80&q=80', releaseDate: 'Nov 30, 2023', playCount: '16,240,290', duration: '5:22' },
  { _id: 's5', rank: 5, title: 'Godzilla',           artist: 'Eminem', coverImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&q=80', releaseDate: 'Nov 30, 2023', playCount: '14,367,580', duration: '3:30' },
]

// ─── Single Row ───────────────────────────────────────────────────────────────

const SongRow = ({ song, index }) => {
  const [liked,     setLiked]     = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="grid items-center gap-4 px-4 py-3 rounded-xl hover:bg-card transition-colors cursor-pointer group"
      style={{ gridTemplateColumns: '36px 1fr 130px 130px 36px 60px 36px' }}
    >
      {/* Rank / Play */}
      <div className="flex items-center justify-center">
        {isHovered ? (
          <button className="text-primary">
            <Play size={14} fill="#ee10b0" />
          </button>
        ) : (
          <span className="text-text-muted text-sm font-medium">{song.rank}</span>
        )}
      </div>

      {/* Thumbnail + Title + Artist */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={song.coverImageUrl}
          alt={song.title}
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-text text-sm font-medium truncate">{song.title}</p>
          <p className="text-text-muted text-xs truncate">{song.artist}</p>
        </div>
      </div>

      {/* Release Date */}
      <p className="text-text-secondary text-xs">{song.releaseDate}</p>

      {/* Play Count */}
      <p className="text-text-secondary text-xs">{song.playCount}</p>

      {/* Like */}
      <button
        onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
        className="p-1 rounded-full hover:bg-border transition-colors"
      >
        <Heart
          size={15}
          className={liked ? 'text-primary' : 'text-text-muted'}
          fill={liked ? '#ee10b0' : 'none'}
        />
      </button>

      {/* Duration */}
      <div className="flex items-center gap-1 text-text-muted text-xs">
        <Clock size={11} />
        {song.duration}
      </div>

      {/* More options */}
      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-text p-1 rounded-full hover:bg-border">
        <MoreHorizontal size={16} />
      </button>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

const PopularSongs = () => {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? popularSongs : popularSongs.slice(0, 5)

  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-text mb-4">Popular</h2>

      {/* Table Header */}
      <div
        className="grid gap-4 px-4 pb-2"
        style={{ gridTemplateColumns: '36px 1fr 130px 130px 36px 60px 36px' }}
      >
        <span />
        <span className="text-text-muted text-xs">#</span>
        <span className="text-text-muted text-xs">Release Date</span>
        <span className="text-text-muted text-xs">Played</span>
        <span />
        <span className="text-text-muted text-xs">Time</span>
        <span />
      </div>
      <div className="border-t border-border mb-1" />

      {/* Rows */}
      <div className="flex flex-col gap-0.5">
        {displayed.map((song, index) => (
          <SongRow key={song._id} song={song} index={index} />
        ))}
      </div>

      {/* Show More button */}
      {!showAll && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-6 py-2 rounded-full transition-all shadow-md shadow-primary/30"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  )
}

export default PopularSongs
