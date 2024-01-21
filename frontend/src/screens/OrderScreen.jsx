import {
	Alert,
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material'
import { usePayPalScriptReducer } from '@paypal/react-paypal-js'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CustomLink from '../components/CustomLink'
import {
	useGetOrderDetailsQuery,
	useGetPaypalClientIdQuery,
	usePayOrderMutation,
} from '../slices/ordersApiSlice'

const OrderScreen = () => {
	const { id: orderId } = useParams()
	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId)

	const [payOrder, { isLoading: isPayLoading }] = usePayOrderMutation()
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
	const {
		data: paypal,
		isLoading: loadingPaypal,
		error: errorPaypal,
	} = useGetPaypalClientIdQuery()

	const { userInfo } = useSelector((state) => state.auth)

	useEffect(() => {
		if (!errorPaypal && !loadingPaypal && !paypal.clientId) {
			const loadingPaypalScript = async () => {
				await paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': paypal.clientId,
						currency: 'USD',
					},
				})
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
			}
			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadingPaypalScript()
				}
			}
		}
	}, [errorPaypal, loadingPaypal, order, paypal, paypalDispatch])

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error}</div>
	return (
		<Box sx={{ flexGrow: 1, my: 3 }}>
			<Typography component='h1' variant='h4'>
				Order Id: {order._id}
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12} md={8}>
					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h6' component='h1'>
										User Name: {order.user.name}
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h6' component='h1'>
										Shipping Address: {order.shippingAddress.address},{' '}
										{order.shippingAddress.city}
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h6' component='h1'>
										Payment Method: {order.paymentMethod}
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						{order.isPaid ? (
							<Alert severity='success'>Paid on {order.paidAt}</Alert>
						) : (
							<Alert severity='error'>Not Paid</Alert>
						)}
						<Divider />
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h6' component='h1'>
										Order Items
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />
						{order.orderItems.map((item) => (
							<ListItem disablePadding key={item._id}>
								<ListItemButton>
									<img src={item.image} alt={item.name} className='w-16' />
								</ListItemButton>
								<ListItemButton>
									<ListItemText>
										<CustomLink to={`/product/${item._id}`}>
											{item.name}
										</CustomLink>
									</ListItemText>
								</ListItemButton>
								<ListItemButton>
									<ListItemText>
										{item.qty} x ${item.price} = ${item.qty * item.price}
									</ListItemText>
								</ListItemButton>
							</ListItem>
						))}
						<Divider />
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h6' component='h1'>
										Order Total: ${order.totalPrice}
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						{order.isDelivered ? (
							<Alert severity='success'>Delivered on {order.deliveredAt}</Alert>
						) : (
							<Alert severity='error'>Not Delivered</Alert>
						)}
					</List>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper elevation={2}>
						<Typography component='h1' variant='h4' sx={{ p: 2 }}>
							Order Summary
						</Typography>
						<List sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>Items Price</ListItemText>
								</ListItemButton>
							</ListItem>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>${order.itemsPrice} </ListItemText>
								</ListItemButton>
							</ListItem>
						</List>
						<Divider />
						<List sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>Shipping Price</ListItemText>
								</ListItemButton>
							</ListItem>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>${order.shippingPrice}</ListItemText>
								</ListItemButton>
							</ListItem>
						</List>
						<Divider />
						<List sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>Tax Price</ListItemText>
								</ListItemButton>
							</ListItem>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>${order.taxPrice}</ListItemText>
								</ListItemButton>
							</ListItem>
						</List>
						<Divider />
						<List sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>
										<Typography variant='h5' component='h1'>
											Total Price
										</Typography>
									</ListItemText>
								</ListItemButton>
							</ListItem>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>
										<Typography variant='h5' component='h1'>
											${order.totalPrice}
										</Typography>
									</ListItemText>
								</ListItemButton>
							</ListItem>
						</List>

						<Divider />

						<ListItem disablePadding>
							<ListItemButton>
								{error && <p>{error}</p>}
								{isLoading && <p>Loading...</p>}
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton>{/* Pay Order PlaceHohoder */}</ListItemButton>
						</ListItem>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

export default OrderScreen
