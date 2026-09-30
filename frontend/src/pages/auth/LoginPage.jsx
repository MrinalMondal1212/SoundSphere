import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { loginUser, selectLoading, selectError, selectUser, clearError } from '../../store/authSlice'

/**
 * Login page — React Hook Form + Redux dispatch.
 * On success redirects to /dashboard where RoleRedirect handles the rest.
 */
export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const user = useSelector(selectUser)

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  // Clear any stale errors on unmount
  useEffect(() => {
    return () => { dispatch(clearError()) }
  }, [dispatch])

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data))
    if (loginUser.fulfilled.match(result)) {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center p-8 overflow-y-auto">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="px-4 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="text-xl font-bold">SoundSphere</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-extrabold text-text tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-text-secondary">
            Sign in to continue to your SoundSphere account
          </p>
        </div>

        {/* API Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-text">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                size={18}
              />
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                className="w-full bg-card border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-danger text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-text">Password</label>
              <button type="button" className="text-xs font-medium text-primary hover:underline">
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                size={18}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="w-full bg-card border border-border rounded-xl py-3 pl-10 pr-11 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-danger text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register as User
            </Link>
          </p>
          <p className="text-sm text-text-secondary">
            Are you an artist?{' '}
            <Link to="/register-artist" className="text-primary font-semibold hover:underline">
              Register as Artist
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}