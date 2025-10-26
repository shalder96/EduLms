import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingChatIcon from "./components/FloatingChatIcon";
import ScrollToTop from "./components/ScrollToTop";

const Layout = () => {
  return (
    <>
 
      <header>
        <Navbar />
      </header>

      <main className='min-h-screen'>
        <Outlet/>
        <FloatingChatIcon />
        <ScrollToTop />
      </main>
      
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout