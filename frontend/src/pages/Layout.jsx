import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useScrollToTop } from '../hooks/use-scroll-to-top'

const Layout = () => {
  useScrollToTop()
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
