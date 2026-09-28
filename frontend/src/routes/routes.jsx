import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage  from '../pages/HomePage'
import Artist    from '../pages/Artist'



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,          element: <HomePage />   },
      { path: 'artist',       element: <Artist />     },
      { path: 'artist/:id',   element: <Artist />     },
      { path: 'artists',      element: <Artist />     },
      
    ],
  },
  
])

export default router

