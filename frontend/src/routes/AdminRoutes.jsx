import { Box, Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const AdminRoutes = () => {
	const { userInfo } = useSelector((state) => state.auth)
	return userInfo && userInfo.admin ? (
		<Box>
			<Navbar />
			<Container maxWidth='xl'>
				<Outlet />
			</Container>
			<Footer />
		</Box>
	) : (
		<Navigate to='/login' replace />
	)
}

export default AdminRoutes
