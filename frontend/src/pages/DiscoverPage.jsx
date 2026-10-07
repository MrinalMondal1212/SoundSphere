import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Play, Heart, Search } from 'lucide-react'
import { fetchAllSongs, toggleLike } from '../store/songSlice'
import { playSong } from '../store/playerSlice'

const DiscoverPage = () => {
  const dispatch = useDispatch()
  const { publicSongs, loading } = useSelector((state) => state.song)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchAllSongs())
  }, [dispatch])

  const filteredSongs = publicSongs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artistId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    song.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-[1300px] p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text">Discover <span className="text-primary">Music</span></h1>
          <p className="text-text-muted mt-1 text-sm">Find your next favorite track</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search songs, artists, or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-text focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-text-muted py-10">Loading songs...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredSongs.map((song, i) => (
            <DiscoverSongCard key={song._id} song={song} index={i} />
          ))}
          {filteredSongs.length === 0 && (
            <div className="col-span-full text-center py-10 text-text-muted">
              No songs found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const DiscoverSongCard = ({ song, index }) => {
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(false)

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
    dispatch(toggleLike(song._id))
  }

  const bg = ['from-blue-600', 'from-pink-500', 'from-orange-500', 'from-teal-500', 'from-purple-500'][index % 5]

  return (
    <div onClick={() => dispatch(playSong(song))} className="group cursor-pointer">
      <div className={`relative w-full aspect-square rounded-xl bg-gradient-to-br ${bg} to-gray-900 mb-3 overflow-hidden shadow-lg`}>
        {song.coverImageUrl && (
          <img src={song.coverImageUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
            <Play size={20} className="text-white ml-1" fill="white" />
          </button>
        </div>
        <button onClick={handleLike} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/50 hover:bg-black/70">
          <Heart size={16} className={liked ? 'text-primary' : 'text-white'} fill={liked ? '#ee10b0' : 'none'} />
        </button>
      </div>
      <h4 className="text-text font-semibold text-sm truncate">{song.title}</h4>
      <p className="text-text-muted text-xs truncate mt-0.5">{song.artistId?.name || 'Unknown'}</p>
      <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] bg-card text-text-secondary border border-border">
        {song.category || 'Other'}
      </span>
    </div>
  )
}

export default DiscoverPage
