import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingChatIcon from "./components/FloatingChatIcon";

const Layout = () => {
  return (
    <>
 
      <header>
        <Navbar />
      </header>

      <main className='min-h-screen'>
        <Outlet/>
        <FloatingChatIcon />
      </main>
      
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout