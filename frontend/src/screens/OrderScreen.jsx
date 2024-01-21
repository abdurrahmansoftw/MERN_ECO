import {
	Alert,
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice'

const OrderScreen = () => {
	const { id: orderId } = useParams()
	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId)
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
							<ListItem disablePadding key={item.product}>
								<ListItemButton>
									<ListItemText>
										{item.name} x {item.qty} = ${item.price * item.qty}
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
					</List>
					{order.isDelivered ? (
						<Alert severity='success'>Delivered on {order.deliveredAt}</Alert>
					) : (
						<Alert severity='error'>Not Delivered</Alert>
					)}
				</Grid>
				<Grid item xs={12} md={4}></Grid>
			</Grid>
		</Box>
	)
}

export default OrderScreen
