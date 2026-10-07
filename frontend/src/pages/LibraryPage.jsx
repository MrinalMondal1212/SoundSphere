import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLikedSongs } from '../store/songSlice'
import { Clock, Play, Heart } from 'lucide-react'
import { playSong } from '../store/playerSlice'

const LibraryPage = () => {
  const dispatch = useDispatch()
  const { likedSongs, loading } = useSelector((state) => state.song)

  useEffect(() => {
    dispatch(fetchLikedSongs())
  }, [dispatch])

  if (loading) {
    return <div className="p-8 text-text-muted">Loading your library...</div>
  }

  return (
    <div className="p-8 max-w-[1300px]">
      <h1 className="text-3xl font-bold text-text mb-8">Your Library</h1>

      {likedSongs.length === 0 ? (
        <p className="text-text-muted">You haven't liked any songs yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Header */}
          <div className="grid grid-cols-[50px_1fr_200px_100px_50px] gap-4 px-4 py-2 border-b border-border text-sm text-text-muted font-medium">
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Date Added</span>
            <div className="flex justify-center">
              <Clock size={16} />
            </div>
          </div>

          {/* Songs List */}
          {likedSongs.map((song, index) => (
            <div
              key={song._id}
              onClick={() => dispatch(playSong(song))}
              className="grid grid-cols-[50px_1fr_200px_100px_50px] items-center gap-4 px-4 py-3 rounded-lg hover:bg-card transition-colors cursor-pointer group"
            >
              {/* Index / Play */}
              <div className="text-text-muted text-sm font-medium">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block text-primary fill-primary" />
              </div>

              {/* Title & Artist & Cover */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded bg-border shrink-0 overflow-hidden">
                  {song.coverImageUrl && (
                    <img src={song.coverImageUrl} alt={song.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="truncate">
                  <div className="text-text font-medium truncate">{song.title}</div>
                  <div className="text-text-muted text-xs truncate">
                    {song.artistId?.name || 'Unknown Artist'}
                  </div>
                </div>
              </div>

              {/* Album */}
              <div className="text-text-muted text-sm truncate">
                {song.album || 'Single'}
              </div>

              {/* Date Added (fallback to createdAt) */}
              <div className="text-text-muted text-sm truncate">
                {new Date(song.createdAt).toLocaleDateString()}
              </div>

              {/* Liked Heart */}
              <div className="flex justify-center text-primary">
                <Heart size={18} fill="#ee10b0" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LibraryPage
