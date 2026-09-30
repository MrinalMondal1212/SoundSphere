import axios from 'axios'

// Centralized axios instance for all Redux thunk API calls
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3009/api',
  headers: { 'Content-Type': 'application/json' },
})

// ─── Request Interceptor ─────────────────────────────────────────────────────
// Attaches JWT from localStorage to every outgoing request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ─── Response Interceptor ────────────────────────────────────────────────────
// Globally handles 401 Unauthorized — clears token and redirects to login
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
