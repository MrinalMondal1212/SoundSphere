import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
  },
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { playSong } = playerSlice.actions;

export default playerSlice.reducer;
