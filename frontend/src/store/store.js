import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import adminReducer from './adminSlice'
import artistReducer from './artistSlice'
import playerReducer from './playerSlice'

/**
 * Redux store — combines auth, admin, and artist slices.
 * Wrapped around <App /> in main.jsx via <Provider store={store}>.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    artist: artistReducer,
    player: playerReducer,
  },
})

export default store
