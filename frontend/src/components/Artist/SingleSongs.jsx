import { useState } from 'react'
import { Play, Heart, Plus } from 'lucide-react'

// TODO: Replace with API call → GET /api/artists/:id/singles
const singleSongs = [
  { _id: 'sg1', title: 'Lace It',              coverImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80', year: '2020' },
  { _id: 'sg2', title: 'Realest',              coverImageUrl: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&q=80', year: '2018' },
  { _id: 'sg3', title: 'From The D 2 The LBC', coverImageUrl: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=300&q=80', year: '2022' },
  { _id: 'sg4', title: '911',                  coverImageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&q=80', year: '2020' },
  { _id: 'sg5', title: 'Killshot',             coverImageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&q=80', year: '2018' },
]

// ─── Card ────────────────────────────────────────────────────────────────────

const SingleCard = ({ song }) => {
  const [liked, setLiked] = useState(false)
  return (
    <div className="min-w-[155px] max-w-[155px] group cursor-pointer flex-shrink-0">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
        <img src={song.coverImageUrl} alt={song.title} className="w-full h-full object-cover" />
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
      <h4 className="text-text text-sm font-semibold truncate">{song.title}</h4>
      <p className="text-text-muted text-xs mt-0.5">{song.year}</p>
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

const SingleSongs = () => (
  <section className="mt-10">
    <h2 className="text-base font-bold text-text mb-4">
      Single <span className="text-primary">Songs</span>
    </h2>
    <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
      {singleSongs.map((song) => (
        <SingleCard key={song._id} song={song} />
      ))}
      <ViewAllCard />
    </div>
  </section>
)

export default SingleSongs
