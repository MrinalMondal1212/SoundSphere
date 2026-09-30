import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Existing pages
import DiscoverPage from "../pages/DiscoverPage";
import SongPage from "../pages/SongPage";
import AlbumsPage from "../pages/AlbumsPage";
import HomePage from "../pages/HomePage";
import Artist from "../pages/Artist";
import Profile from "../pages/Profile";

// Auth pages
import AuthPage from "../pages/auth/AuthPage";
import Register from "../pages/auth/Register";
import RegisterArtist from "../pages/auth/RegisterArtist";

// Dashboard pages
import UserDashboard from "../pages/dashboard/UserDashboard";
import ArtistDashboard from "../pages/dashboard/ArtistDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

// Middleware
import ProtectedRoute from "../middleware/ProtectedRoute";
import RoleRedirect from "../middleware/RoleRedirect";

const Routing = createBrowserRouter([
  // ── Main layout routes ─────────────────────────────────────────────────────
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "artist", element: <Artist /> },
      { path: "artist/:id", element: <Artist /> },
      { path: "artists", element: <Artist /> },
      { path: "Profile", element: <Profile /> },
      { path: "discover", element: <DiscoverPage /> },
      { path: "/album", element: <AlbumsPage /> },
    ],
  },

  // ── Auth routes ────────────────────────────────────────────────────────────
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-artist",
    element: <RegisterArtist />,
  },

  // ── Song page ──────────────────────────────────────────────────────────────
  {
    path: "/song",
    element: <SongPage />,
  },

  // ── Dashboard — role-based redirect ────────────────────────────────────────
  {
    path: "/dashboard",
    element: <RoleRedirect />,
  },

  // ── User dashboard ─────────────────────────────────────────────────────────
  {
    path: "/dashboard/user",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },

  // ── Artist dashboard ───────────────────────────────────────────────────────
  {
    path: "/dashboard/artist",
    element: (
      <ProtectedRoute allowedRoles={["artist"]}>
        <ArtistDashboard />
      </ProtectedRoute>
    ),
  },

  // ── Admin dashboard ────────────────────────────────────────────────────────
  {
    path: "/dashboard/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);

export default Routing;