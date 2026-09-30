import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  Music,
  Plus,
  Trash2,
  Clock,
  Loader2,
  X,
  Link2,
  Image,
  FileText,
  Disc3,
  Play,
  Pencil,
} from 'lucide-react'
import { selectUser } from '../../store/authSlice'
import {
  fetchMySongs,
  createSong,
  deleteSong,
  updateSong,
  clearArtistError,
} from '../../store/artistSlice'
import { playSong } from '../../store/playerSlice'

/**
 * ArtistDashboard — accessible to users with role 'artist'.
 *
 * Approval flow:
 *   - If user is not approved (isApproved !== true): shows pending approval card.
 *   - If approved: shows song list + upload form.
 *   - NOTE: isApproved is NOT in the JWT. We detect approval from 403 errors
 *     on createSong, OR by reading isApproved from the backend artist fetch.
 *     Since we only have auth JWT data here, we attempt fetching songs on mount
 *     and treat a 403 on createSong as "not approved".
 */
export default function ArtistDashboard() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { songs, loading, error } = useSelector((state) => state.artist)

  const [showForm, setShowForm] = useState(false)
  const [editingSong, setEditingSong] = useState(null)
  // Track whether the artist got a 403 (not approved)
  const [notApproved, setNotApproved] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  // Fetch songs on mount; if 403, mark as not approved
  useEffect(() => {
    dispatch(fetchMySongs()).then((result) => {
      if (fetchMySongs.rejected.match(result)) {
        // Could be 403 (not approved) or other error
        const msg = result.payload || ''
        if (msg.toLowerCase().includes('approv') || msg.toLowerCase().includes('403')) {
          setNotApproved(true)
        }
      }
    })
    return () => { dispatch(clearArtistError()) }
  }, [dispatch])

  const handleEditClick = (song) => {
    setEditingSong(song)
    setValue('title', song.title)
    setValue('description', song.description)
    setShowForm(true)
  }

  const onUpload = async (data) => {
    if (editingSong) {
      const updateData = { title: data.title, description: data.description }
      const result = await dispatch(updateSong({ id: editingSong._id, data: updateData }))
      if (updateSong.fulfilled.match(result)) {
        reset()
        setShowForm(false)
        setEditingSong(null)
      }
      return
    }

    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.audio && data.audio[0]) formData.append('audio', data.audio[0]);
    if (data.coverImage && data.coverImage[0]) formData.append('coverImage', data.coverImage[0]);

    const result = await dispatch(createSong(formData))
    if (createSong.fulfilled.match(result)) {
      reset()
      setShowForm(false)
    } else if (createSong.rejected.match(result)) {
      // Check if 403 (not approved)
      const msg = result.payload || ''
      if (msg.toLowerCase().includes('approv') || msg.toLowerCase().includes('pending')) {
        setNotApproved(true)
        setShowForm(false)
      }
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this song?')) return
    setDeletingId(id)
    await dispatch(deleteSong(id))
    setDeletingId(null)
  }

  // ── Pending Approval State ─────────────────────────────────────────────────
  if (notApproved) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-text mb-2">
            Pending Approval
          </h2>
          <p className="text-text-secondary text-sm leading-6 mb-4">
            Hi <span className="text-primary font-semibold">{user?.name}</span>, your artist account
            is currently under review. An admin will approve your account before you can upload songs.
          </p>
          <div className="bg-card border border-border rounded-xl p-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
              Account submitted for review
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="w-2 h-2 rounded-full bg-border flex-shrink-0" />
              Waiting for admin approval
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="w-2 h-2 rounded-full bg-border flex-shrink-0" />
              Upload your first song
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Approved Dashboard ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-text p-6 md:p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text tracking-tight">
            Artist Dashboard
          </h1>
          <p className="text-text-secondary mt-1 text-sm">
            Manage your music — upload tracks and grow your audience
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl px-5 py-2.5 flex items-center gap-2 shadow-lg shadow-primary/25 transition-all self-start md:self-auto"
        >
          <Plus size={18} />
          <span>Upload New Song</span>
        </button>
      </div>

      {/* Error Banner */}
      {error && !notApproved && (
        <div className="mb-6 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}

      {/* Songs Table */}
      <div className="bg-surface border border-border rounded-2xl shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Disc3 size={20} className="text-primary" />
          <h2 className="text-base font-bold text-text">My Songs</h2>
          <span className="ml-auto text-xs text-text-muted">
            {songs.length} track{songs.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading && songs.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        ) : songs.length === 0 ? (
          <div className="text-center py-16">
            <Music size={40} className="mx-auto text-text-muted mb-3" />
            <p className="text-text-secondary text-sm font-medium">No songs yet</p>
            <p className="text-text-muted text-xs mt-1">
              Click &quot;Upload New Song&quot; to add your first track
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-text-secondary">
              <thead className="text-xs uppercase bg-card text-text-muted border-b border-border">
                <tr>
                  <th className="py-3 px-5">Title</th>
                  <th className="py-3 px-5">Description</th>
                  <th className="py-3 px-5">Audio URL</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {songs.map((song) => (
                  <tr key={song._id} className="hover:bg-card/50 transition-colors">
                    <td className="py-3 px-5 font-semibold text-text">
                      {song.title}
                    </td>
                    <td className="py-3 px-5 text-text-muted text-xs max-w-[180px] truncate">
                      {song.description || '—'}
                    </td>
                    <td className="py-3 px-5 text-xs">
                      {song.audioUrl ? (
                        <a
                          href={song.audioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          Link
                        </a>
                      ) : '—'}
                    </td>
                    <td className="py-3 px-5 text-right space-x-2">
                      <button
                        onClick={() => dispatch(playSong(song))}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                        title="Play"
                      >
                        <Play size={16} />
                      </button>
                      <button
                        onClick={() => handleEditClick(song)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(song._id)}
                        disabled={deletingId === song._id}
                        className="p-2 rounded-lg hover:bg-danger/10 text-danger transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === song._id
                          ? <Loader2 size={16} className="animate-spin" />
                          : <Trash2 size={16} />
                        }
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Song Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <h3 className="text-lg font-bold text-text flex items-center gap-2">
                <Music size={18} className="text-primary" />
                {editingSong ? 'Edit Song' : 'Upload New Song'}
              </h3>
              <button
                onClick={() => { setShowForm(false); setEditingSong(null); reset(); dispatch(clearArtistError()) }}
                className="text-text-muted hover:text-text transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form error */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onUpload)} className="space-y-4">

              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1.5 block">
                  Song Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Neon Sunset"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full bg-card border border-border rounded-xl p-3 text-sm text-text focus:outline-none focus:border-primary transition-all"
                />
                {errors.title && (
                  <p className="text-danger text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1.5 flex items-center gap-1.5">
                  <FileText size={12} />
                  Description
                </label>
                <textarea
                  placeholder="Describe your song..."
                  rows={2}
                  {...register('description')}
                  className="w-full bg-card border border-border rounded-xl p-3 text-sm text-text focus:outline-none focus:border-primary transition-all resize-none"
                />
              </div>

              {/* Audio File */}
              {!editingSong && (
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1.5 flex items-center gap-1.5">
                    <Link2 size={12} />
                    Audio File *
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    {...register('audio', { required: 'Audio file is required' })}
                    className="w-full bg-card border border-border rounded-xl p-2 text-sm text-text focus:outline-none focus:border-primary transition-all"
                  />
                  {errors.audio && (
                    <p className="text-danger text-xs mt-1">{errors.audio.message}</p>
                  )}
                </div>
              )}

              {/* Cover Image File */}
              {!editingSong && (
                <div>
                  <label className="text-xs font-semibold text-text-secondary mb-1.5 flex items-center gap-1.5">
                    <Image size={12} />
                    Cover Image File *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register('coverImage', { required: 'Cover image file is required' })}
                    className="w-full bg-card border border-border rounded-xl p-2 text-sm text-text focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingSong(null); reset(); dispatch(clearArtistError()) }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-card text-text-secondary hover:text-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                >
                  {loading ? (
                    <><Loader2 size={14} className="animate-spin" /> {editingSong ? 'Saving...' : 'Uploading...'}</>
                  ) : (
                    editingSong ? 'Save Changes' : 'Upload Song'
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
