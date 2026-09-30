import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Users,
  Mic2,
  CheckCircle,
  Lock,
  Unlock,
  Loader2,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'
import {
  fetchAllUsers,
  fetchAllArtists,
  approveArtist,
  blockUser,
  blockArtist,
} from '../../store/adminSlice'
import { selectUser } from '../../store/authSlice'

/**
 * AdminDashboard — accessible to users with role 'admin' only.
 * Protected by ProtectedRoute in Routing.jsx.
 *
 * Tabs:
 *   - Users: name, email, isBlocked, Block/Unblock button
 *   - Artists: name, email, isApproved, isBlocked, Approve + Block/Unblock buttons
 */
export default function AdminDashboard() {
  const dispatch = useDispatch()
  const adminUser = useSelector(selectUser)
  const { users, artists, loading, error } = useSelector((state) => state.admin)

  const [activeTab, setActiveTab] = useState('users')

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllArtists())
  }, [dispatch])

  const handleApprove = (id) => dispatch(approveArtist(id))
  const handleBlockUser = (id) => dispatch(blockUser(id))
  const handleBlockArtist = (id) => dispatch(blockArtist(id))

  const handleRefresh = () => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllArtists())
  }

  return (
    <div className="min-h-screen bg-background text-text p-6 md:p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text tracking-tight flex items-center gap-2">
            <ShieldCheck size={28} className="text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-text-secondary mt-1 text-sm">
            Logged in as <span className="text-primary font-medium">{adminUser?.name}</span>
            {' '}— manage users and artists
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-text-secondary hover:text-text hover:border-primary/50 transition-all text-sm disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users" value={users.length} icon={<Users size={18} className="text-primary" />} />
        <StatCard label="Total Artists" value={artists.length} icon={<Mic2 size={18} className="text-primary" />} />
        <StatCard
          label="Pending Approvals"
          value={artists.filter((a) => !a.isApproved).length}
          icon={<CheckCircle size={18} className="text-yellow-400" />}
          highlight
        />
        <StatCard
          label="Blocked Accounts"
          value={[...users, ...artists].filter((u) => u.isBlocked).length}
          icon={<Lock size={18} className="text-danger" />}
        />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-surface border border-border rounded-2xl shadow-lg overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-border">
          <TabButton
            label="Users"
            icon={<Users size={15} />}
            active={activeTab === 'users'}
            count={users.length}
            onClick={() => setActiveTab('users')}
          />
          <TabButton
            label="Artists"
            icon={<Mic2 size={15} />}
            active={activeTab === 'artists'}
            count={artists.length}
            onClick={() => setActiveTab('artists')}
            badge={artists.filter((a) => !a.isApproved).length}
          />
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        )}

        {/* ── Users Tab ──────────────────────────────────────────────────────── */}
        {!loading && activeTab === 'users' && (
          <div className="overflow-x-auto">
            {users.length === 0 ? (
              <div className="text-center py-16 text-text-muted text-sm">No users found.</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase bg-card text-text-muted border-b border-border">
                  <tr>
                    <th className="py-3 px-5">#</th>
                    <th className="py-3 px-5">Name</th>
                    <th className="py-3 px-5">Email</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((u, idx) => (
                    <tr key={u._id} className="hover:bg-card/40 transition-colors">
                      <td className="py-3 px-5 text-text-muted text-xs">{idx + 1}</td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {u.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <span className="font-semibold text-text">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-text-secondary text-xs">{u.email}</td>
                      <td className="py-3 px-5">
                        <StatusBadge blocked={u.isBlocked} />
                      </td>
                      <td className="py-3 px-5 text-right">
                        <button
                          onClick={() => handleBlockUser(u._id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ml-auto ${
                            u.isBlocked
                              ? 'bg-success/10 text-success hover:bg-success/20'
                              : 'bg-danger/10 text-danger hover:bg-danger/20'
                          }`}
                        >
                          {u.isBlocked ? <><Unlock size={13} /> Unblock</> : <><Lock size={13} /> Block</>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── Artists Tab ────────────────────────────────────────────────────── */}
        {!loading && activeTab === 'artists' && (
          <div className="overflow-x-auto">
            {artists.length === 0 ? (
              <div className="text-center py-16 text-text-muted text-sm">No artists found.</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase bg-card text-text-muted border-b border-border">
                  <tr>
                    <th className="py-3 px-5">#</th>
                    <th className="py-3 px-5">Name</th>
                    <th className="py-3 px-5">Email</th>
                    <th className="py-3 px-5">Approved</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {artists.map((a, idx) => (
                    <tr key={a._id} className="hover:bg-card/40 transition-colors">
                      <td className="py-3 px-5 text-text-muted text-xs">{idx + 1}</td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {a.name?.[0]?.toUpperCase() || 'A'}
                          </div>
                          <span className="font-semibold text-text">{a.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-text-secondary text-xs">{a.email}</td>
                      <td className="py-3 px-5">
                        {a.isApproved ? (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
                            Approved
                          </span>
                        ) : (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-5">
                        <StatusBadge blocked={a.isBlocked} />
                      </td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Approve button — only when not approved */}
                          {!a.isApproved && (
                            <button
                              onClick={() => handleApprove(a._id)}
                              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                            >
                              <CheckCircle size={13} /> Approve
                            </button>
                          )}
                          {/* Block / Unblock button */}
                          <button
                            onClick={() => handleBlockArtist(a._id)}
                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                              a.isBlocked
                                ? 'bg-success/10 text-success hover:bg-success/20'
                                : 'bg-danger/10 text-danger hover:bg-danger/20'
                            }`}
                          >
                            {a.isBlocked
                              ? <><Unlock size={13} /> Unblock</>
                              : <><Lock size={13} /> Block</>}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, icon, highlight }) {
  return (
    <div className={`bg-surface border rounded-xl p-4 shadow-lg flex items-center justify-between ${
      highlight ? 'border-yellow-500/30' : 'border-border'
    }`}>
      <div>
        <p className="text-xs text-text-muted font-medium">{label}</p>
        <p className="text-2xl font-extrabold text-text mt-1">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center">
        {icon}
      </div>
    </div>
  )
}

function TabButton({ label, icon, active, count, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border-b-2 transition-all ${
        active
          ? 'border-primary text-primary'
          : 'border-transparent text-text-secondary hover:text-text'
      }`}
    >
      {icon}
      {label}
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
        active ? 'bg-primary/10 text-primary' : 'bg-card text-text-muted'
      }`}>
        {count}
      </span>
      {badge > 0 && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-bold">
          {badge} pending
        </span>
      )}
    </button>
  )
}

function StatusBadge({ blocked }) {
  return blocked ? (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-danger/10 text-danger border border-danger/20">
      Blocked
    </span>
  ) : (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
      Active
    </span>
  )
}
