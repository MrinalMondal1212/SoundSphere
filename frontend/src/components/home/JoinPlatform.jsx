import { useState } from 'react'
import { Radio, Music2 } from 'lucide-react'

/**
 * TODO: Connect form to backend
 * Sign Up → POST /api/auth/register   body: { name, email, password }
 * Login   → POST /api/auth/login      body: { email, password }
 * On success: store JWT → localStorage.setItem('token', data.token)
 */

const JoinPlatform = () => {
  const [activeTab, setActiveTab] = useState('signup')
  const [formData, setFormData]   = useState({ name: '', email: '', password: '' })

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (activeTab === 'signup') {
      // TODO: api.post('/auth/register', { name: formData.name, email: formData.email, password: formData.password })
      console.log('[Sign Up]', formData)
    } else {
      // TODO: api.post('/auth/login', { email: formData.email, password: formData.password })
      console.log('[Login]', { email: formData.email, password: formData.password })
    }
  }

  return (
    <section className="mt-14 bg-card border border-border rounded-2xl overflow-hidden">
      <div className="grid grid-cols-2">

        {/* ── Left — Marketing ── */}
        <div className="relative bg-gradient-to-br from-primary/20 via-card to-secondary/10 p-10 flex flex-col justify-center">
          {/* Ambient glows */}
          <div className="absolute top-4 right-4  w-28 h-28 rounded-full bg-primary/10  blur-3xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-36 h-36 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-primary mb-5">
              <Radio size={26} />
              <span className="text-xl font-bold">SoundSphere</span>
            </div>

            <h2 className="text-2xl font-bold text-text mb-3">
              Join Our <span className="text-primary">Platform</span>
            </h2>

            <p className="text-text-secondary text-sm leading-relaxed mb-7">
              Be part of the SoundSphere community. Discover music, follow artists, and share
              your playlists with millions of music lovers. Just filling some necessary
              information, if you already have an account just{' '}
              <button
                onClick={() => setActiveTab('login')}
                className="text-primary hover:underline font-medium"
              >
                Login Here.
              </button>
            </p>

            {/* Decorative music note grid */}
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{ opacity: 1 - i * 0.22 }}
                  className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary"
                >
                  <Music2 size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right — Form ── */}
        <div className="p-10 bg-surface">

          {/* Tab Switcher */}
          <div className="flex bg-card rounded-xl p-1 mb-6 w-fit">
            {['signup', 'login'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {tab === 'signup' ? 'Sign Up' : 'Login'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name — Sign Up only */}
            {activeTab === 'signup' && (
              <div>
                <label className="block text-text-secondary text-xs font-medium mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-primary/30 hover:shadow-primary/50"
            >
              {activeTab === 'signup' ? 'Sign Up' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t border-border" />
            <span className="text-text-muted text-xs">or</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Google Sign In */}
          {/* TODO: Implement Google OAuth on backend and connect here */}
          <button className="w-full border border-border bg-card hover:bg-border rounded-xl py-2.5 text-sm font-medium text-text-secondary hover:text-text transition-all flex items-center justify-center gap-2.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign In with Google
          </button>
        </div>

      </div>
    </section>
  )
}

export default JoinPlatform
