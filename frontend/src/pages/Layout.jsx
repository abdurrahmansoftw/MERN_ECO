import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Container maxWidth='xl'>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  )
}

export default Layout
