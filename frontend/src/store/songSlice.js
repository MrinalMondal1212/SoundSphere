import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';

export const fetchAllSongs = createAsyncThunk(
  'song/fetchAllSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/songs');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch songs');
    }
  }
);

export const fetchLikedSongs = createAsyncThunk(
  'song/fetchLikedSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/songs/liked');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch liked songs');
    }
  }
);

export const toggleLike = createAsyncThunk(
  'song/toggleLike',
  async (songId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/songs/${songId}/like`);
      // Return both songId and whatever backend returns so we can update state
      return { songId, data: response.data }; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle like');
    }
  }
);

const songSlice = createSlice({
  name: 'song',
  initialState: {
    publicSongs: [],
    likedSongs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllSongs
      .addCase(fetchAllSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.publicSongs = action.payload;
      })
      .addCase(fetchAllSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchLikedSongs
      .addCase(fetchLikedSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikedSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.likedSongs = action.payload;
      })
      .addCase(fetchLikedSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // toggleLike
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { songId, data } = action.payload;
        // data.likedSongs contains the updated array of liked song IDs
        // If the songId is no longer in data.likedSongs, remove it from state.likedSongs
        if (data.likedSongs && !data.likedSongs.includes(songId)) {
          state.likedSongs = state.likedSongs.filter(song => song._id !== songId);
        }
      });
  },
});

export default songSlice.reducer;
