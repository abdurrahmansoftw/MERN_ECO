import { Box, Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
	const { userInfo } = useSelector((state) => state.auth)
	return userInfo && userInfo.isAdmin ? (
		<Box>
			<Container maxWidth='xl'>
				<Outlet />
			</Container>
		</Box>
	) : (
		<Navigate to='/login' replace />
	)
}

export default AdminRoutes
