import VisibilityIcon from '@mui/icons-material/Visibility'
import {
	Alert,
	Box,
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice'
import { useProfileMutation } from '../../slices/usersApiSlice'

const ProfileScreen = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassowrd] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const dispatch = useDispatch()
	const { userInfo } = useSelector((state) => state.auth)

	const [updateProfile, { isLoading: loadingUpdateProfile }] =
		useProfileMutation()

	const {
		data: orders,
		isLoading: loadingOrders,
		error: errorOrders,
	} = useGetMyOrdersQuery()

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name)
			setEmail(userInfo.email)
		}
	}, [userInfo])

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Password do not match')
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					name,
					email,
					password,
				}).unwrap()
				dispatch(setCredentials(res))
				toast.success('Profile Updated')
			} catch (error) {
				toast.error(error?.data?.message || error?.data?.error || error.error)
			}
		}
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={8}>
					<Typography variant='h3' gutterBottom component='div'>
						Order History
					</Typography>
					{loadingOrders ? (
						<Box>loading</Box>
					) : errorOrders ? (
						<Alert severity='warning'>This is a warning Alert.</Alert>
					) : (
						<TableContainer>
							<Table stickyHeader aria-label='sticky table' size='small'>
								<TableHead>
									<TableRow>
										<TableCell>DATE</TableCell>
										<TableCell>TOTAL</TableCell>
										<TableCell>PAID</TableCell>
										<TableCell>DELIVERED</TableCell>
										<TableCell>Details</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{orders?.map((order) => (
										<TableRow key={order._id}>
											<TableCell>{order.createdAt.substring(0, 10)}</TableCell>
											<TableCell>${order.totalPrice}</TableCell>
											<TableCell>
												{order.isPaid ? (
													order.paidAt.substring(0, 10)
												) : (
													<Alert severity='warning'>Not Paid</Alert>
												)}
											</TableCell>
											<TableCell>
												{order.isDelivered ? (
													order.deliveredAt.substring(0, 10)
												) : (
													<Alert severity='warning'>Not Delivered</Alert>
												)}
											</TableCell>
											<TableCell>
												<Button
													variant='outlined'
													color='primary'
													size='small'
													onClick={() => {
														// history.push(`/order/${order._id}`)
													}}
												>
													<VisibilityIcon />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper sx={{ p: 2, height: '100%' }}>
						<Typography variant='h3' gutterBottom component='div'>
							User Profile
						</Typography>

						<Box
							component='form'
							onSubmit={submitHandler}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								label='Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoComplete='name'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								label='Email Address'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete='email'
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								value={password}
								onChange={(e) => setPassowrd(e.target.value)}
								label='Password'
								type='password'
								autoComplete='current-password'
							/>
							<TextField
								margin='normal'
								fullWidth
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								label='Confirm Password'
								type='password'
								autoComplete='current-password'
							/>

							<Button
								type='submit'
								disabled={false}
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Profile Update
							</Button>
							{loadingUpdateProfile && (
								<Typography variant='h6'>Loading...</Typography>
							)}
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default ProfileScreen
