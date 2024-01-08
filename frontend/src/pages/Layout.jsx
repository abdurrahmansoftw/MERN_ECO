import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ py: 3 }}>
        <Outlet />
      </Box>
    </div>
  )
}

export default Layout
