import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Topbar from './Topbar'
import Footer from './Footer'
import GlobalPlayer from '../components/GlobalPlayer'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden w-full">
      {/* Fixed left sidebar */}
      <Navbar />

      {/* Main content area — offset by sidebar width, capped so it never bleeds */}
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen overflow-x-hidden min-w-0 pb-20">
        <Topbar />
        <main className="flex-1 px-6 py-6 overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>

      <GlobalPlayer />
    </div>
  )
}

export default MainLayout
