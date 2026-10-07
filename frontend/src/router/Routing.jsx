import { createBrowserRouter, Outlet } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import GlobalPlayer from "../components/GlobalPlayer";

// Existing pages
import DiscoverPage from "../pages/DiscoverPage";
import SongPage from "../pages/SongPage";
import AlbumsPage from "../pages/AlbumsPage";
import HomePage from "../pages/HomePage";
import Artist from "../pages/Artist";
import Profile from "../pages/Profile";
import LibraryPage from "../pages/LibraryPage";

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

// Root Layout to ensure GlobalPlayer stays mounted across all routes
const RootLayout = () => {
  return (
    <>
      <Outlet />
      <GlobalPlayer />
    </>
  );
};

const Routing = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
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
          { path: "songs", element: <DiscoverPage /> },
          { path: "album", element: <AlbumsPage /> },
          { path: "library", element: <LibraryPage /> },
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
        path: "/song/:id",
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
    ],
  },
]);

export default Routing;