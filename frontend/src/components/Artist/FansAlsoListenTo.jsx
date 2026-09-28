import { Plus } from 'lucide-react'

// TODO: Replace with API call → GET /api/artists/:id/similar
// Response: array of User model (role: 'artist')
const similarArtists = [
  { _id: 'ar1', name: '50 Cent',   profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { _id: 'ar2', name: 'Snoop Dog', profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' },
  { _id: 'ar3', name: 'Tupac',     profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { _id: 'ar4', name: 'Jay-Z',     profileImage: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&q=80' },
]

// Artist name — TODO: receive as prop from parent when dynamic
const ARTIST_NAME = 'Eminem'

// ─── Circular Artist Card ─────────────────────────────────────────────────────

const ArtistCircleCard = ({ artist }) => (
  <div className="flex flex-col items-center gap-3 cursor-pointer group flex-shrink-0">
    <div className="relative w-[130px] h-[130px] rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-all duration-200">
      <img
        src={artist.profileImage}
        alt={artist.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Hover tint */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <span className="text-text text-sm font-medium text-center group-hover:text-primary transition-colors">
      {artist.name}
    </span>
  </div>
)

// ─── View All Circular Card ───────────────────────────────────────────────────

const ViewAllCircle = () => (
  <div className="flex flex-col items-center gap-3 cursor-pointer group flex-shrink-0">
    <div className="w-[130px] h-[130px] rounded-full bg-card border-2 border-border group-hover:border-primary flex items-center justify-center transition-colors">
      <div className="w-12 h-12 rounded-full bg-surface border border-border group-hover:border-primary flex items-center justify-center transition-colors">
        <Plus size={20} className="text-text-muted group-hover:text-primary transition-colors" />
      </div>
    </div>
    <span className="text-text-secondary text-sm font-medium group-hover:text-primary transition-colors">
      View All
    </span>
  </div>
)

// ─── Section ─────────────────────────────────────────────────────────────────

const FansAlsoListenTo = () => (
  <section className="mt-12 mb-4">
    <h2 className="text-base font-bold text-text mb-6">
      <span className="text-primary">{ARTIST_NAME} Fans</span> Also Listen To
    </h2>
    <div className="flex gap-8 overflow-x-auto pb-3 scrollbar-hide">
      {similarArtists.map((artist) => (
        <ArtistCircleCard key={artist._id} artist={artist} />
      ))}
      <ViewAllCircle />
    </div>
  </section>
)

export default FansAlsoListenTo
