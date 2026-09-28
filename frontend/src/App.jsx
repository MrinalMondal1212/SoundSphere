import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-text p-10">
      <div className="bg-card border border-border rounded-xl p-8">
        <h1 className="text-4xl font-bold text-primary">
          SoundSphere
        </h1>

        <p className="mt-3 text-text-secondary">
          Your music. Your world.
        </p>

        <button className="mt-6 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg">
          Start Listening
        </button>
      </div>
    </div>
  );
}



export default App
