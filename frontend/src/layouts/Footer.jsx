import { Link } from 'react-router-dom'
import { Radio, Globe, MessageCircle, Tv2, Share2 } from 'lucide-react'

// ─── Footer Data ─────────────────────────────────────────────────────────────

const footerSections = [
  {
    title: 'SoundSphere',
    links: [
      { label: 'Songs',    path: '/songs' },
      { label: 'Artists',  path: '/artists' },
      { label: 'Albums',   path: '/albums' },
      { label: 'Trending', path: '/trending' },
    ],
  },
  {
    title: 'Access',
    links: [
      { label: 'Radio',        path: '/radio' },
      { label: 'About',        path: '/about' },
      { label: 'Artist',       path: '/artist' },
      { label: 'Profile',      path: '/profile' },
      { label: 'Donate',       path: '/donate' },
      { label: 'Social Links', path: '/social' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'soundsphere@music.com', path: '#' },
      { label: '+91 98765 43210',       path: '#' },
    ],
  },
]

const socialIcons = [
  { Icon: Globe,         label: 'Website' },
  { Icon: MessageCircle, label: 'Twitter' },
  { Icon: Share2,        label: 'Share' },
  { Icon: Tv2,           label: 'YouTube' },
]

// ─── Footer Component ─────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-16 px-10 py-12">
      {/* Main Grid */}
      <div className="grid grid-cols-4 gap-10">

        {/* About Column */}
        <div>
          <h4 className="text-text font-semibold mb-4">About</h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            SoundSphere is your ultimate destination for discovering, streaming, and sharing
            music. Join millions of listeners and artists creating the soundtrack of tomorrow.
          </p>
        </div>

        {/* Dynamic Link Columns */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-text font-semibold mb-4">{section.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <Radio size={20} />
          <span>SoundSphere</span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socialIcons.map(({ Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-200"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-text-muted text-sm">
          © 2025 SoundSphere. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
