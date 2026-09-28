import { ChevronLeft, User, Share2, Crown, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// TODO: Replace with API call → GET /api/artists/:id
// Follows the User model (role: 'artist')
const ARTIST = {
  _id: 'a1',
  name: 'Eminem',
  genre: 'Hip-Hop · Rap',
  bio: 'Marshall Bruce Mathers III, known professionally as Eminem, is an American rapper, songwriter, and record producer. He is one of the best-selling music artists of all time.',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  coverImage:   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80',
  monthlyListeners: '21,215,618',
  followers:        '12,543,210',
  isApproved: true,
}

const ArtistHero = () => {
  const navigate = useNavigate()

  return (
    <section
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ minHeight: '340px' }}
    >
      {/* ── Background — cover photo ── */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${ARTIST.coverImage})` }}
      />

      {/* ── Dark overlays ── */}
      {/* Full dark tint */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Stronger fade on left so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* ── Artist portrait (right) ── */}
      <img
        src={ARTIST.profileImage}
        alt={ARTIST.name}
        className="absolute right-0 top-0 h-full w-[45%] object-cover object-top select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, black 45%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, black 45%)',
        }}
      />

      {/* ── Inner top nav ── */}
      <div className="relative z-20 flex items-center justify-between px-7 py-5">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium sr-only">Back</span>
        </button>

        {/* Right links */}
        <div className="flex items-center gap-6">
          {[
            { label: 'Share',   icon: Share2 },
            { label: 'About',   icon: Info },
            { label: 'Premium', icon: Crown },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
          {/* Profile avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 cursor-pointer">
            <User size={15} className="text-white" />
          </div>
        </div>
      </div>

      {/* ── Artist Info (bottom) ── */}
      <div className="relative z-20 px-8 pt-12 pb-8">
        <h1 className="text-6xl md:text-7xl font-black text-white leading-none tracking-tight drop-shadow-xl">
          {ARTIST.name}
        </h1>
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <span className="text-text-secondary text-sm">{ARTIST.genre}</span>
          <span className="text-border">·</span>
          <span className="text-text-secondary text-sm">
            <span className="text-white font-semibold">{ARTIST.monthlyListeners}</span> monthly listeners
          </span>
          <span className="text-border">·</span>
          <span className="text-text-secondary text-sm">
            <span className="text-white font-semibold">{ARTIST.followers}</span> followers
          </span>
        </div>

        {/* Follow / Play buttons */}
        <div className="flex items-center gap-3 mt-5">
          <button className="bg-primary hover:bg-primary-hover text-white font-semibold px-7 py-2.5 rounded-full text-sm transition-all shadow-lg shadow-primary/30 hover:scale-105">
            Follow
          </button>
          <button className="border border-white/30 text-white/80 hover:text-white hover:border-white font-semibold px-7 py-2.5 rounded-full text-sm transition-all">
            Play All
          </button>
        </div>
      </div>
    </section>
  )
}

export default ArtistHero
