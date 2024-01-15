import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
			<ToastContainer />
			<Footer />
		</Box>
	)
}

export default Layout
