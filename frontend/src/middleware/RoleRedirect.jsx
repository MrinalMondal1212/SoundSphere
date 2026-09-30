import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser, selectIsAuthenticated } from '../store/authSlice'

/**
 * RoleRedirect — used on the /dashboard route.
 * Reads the logged-in user's role and redirects to their specific dashboard.
 *
 * Redirects:
 *   user   → /dashboard/user
 *   artist → /dashboard/artist
 *   admin  → /dashboard/admin
 *   not logged in → /login
 */
const RoleRedirect = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  const roleDashboardMap = {
    user: '/dashboard/user',
    artist: '/dashboard/artist',
    admin: '/dashboard/admin',
  }

  const destination = roleDashboardMap[user.role] || '/login'
  return <Navigate to={destination} replace />
}

export default RoleRedirect
