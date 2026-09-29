import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DiscoverPage from "../pages/DiscoverPage";
import SongPage from "../pages/SongPage";
import AlbumsPage from "../pages/AlbumsPage";
import HomePage from "../pages/HomePage";
import Artist from "../pages/Artist";
import ArtistDashboard from "../pages/ArtistDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Profile from "../pages/Profile";
import AuthPage from "../pages/auth/AuthPage";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "artist", element: <Artist /> },
      { path: "artist/:id", element: <Artist /> },
      { path: "artists", element: <Artist /> },
      { path: "Profile", element: <Profile /> },
      {
        path: "discover",
        element: <DiscoverPage />,
      },
      {
        path: "/album",
        element: <AlbumsPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <AuthPage />,
  },

  {
    path: "/register",
    element: <AuthPage />,
  },

  {
    path: "/song",
    element: <SongPage />,
  },

  {
    path: "/artistDashboard",
    element: <ArtistDashboard />,
  },

  {
    path: "/admindashboard",
    element: <AdminDashboard />,
  },
]);

export default Routing;