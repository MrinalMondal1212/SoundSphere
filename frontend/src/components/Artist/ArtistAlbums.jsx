import { useState } from 'react'
import { Play, Heart, Plus } from 'lucide-react'

// TODO: Replace with API call → GET /api/artists/:id/albums
const artistAlbums = [
  { _id: 'al1', title: 'The Eminem Show',         coverImageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80', year: '2002' },
  { _id: 'al2', title: 'Encore',                   coverImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80', year: '2004' },
  { _id: 'al3', title: 'Music To Be Murdered By',  coverImageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&q=80', year: '2015' },
  { _id: 'al4', title: 'Recovery',                 coverImageUrl: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300&q=80', year: '2010' },
  { _id: 'al5', title: 'Eminem The Slim Shady LP', coverImageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80', year: '1999' },
]

// ─── Shared Album / Song Card ─────────────────────────────────────────────────

const MediaCard = ({ item }) => {
  const [liked, setLiked] = useState(false)
  return (
    <div className="min-w-[155px] max-w-[155px] group cursor-pointer flex-shrink-0">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
        <img src={item.coverImageUrl} alt={item.title} className="w-full h-full object-cover" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play size={18} className="text-white ml-0.5" fill="white" />
          </button>
        </div>
        {/* Like */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/50"
        >
          <Heart size={13} className={liked ? 'text-primary' : 'text-white'} fill={liked ? '#ee10b0' : 'none'} />
        </button>
      </div>
      <h4 className="text-text text-sm font-semibold truncate">{item.title}</h4>
      <p className="text-text-muted text-xs mt-0.5">{item.year}</p>
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

const ArtistAlbums = () => (
  <section className="mt-10">
    <h2 className="text-base font-bold text-text mb-4">
      Artist's <span className="text-primary">Albums</span>
    </h2>
    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
      {artistAlbums.map((album) => (
        <MediaCard key={album._id} item={album} />
      ))}
      <ViewAllCard />
    </div>
  </section>
)

export default ArtistAlbums
