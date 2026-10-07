import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
    isPlaying: false,
  },
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload
      state.isPlaying = true
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying
    },
    stopSong: (state) => {
      state.currentSong = null
      state.isPlaying = false
    },
  },
})

export const { playSong, togglePlay, stopSong } = playerSlice.actions
export default playerSlice.reducer
