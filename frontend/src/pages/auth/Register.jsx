import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import {
  registerUser,
  selectLoading,
  selectError,
  selectRegisterSuccess,
  clearError,
  clearRegisterSuccess,
} from '../../store/authSlice'

/**
 * Register page for regular users.
 * On success: shows success message and redirects to /login after a brief delay.
 */
export default function RegisterPage() {
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

  // Redirect to login after successful registration
  useEffect(() => {
    if (registerSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearRegisterSuccess())
        navigate('/login')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [registerSuccess, dispatch, navigate])

  // Clear stale errors on unmount
  useEffect(() => {
    return () => { dispatch(clearError()) }
  }, [dispatch])

  const onSubmit = (data) => {
    dispatch(registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'user',
    }))
  }

  // Success state
  if (registerSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 text-center shadow-xl">
          <CheckCircle size={56} className="mx-auto text-success mb-4" />
          <h2 className="text-2xl font-extrabold text-text mb-2">Account Created!</h2>
          <p className="text-text-secondary text-sm">
            Your account has been created successfully. Redirecting to login...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="px-4 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="text-xl font-bold">SoundSphere</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-text tracking-tight">
            Create Account
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Join SoundSphere and start discovering music
          </p>
        </div>

        {/* API Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm text-center">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-text mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={17} />
              <input
                type="text"
                placeholder="John Doe"
                {...register('name', { required: 'Full name is required' })}
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
                placeholder="name@example.com"
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              >
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
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              >
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

        </form>

        {/* Links */}
        <div className="mt-5 text-center space-y-2">
          <p className="text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign In
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
