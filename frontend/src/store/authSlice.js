import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../services/axiosInstance'

// ─── Helper: Load initial state from localStorage ────────────────────────────
const loadFromStorage = () => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
    }
  } catch {
    return { token: null, user: null }
  }
}

const { token: storedToken, user: storedUser } = loadFromStorage()

// ─── Async Thunks ─────────────────────────────────────────────────────────────

/**
 * Login thunk — POST /login
 * Response: { success, message, data: { id, name, email, role }, token }
 * NOTE: token is at root level, NOT inside data
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/login', credentials)
      return res.data // { success, message, data, token }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Login failed. Please try again.'
      )
    }
  }
)

/**
 * Register thunk — POST /register
 * Body: { name, email, password, role }
 * Response: { success, message, data: { id, name, email, role } }
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/register', userData)
      return res.data // { success, message, data }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Registration failed. Please try again.'
      )
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put('/updateProfile', profileData)
      return res.data.data // { id, name, email, role }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Profile update failed.'
      )
    }
  }
)

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser,
    token: storedToken,
    loading: false,
    error: null,
    registerSuccess: false,
  },
  reducers: {
    // Clears auth state and removes token/user from localStorage
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    // Clears any stale error messages
    clearError(state) {
      state.error = null
    },
    // Resets the registerSuccess flag
    clearRegisterSuccess(state) {
      state.registerSuccess = false
    },
  },
  extraReducers: (builder) => {
    // ── Login ─────────────────────────────────────────────────────────────────
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        // token is at root level: action.payload.token
        state.token = action.payload.token
        // user data is in action.payload.data
        state.user = action.payload.data
        // Persist to localStorage
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.data))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── Register ──────────────────────────────────────────────────────────────
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.registerSuccess = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.registerSuccess = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.registerSuccess = false
      })

    // ── Update Profile ────────────────────────────────────────────────────────
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError, clearRegisterSuccess } = authSlice.actions

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => !!state.auth.token
export const selectRole = (state) => state.auth.user?.role
export const selectLoading = (state) => state.auth.loading
export const selectError = (state) => state.auth.error
export const selectRegisterSuccess = (state) => state.auth.registerSuccess

export default authSlice.reducer
