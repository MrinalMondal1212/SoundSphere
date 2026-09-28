import { NavLink } from 'react-router-dom'
import {
  Home,
  Compass,
  Disc3,
  Mic2,
  Clock,
  Music2,
  Heart,
  ListMusic,
  Plus,
  Settings,
  LogOut,
  Radio,
} from 'lucide-react'

// ─── Navigation Data ────────────────────────────────────────────────────────

const mainNavItems = [
  { label: 'Home',    icon: Home,    path: '/' },
  { label: 'Discover', icon: Compass, path: '/discover' },
  { label: 'Album',  icon: Disc3,   path: '/album' },
  { label: 'Artists', icon: Mic2,    path: '/artists' },
]

const libraryNavItems = [
  { label: 'Recently Added', icon: Clock,     path: '/recent' },
  { label: 'Music Player',   icon: Music2,    path: '/player' },
  { label: 'Your Favorites', icon: Heart,     path: '/favorites' },
  { label: 'Your Playlist',  icon: ListMusic, path: '/playlist' },
  { label: 'Add Playlist',   icon: Plus,      path: '/playlist/new' },
]

const bottomNavItems = [
  { label: 'Setting', icon: Settings, path: '/settings' },
  { label: 'Logout',  icon: LogOut,   path: '/logout' },
]

// ─── NavItem Component ───────────────────────────────────────────────────────

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

// ─── Sidebar Component ───────────────────────────────────────────────────────

const Navbar = () => {
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
      </div>

      {/* Divider */}
      <div className="mx-4 my-4 border-t border-border" />

      {/* Library Navigation */}
      <div className="px-3 flex flex-col gap-0.5">
        <p className="px-4 text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2">
          Your Library
        </p>
        {libraryNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </div>

      {/* Bottom Navigation (Settings + Logout) */}
      <div className="mt-auto px-3 py-4 border-t border-border flex flex-col gap-0.5 flex-shrink-0">
        {bottomNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </div>
    </aside>
  )
}

export default Navbar
