import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  LayoutDashboard, Users, Mic2, LogOut, Radio,
  Music, ShieldCheck, BarChart2
} from 'lucide-react'
import { selectUser, selectRole, logout } from '../store/authSlice'
import toast from 'react-hot-toast'

const DashboardNavItem = ({ item }) => (
  <NavLink
    to={item.path}
    end={item.end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'text-primary bg-primary/10'
          : 'text-text-secondary hover:text-text hover:bg-card'
      }`
    }
  >
    <item.icon size={17} />
    <span>{item.label}</span>
  </NavLink>
)

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const role = useSelector(selectRole)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  // Role-based nav items
  const navItems = role === 'admin'
    ? [
        { label: 'Overview',    icon: LayoutDashboard, path: '/dashboard/admin', end: true },
      ]
    : role === 'artist'
    ? [
        { label: 'My Songs',    icon: Music,           path: '/dashboard/artist', end: true },
      ]
    : [
        { label: 'Profile',     icon: Users,           path: '/dashboard/user', end: true },
      ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Dashboard Sidebar */}
      <aside className="w-[220px] fixed left-0 top-0 h-screen bg-surface flex flex-col border-r border-border z-50 overflow-y-auto">

        {/* Logo → back to home */}
        <NavLink to="/" className="px-5 py-5 border-b border-border flex-shrink-0 block">
          <div className="flex items-center gap-2.5 text-primary font-bold text-xl">
            <Radio size={22} />
            <span>SoundSphere</span>
          </div>
        </NavLink>

        {/* Role badge */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            {role === 'admin' && <ShieldCheck size={16} className="text-primary" />}
            {role === 'artist' && <Mic2 size={16} className="text-primary" />}
            {role === 'user' && <Users size={16} className="text-primary" />}
            <span className="text-xs font-semibold text-text-secondary capitalize">{role} Dashboard</span>
          </div>
        </div>

        {/* Nav items */}
        <div className="px-3 pt-4 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <DashboardNavItem key={item.path} item={item} />
          ))}
        </div>

        <div className="flex-1" />

        {/* User pill + logout */}
        <div className="px-3 py-4 border-t border-border flex-shrink-0">
          {user && (
            <div className="flex items-center gap-2 px-4 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm uppercase flex-shrink-0">
                {user.name?.[0] || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-text truncate">{user.name}</p>
                <p className="text-[10px] text-text-muted truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 w-full text-left transition-all"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-[220px] min-h-screen">
        {children}
      </div>
    </div>
  )
}
