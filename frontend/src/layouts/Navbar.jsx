import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Home,
  Disc3,
  Mic2,
  Radio,
  LayoutDashboard,
  LogOut,
  LogIn,
  Settings,
  Music,
  Library,
} from 'lucide-react'
import { selectIsAuthenticated, selectUser, logout } from '../store/authSlice'
import toast from 'react-hot-toast'

// ─── NavItem Component ────────────────────────────────────────────────────────

const NavItem = ({ item }) => (
  <NavLink
    to={item.path}
    end={item.path === '/'}
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

// ─── Sidebar Component ────────────────────────────────────────────────────────

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  const mainNavItems = [
    { label: 'Home',    icon: Home,  path: '/' },
    { label: 'Discover', icon: Disc3, path: '/discover' },
    { label: 'Artists', icon: Mic2,  path: '/artists' },
    { label: 'Songs',   icon: Music, path: '/songs' },
    { label: 'Library', icon: Library, path: '/library' },
  ]

  return (
    <aside className="w-[220px] fixed left-0 top-0 h-screen bg-surface flex flex-col border-r border-border z-50 overflow-y-auto">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2.5 text-primary font-bold text-xl">
          <Radio size={22} />
          <span>SoundSphere</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-3 pt-4 flex flex-col gap-0.5">
        {mainNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
        {/* Dashboard link — only when logged in */}
        {isAuthenticated && (
          <NavItem item={{ label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' }} />
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-border flex flex-col gap-0.5 flex-shrink-0">
        <NavItem item={{ label: 'Settings', icon: Settings, path: '/settings' }} />

        {isAuthenticated ? (
          <>
            {/* User pill */}
            {user && (
              <div className="flex items-center gap-2 px-4 py-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs uppercase flex-shrink-0">
                  {user.name?.[0] || 'U'}
                </div>
                <span className="text-xs text-text-secondary truncate font-medium">{user.name}</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-danger hover:bg-danger/10 w-full text-left"
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <NavItem item={{ label: 'Login', icon: LogIn, path: '/login' }} />
        )}
      </div>
    </aside>
  )
}

export default Navbar
