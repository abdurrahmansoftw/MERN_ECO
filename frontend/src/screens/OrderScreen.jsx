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
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
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

	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

	// const { userInfo } = useSelector((state) => state.auth)

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
	const {
		data: paypal,
		isLoading: loadingPayPal,
		error: errorPayPal,
	} = useGetPaypalClientIdQuery()

	useEffect(() => {
		if (!errorPayPal && !loadingPayPal && paypal.clientId) {
			const loadPaypalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: { 'client-id': paypal.clientId, currency: 'USD' },
				})
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
			}
			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadPaypalScript()
				}
			}
		}
	}, [errorPayPal, loadingPayPal, paypal, order, paypalDispatch])

	function onApprove(data, actions) {
		return actions.order.capture().then(async function (details) {
			try {
				await payOrder({ orderId, details })
				refetch()
				toast.success('Order is paid')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		})
	}

	function onCancel(data) {
		toast.error('Order is not paid')
	}

	function onError(err) {
		toast.error(err?.data?.message || err.error)
	}

	const createOrder = (data, actions) => {}

	const onApproveTest = async () => {
		console.log('onApproveTest')
	}

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
								{!order.isPaid && (
									<ListItemText>
										{loadingPay && <div>loadingPay</div>}
										{isPending ? (
											<div>isPending</div>
										) : (
											<PayPalButtons
												onApprove={onApprove}
												onCancel={onCancel}
												onError={onError}
												createOrder={createOrder}
												disableFunding={['card']}
											/>
										)}
									</ListItemText>
								)}
							</ListItemButton>
						</ListItem>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

export default OrderScreen
