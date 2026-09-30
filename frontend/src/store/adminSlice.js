import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../services/axiosInstance'

// ─── Async Thunks ─────────────────────────────────────────────────────────────

/** GET /users — fetch all users (admin only) */
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/users')
      return res.data.data // User[]
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch users.'
      )
    }
  }
)

/** GET /artists — fetch all artists (admin only) */
export const fetchAllArtists = createAsyncThunk(
  'admin/fetchAllArtists',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/artists')
      return res.data.data // Artist[]
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch artists.'
      )
    }
  }
)

/** PATCH /approve-artist/:id — approve an artist account */
export const approveArtist = createAsyncThunk(
  'admin/approveArtist',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/approve-artist/${id}`)
      return res.data.data // Updated Artist
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to approve artist.'
      )
    }
  }
)

/** PATCH /block-user/:id — block/unblock a user */
export const blockUser = createAsyncThunk(
  'admin/blockUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/block-user/${id}`)
      return res.data.data // Updated User
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to block user.'
      )
    }
  }
)

/** PATCH /block-artist/:id — block/unblock an artist */
export const blockArtist = createAsyncThunk(
  'admin/blockArtist',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/block-artist/${id}`)
      return res.data.data // Updated Artist
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to block artist.'
      )
    }
  }
)

// ─── Slice ────────────────────────────────────────────────────────────────────

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    artists: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // ── Fetch Users ───────────────────────────────────────────────────────────
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── Fetch Artists ─────────────────────────────────────────────────────────
    builder
      .addCase(fetchAllArtists.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllArtists.fulfilled, (state, action) => {
        state.loading = false
        state.artists = action.payload
      })
      .addCase(fetchAllArtists.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── Approve Artist ────────────────────────────────────────────────────────
    builder.addCase(approveArtist.fulfilled, (state, action) => {
      const updated = action.payload
      state.artists = state.artists.map((a) =>
        a._id === updated._id ? updated : a
      )
    })

    // ── Block User ────────────────────────────────────────────────────────────
    builder.addCase(blockUser.fulfilled, (state, action) => {
      const updated = action.payload
      state.users = state.users.map((u) =>
        u._id === updated._id ? updated : u
      )
    })

    // ── Block Artist ──────────────────────────────────────────────────────────
    builder.addCase(blockArtist.fulfilled, (state, action) => {
      const updated = action.payload
      state.artists = state.artists.map((a) =>
        a._id === updated._id ? updated : a
      )
    })
  },
})

export const { clearAdminError } = adminSlice.actions

export default adminSlice.reducer
