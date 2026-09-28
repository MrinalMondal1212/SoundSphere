/**
 * SoundSphere API Service
 * ─────────────────────────────────────────────
 * Central HTTP client for all backend requests.
 *
 * Backend base URL : http://localhost:3009
 * All routes prefixed with : /api
 *
 * Usage:
 *   import api from '../services/api'
 *   const songs = await api.get('/songs')
 *   await api.post('/auth/login', { email, password })
 *
 * Auth token is automatically attached from localStorage.
 * Set VITE_API_URL in your .env to override the base URL.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3009/api'

const getAuthHeaders = () => {
  // JWT token is stored in localStorage after a successful login
  // → src/pages/auth/Login.jsx saves it as localStorage.setItem('token', token)
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Request failed — status ${response.status}`)
    }

    return data
  } catch (error) {
    console.error(`[API] ${options.method || 'GET'} ${endpoint} →`, error.message)
    throw error
  }
}

const api = {
  get:    (endpoint)        => request(endpoint, { method: 'GET' }),
  post:   (endpoint, body)  => request(endpoint, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (endpoint, body)  => request(endpoint, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (endpoint)        => request(endpoint, { method: 'DELETE' }),
}

export default api
