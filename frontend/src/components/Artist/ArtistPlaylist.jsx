import { useState } from 'react'
import { Play, Heart, Plus, Music2 } from 'lucide-react'

// TODO: Replace with API call → GET /api/artists/:id/playlists
const artistPlaylists = [
  { _id: 'pl1', name: 'Full Collection',  coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80', songCount: 120 },
  { _id: 'pl2', name: 'Best Of Eminem',   coverImageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&q=80', songCount: 40 },
  { _id: 'pl3', name: 'Old Songs',        coverImageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80', songCount: 32 },
  { _id: 'pl4', name: "Fan's Favorite",   coverImageUrl: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&q=80', songCount: 25 },
  { _id: 'pl5', name: 'New Releases',     coverImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80', songCount: 12 },
]

// ─── Playlist Card ────────────────────────────────────────────────────────────

const PlaylistCard = ({ playlist }) => {
  const [liked, setLiked] = useState(false)
  return (
    <div className="min-w-[155px] max-w-[155px] group cursor-pointer flex-shrink-0">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
        <img src={playlist.coverImageUrl} alt={playlist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play size={18} className="text-white ml-0.5" fill="white" />
          </button>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/50"
        >
          <Heart size={13} className={liked ? 'text-primary' : 'text-white'} fill={liked ? '#ee10b0' : 'none'} />
        </button>
      </div>
      <h4 className="text-text text-sm font-semibold truncate">{playlist.name}</h4>
      <div className="flex items-center gap-1 mt-0.5 text-text-muted text-xs">
        <Music2 size={10} />
        <span>{playlist.songCount} songs</span>
      </div>
    </div>
  )
}

// ─── View All Card ────────────────────────────────────────────────────────────

const ViewAllCard = () => (
  <div className="min-w-[155px] max-w-[155px] flex-shrink-0 flex flex-col items-center justify-center gap-3 cursor-pointer group">
    <div className="w-full aspect-square rounded-xl bg-card border border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
      <div className="w-12 h-12 rounded-full bg-surface border border-border group-hover:border-primary flex items-center justify-center transition-colors">
        <Plus size={20} className="text-text-muted group-hover:text-primary transition-colors" />
      </div>
    </div>
    <span className="text-text-secondary text-xs font-medium group-hover:text-primary transition-colors">View All</span>
  </div>
)

// ─── Section ─────────────────────────────────────────────────────────────────

const ArtistPlaylist = () => (
  <section className="mt-10">
    <h2 className="text-base font-bold text-text mb-4">
      Artist's <span className="text-primary">Playlist</span>
    </h2>
    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
      {artistPlaylists.map((playlist) => (
        <PlaylistCard key={playlist._id} playlist={playlist} />
      ))}
      <ViewAllCard />
    </div>
  </section>
)

export default ArtistPlaylist
