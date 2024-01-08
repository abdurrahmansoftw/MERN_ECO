import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
