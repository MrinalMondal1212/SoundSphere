import { Play, Music2 } from 'lucide-react'

/**
 * TODO: Replace with API call
 * GET /api/playlists/moods
 * Backend will need a Playlist model with a mood/category field
 */
const moodPlaylists = [
  {
    _id: 'mp1',
    name: 'Sadness',
    subtitle: 'Sad Playlist',
    songCount: 24,
    gradient: 'from-slate-700 via-blue-900 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    emoji: '😢',
  },
  {
    _id: 'mp2',
    name: 'Chill',
    subtitle: 'Cafe Playlist',
    songCount: 32,
    gradient: 'from-teal-700 via-cyan-800 to-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    emoji: '☕',
  },
  {
    _id: 'mp3',
    name: 'Relaxing',
    subtitle: 'Calm Playlist',
    songCount: 28,
    gradient: 'from-purple-700 via-indigo-800 to-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80',
    emoji: '🌙',
  },
  {
    _id: 'mp4',
    name: 'Love Playlist',
    subtitle: 'Romance Vibes',
    songCount: 20,
    gradient: 'from-rose-700 via-pink-800 to-fuchsia-900',
    bgImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    emoji: '💖',
  },
  {
    _id: 'mp5',
    name: 'Happy Playlist',
    subtitle: 'Feel-Good Hits',
    songCount: 36,
    gradient: 'from-yellow-600 via-orange-700 to-red-800',
    bgImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80',
    emoji: '🎉',
  },
]

// ─── Mood Card ────────────────────────────────────────────────────────────────

const MoodCard = ({ playlist }) => (
  <div
    className="relative min-w-[175px] max-w-[175px] h-[200px] rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0"
    style={{
      backgroundImage: `url(${playlist.bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Colour tint overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${playlist.gradient} opacity-60`} />

    {/* Dark bottom overlay for text */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

    {/* Play button on hover */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <Play size={20} className="text-white ml-0.5" fill="white" />
      </button>
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h4 className="text-white font-bold text-sm">{playlist.name}</h4>
      <p className="text-white/60 text-xs mt-0.5">{playlist.subtitle}</p>
      <div className="flex items-center gap-1 mt-1.5 text-white/50 text-xs">
        <Music2 size={11} />
        <span>{playlist.songCount} songs</span>
      </div>
    </div>
  </div>
)

// ─── Section ─────────────────────────────────────────────────────────────────

const MoodPlaylist = () => (
  <section className="mt-10">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-bold text-text">
        Mood <span className="text-primary">Playlist</span>
      </h2>
      <button className="text-primary text-xs font-medium hover:underline">View More →</button>
    </div>

    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
      {moodPlaylists.map((playlist) => (
        <MoodCard key={playlist._id} playlist={playlist} />
      ))}
    </div>
  </section>
)

export default MoodPlaylist
