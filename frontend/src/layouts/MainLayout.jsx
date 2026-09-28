import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Topbar from './Topbar'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-background overflow-x-hidden w-full">
      {/* Fixed left sidebar */}
      <Navbar />

      {/* Main content area — offset by sidebar width, capped so it never bleeds */}
      <div className="flex-1 ml-[220px] flex flex-col min-h-screen overflow-x-hidden min-w-0">
        <Topbar />
        <main className="flex-1 px-6 py-6 overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
