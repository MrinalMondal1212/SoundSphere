import { useEffect, useState } from 'react'
import axiosInstance from '../services/axiosInstance'
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
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axiosInstance.get('/songs')
        setSongs(res.data.data || [])
      } catch (err) {
        console.error('Error fetching songs:', err)
      }
    }
    fetchSongs()
  }, [])

  return (
    <div className="max-w-[1300px]">
      <HeroSection />
      <WeeklyTopSongs />
      <NewReleaseSongs />
      <TrendingSongs songs={songs} />
      <PremiumOffers />
      <TopAlbums />
      <MoodPlaylist />
      <JoinPlatform />
    </div>
  )
}

export default HomePage
