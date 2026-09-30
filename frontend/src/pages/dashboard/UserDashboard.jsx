import { useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice'
import { Music2, Mail, Shield, Headphones } from 'lucide-react'

/**
 * UserDashboard — accessible only to users with role 'user'.
 * Protected by ProtectedRoute in Routing.jsx.
 */
export default function UserDashboard() {
  const user = useSelector(selectUser)

  return (
    <div className="min-h-screen bg-background text-text p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text tracking-tight">
          Welcome back,{' '}
          <span className="text-primary">{user?.name || 'Listener'}</span> 👋
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Here&apos;s your SoundSphere dashboard
        </p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-text">{user?.name}</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {user?.role?.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={15} className="text-text-muted flex-shrink-0" />
              <span className="text-text-secondary">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={15} className="text-text-muted flex-shrink-0" />
              <span className="text-text-secondary capitalize">
                Role: <span className="text-text font-medium">{user?.role}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Access Level Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Headphones size={20} className="text-primary" />
            <h3 className="text-base font-bold text-text">Your Access Level</h3>
          </div>
          <div className="space-y-3">
            <AccessItem
              label="Listen to all songs"
              granted={true}
            />
            <AccessItem
              label="Browse artist profiles"
              granted={true}
            />
            <AccessItem
              label="Create playlists"
              granted={true}
            />
            <AccessItem
              label="Upload songs"
              granted={false}
              reason="Available to approved artists only"
            />
            <AccessItem
              label="Admin controls"
              granted={false}
              reason="Restricted to administrators"
            />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Music2 size={20} className="text-primary" />
          <h3 className="text-base font-bold text-text">Start Listening</h3>
        </div>
        <p className="text-sm text-text-secondary leading-6">
          As a listener, you have full access to browse and listen to all published music on
          SoundSphere. Discover trending songs, follow your favorite artists, and build your
          personal playlist collection. If you&apos;re a musician and want to upload your music,
          consider{' '}
          <a href="/register-artist" className="text-primary hover:underline font-medium">
            registering as an artist
          </a>
          .
        </p>
      </div>

    </div>
  )
}

/** Small access item row */
function AccessItem({ label, granted, reason }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
        granted ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
      }`}>
        {granted ? '✓' : '✕'}
      </span>
      <div>
        <p className={`text-sm font-medium ${granted ? 'text-text' : 'text-text-muted'}`}>
          {label}
        </p>
        {!granted && reason && (
          <p className="text-xs text-text-muted">{reason}</p>
        )}
      </div>
    </div>
  )
}
