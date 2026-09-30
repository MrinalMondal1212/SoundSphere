import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser, selectIsAuthenticated } from '../store/authSlice'

/**
 * ProtectedRoute — RBAC wrapper component.
 *
 * Usage:
 *   <ProtectedRoute allowedRoles={['admin']}>
 *     <AdminDashboard />
 *   </ProtectedRoute>
 *
 * Logic:
 *   1. If not authenticated → redirect to /login
 *   2. If allowedRoles provided and user.role not in list → redirect to their own dashboard
 *   3. Otherwise → render children
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  // Not logged in at all
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  // Role-based access control
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their own dashboard
    const roleDashboardMap = {
      user: '/dashboard/user',
      artist: '/dashboard/artist',
      admin: '/dashboard/admin',
    }
    const fallback = roleDashboardMap[user.role] || '/login'
    return <Navigate to={fallback} replace />
  }

  return children
}

export default ProtectedRoute
