import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login submitted:", formData);

    // Later connect your backend API here
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-8 overflow-y-auto">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-19 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="space-y-2">

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
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full bg-card border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
              />

            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">

            <div className="flex items-center justify-between">

              <label className="text-sm font-semibold text-text">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <div className="relative">

              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full bg-card border border-border rounded-xl py-3 pl-10 pr-11 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
              />

              {/* Show Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">

            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-border cursor-pointer accent-primary"
            />

            <label
              htmlFor="remember"
              className="text-xs text-text-secondary cursor-pointer select-none"
            >
              Remember me on this device
            </label>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button>

        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">

          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>

          <span className="relative bg-surface px-3 text-[11px] text-text-muted uppercase tracking-wider">
            Or continue with
          </span>

        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">

          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-card hover:bg-border/40 border border-border py-2.5 rounded-xl text-xs font-semibold text-text transition-all"
          >

            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.761h-9.426z"
              />
            </svg>

            Google

          </button>

          {/* Apple */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-card hover:bg-border/40 border border-border py-2.5 rounded-xl text-xs font-semibold text-text transition-all"
          >

            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.62-.76 1.05-1.83.93-2.89-.91.04-2.03.61-2.68 1.37-.58.68-1.09 1.77-.95 2.82 1.02.08 2.08-.54 2.7-1.3" />
            </svg>

            Apple

          </button>

        </div>

      </div>

    </div>
  );
}