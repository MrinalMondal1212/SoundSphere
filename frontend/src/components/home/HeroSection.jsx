import heroImg from '../../assets/hero.png'

// Unsplash cosmic background — replace with your own CDN image later
const HERO_BG = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80'

const HeroSection = () => {
  return (
    <section
      className="relative w-full rounded-2xl overflow-hidden min-h-[350px] flex items-center"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >

      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 60% 50%, rgba(238,16,176,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Hero Image — right side */}
      <img
        src={heroImg}
        alt="Music experience"
        className="absolute right-0 top-0 h-full w-[55%] object-cover object-top select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 25%, black 50%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 25%, black 50%)',
        }}
      />

      {/* Left fade to blend image into bg */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e0022] via-[#0e0022]/75 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-12 py-10 max-w-[52%]">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          All the{' '}
          <span className="text-primary">Best Songs</span>
          <br />
          in One Place
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-sm">
          Discover millions of songs from your favourite artists. Create playlists, explore
          new releases, and stream music that moves your soul — anytime, anywhere.
        </p>
        <button className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105">
          Discover Now
        </button>
      </div>
    </section>
  )
}

export default HeroSection
