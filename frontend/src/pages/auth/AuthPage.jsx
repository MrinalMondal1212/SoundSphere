import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Music2 } from "lucide-react";

import Login from "./LoginPage";
import Register from "./RegisterPage";

export default function AuthPage() {
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(
    location.pathname === "/register"
  );

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center p-4 overflow-hidden">

      <div className="relative w-full max-w-5xl h-[650px] bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full z-10 bg-surface">
          <Login />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full z-10 bg-surface">
          <Register />
        </div>

        <div
          className={`absolute top-0 left-0 w-1/2 h-full z-30
          bg-primary text-white
          flex items-center justify-center
          transition-transform duration-700 ease-in-out
          ${isRegister ? "translate-x-full" : "translate-x-0"}`}
        >
          {!isRegister && (
            <div className="max-w-sm text-center px-8">

              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Music2 size={40} />
                </div>
              </div>

              <h1 className="text-4xl font-extrabold mb-5">
                New here?
              </h1>

              <p className="text-white/80 text-sm leading-6 mb-8">
                Create your account and start discovering your favorite
                music, artists and albums.
              </p>

              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="px-10 py-3 rounded-xl border-2 border-white font-bold text-sm hover:bg-white hover:text-primary transition-all"
              >
                Log In
              </button>

            </div>
          )}

          {isRegister && (
            <div className="max-w-sm text-center px-9">

              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Music2 size={40} />
                </div>
              </div>

              <h1 className="text-4xl font-extrabold mb-5">
                Welcome Back!
              </h1>

              <p className="text-white/80 text-sm leading-6 mb-8">
                Already have an account? Sign in and continue listening
                to your favorite music.
              </p>

              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="px-10 py-3 rounded-xl border-2 border-white font-bold text-sm hover:bg-white hover:text-primary transition-all"
              >
                Register 
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
