import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DiscoverPage from "../pages/DiscoverPage";
import SongPage from "../pages/SongPage";
import AlbumsPage from "../pages/AlbumsPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import HomePage from "../pages/HomePage";
import Artist from "../pages/Artist";
import ArtistDashboard from "../pages/ArtistDashboard";
import AdminDashboard from "../pages/AdminDashboard";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "artist", element: <Artist /> },
      { path: "artist/:id", element: <Artist /> },
      { path: "artists", element: <Artist /> },
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
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
    path : "/admindashboard",
    element : <AdminDashboard />
  }
]);

export default Routing;
