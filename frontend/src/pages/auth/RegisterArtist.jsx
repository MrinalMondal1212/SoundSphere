import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Mic, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Clock } from 'lucide-react'
import {
  registerUser,
  selectLoading,
  selectError,
  selectRegisterSuccess,
  clearError,
  clearRegisterSuccess,
} from '../../store/authSlice'

/**
 * Artist registration page.
 * On success: shows "Awaiting admin approval" message — does NOT auto-login.
 */
export default function RegisterArtist() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const registerSuccess = useSelector(selectRegisterSuccess)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const passwordValue = watch('password')

  // Clear stale errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError())
      dispatch(clearRegisterSuccess())
    }
  }, [dispatch])

  const onSubmit = (data) => {
    dispatch(registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'artist',
    }))
  }

  // Success state — show pending approval message
  if (registerSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-text mb-2">
            Registration Successful!
          </h2>
          <p className="text-text-secondary text-sm leading-6 mb-6">
            Your artist account has been created. It is currently{' '}
            <span className="text-primary font-semibold">awaiting admin approval</span>.
            You will be able to upload songs once an admin reviews your account.
          </p>
          <button
            onClick={() => {
              dispatch(clearRegisterSuccess())
              navigate('/login')
            }}
            className="bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl px-6 py-2.5 text-sm transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl">

        {/* Artist Icon + Logo */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Mic size={20} className="text-primary" />
            </div>
            <div className="px-4 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="text-xl font-bold">SoundSphere</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-extrabold text-text tracking-tight">
            Join as an Artist
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Create your artist account and start sharing your music
          </p>
        </div>

        {/* Approval Notice */}
        <div className="mb-5 p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-2.5">
          <Clock size={15} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-text-secondary leading-5">
            <span className="text-primary font-semibold">Note:</span> Your account will be reviewed
            by an admin before you can upload songs.
          </p>
        </div>

        {/* API Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-text mb-1.5">
              Artist / Full Name
            </label>
            <div className="relative">
              <Mic className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
              <input
                type="text"
                placeholder="Your stage name or real name"
                {...register('name', { required: 'Name is required' })}
                className="w-full bg-card border border-border rounded-lg py-2.5 pl-9 pr-3 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
              />
            </div>
            {errors.name && (
              <p className="text-danger text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-text mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
              <input
                type="email"
                placeholder="artist@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
                className="w-full bg-card border border-border rounded-lg py-2.5 pl-9 pr-3 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-danger text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-text mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                className="w-full bg-card border border-border rounded-lg py-2.5 pl-9 pr-10 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-danger text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-text mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm your password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === passwordValue || 'Passwords do not match',
                })}
                className="w-full bg-card border border-border rounded-lg py-2.5 pl-9 pr-10 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
                {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <>
                <span>Register as Artist</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

        </form>

        {/* Links */}
        <div className="mt-5 text-center">
          <p className="text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
