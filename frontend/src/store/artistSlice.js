import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../services/axiosInstance'

// ─── Async Thunks ─────────────────────────────────────────────────────────────

/** GET /artist/getAllSong — fetch all songs uploaded by this artist */
export const fetchMySongs = createAsyncThunk(
  'artist/fetchMySongs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/artist/getAllSong')
      return res.data.data // Song[]
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch songs.'
      )
    }
  }
)

/**
 * POST /artist/createSong — upload a new song
 * Body: { title, description, audioUrl, coverImageUrl }
 * Returns 403 if artist is not approved yet
 */
export const createSong = createAsyncThunk(
  'artist/createSong',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/artist/createSong', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return res.data.data // Created Song
    } catch (err) {
      if (err.response?.status === 403) {
        return rejectWithValue(
          'Your account is pending admin approval. You cannot upload songs yet.'
        )
      }
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create song.'
      )
    }
  }
)

/** DELETE /artist/deleteSong/:id — delete a song by ID */
export const deleteSong = createAsyncThunk(
  'artist/deleteSong',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/artist/deleteSong/${id}`)
      return res.data.data // Deleted Song
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete song.'
      )
    }
  }
)

/** PUT /artist/updateSong/:id — update a song title and description */
export const updateSong = createAsyncThunk(
  'artist/updateSong',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/artist/updateSong/${id}`, data)
      return res.data.data // Updated Song
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update song.'
      )
    }
  }
)

// ─── Slice ────────────────────────────────────────────────────────────────────

const artistSlice = createSlice({
  name: 'artist',
  initialState: {
    songs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearArtistError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // ── Fetch Songs ───────────────────────────────────────────────────────────
    builder
      .addCase(fetchMySongs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMySongs.fulfilled, (state, action) => {
        state.loading = false
        state.songs = action.payload
      })
      .addCase(fetchMySongs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── Create Song ───────────────────────────────────────────────────────────
    builder
      .addCase(createSong.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createSong.fulfilled, (state, action) => {
        state.loading = false
        state.songs = [action.payload, ...state.songs]
      })
      .addCase(createSong.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── Update Song ───────────────────────────────────────────────────────────
    builder
      .addCase(updateSong.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        state.loading = false
        const updated = action.payload
        const index = state.songs.findIndex((s) => s._id === updated._id)
        if (index !== -1) {
          state.songs[index] = updated
        }
      })
      .addCase(updateSong.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── Delete Song ───────────────────────────────────────────────────────────
    builder
      .addCase(deleteSong.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.loading = false
        const deleted = action.payload
        state.songs = state.songs.filter((s) => s._id !== deleted._id)
      })
      .addCase(deleteSong.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearArtistError } = artistSlice.actions

export default artistSlice.reducer
