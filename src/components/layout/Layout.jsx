import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'
import SkipToContent from '../common/SkipToContent'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <TopBar />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
