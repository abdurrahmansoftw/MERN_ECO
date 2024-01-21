import {
	Box,
	Button,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from '../components/CheckoutStep'
import CustomLink from '../components/CustomLink'
import { clearCartItems } from '../slices/cartSlice'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'

const PlaceOrderScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cart = useSelector((state) => state.cart)

	const [createOrder, { isLoading, error }] = useCreateOrderMutation()

	useEffect(() => {
		if (!cart.shippingAddress) {
			navigate('/shipping')
		} else if (!cart.paymentMethod) {
			navigate('/payment')
		}
	}, [cart.shippingAddress, navigate, cart.paymentMethod])

	const placeOrderHandler = async () => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap()
			dispatch(clearCartItems())
		} catch (error) {}
	}

	return (
		<Box sx={{ flexGrow: 1, my: 3 }}>
			<CheckoutStep stepOne stepTwo stepThree stepFour />
			<Grid container spacing={2}>
				<Grid item xs={12} md={8}>
					<Typography component='h1' variant='h4'>
						Place Order
					</Typography>

					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h6' component='h1'>
										Shipping Address
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									{cart.shippingAddress.address}, {cart.shippingAddress.city}
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									{cart.shippingAddress.postalCode},{' '}
									{cart.shippingAddress.country}
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />

						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h6' component='h1'>
										Payment Method
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />

						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>{cart.paymentMethod}</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />

						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h6' component='h1'>
										Item Ordered ({cart.cartItems.length})
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />
						{cart.cartItems.map((item) => (
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
									<ListItemText>
										Item Ordered ({cart.cartItems.length})
									</ListItemText>
								</ListItemButton>
							</ListItem>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText>${cart.itemsPrice} </ListItemText>
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
									<ListItemText>${cart.shippingPrice}</ListItemText>
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
									<ListItemText>${cart.taxPrice}</ListItemText>
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
											${cart.totalPrice}
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
							<ListItemButton>
								<Button
									variant='contained'
									color='primary'
									fullWidth
									disabled={cart.cartItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListItemButton>
						</ListItem>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

export default PlaceOrderScreen
