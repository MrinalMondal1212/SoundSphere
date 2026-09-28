import HeroSection      from '../components/Home/HeroSection'
import WeeklyTopSongs   from '../components/Home/WeeklyTopSongs'
import NewReleaseSongs  from '../components/Home/NewReleaseSongs'
import TrendingSongs    from '../components/Home/TrendingSongs'
import PremiumOffers    from '../components/Home/PremiumOffers'
import TopAlbums        from '../components/Home/TopAlbums'
import MoodPlaylist     from '../components/Home/MoodPlaylist'
import JoinPlatform     from '../components/Home/JoinPlatform'

/**
 * HomePage
 * ─────────
 * Assembles all Home section components in order.
 * Each section handles its own data fetching once the backend is connected.
 */
const HomePage = () => {
  return (
    <div className="max-w-[1300px]">
      <HeroSection />
      <WeeklyTopSongs />
      <NewReleaseSongs />
      <TrendingSongs />
      <PremiumOffers />
      <TopAlbums />
      <MoodPlaylist />
      <JoinPlatform />
    </div>
  )
}

export default HomePage
