import {
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
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from '../components/CheckoutStep'
import CustomLink from '../components/CustomLink'

const PlaceOrderScreen = () => {
	const navigate = useNavigate()
	const cart = useSelector((state) => state.cart)

	useEffect(() => {
		if (!cart.shippingAddress) {
			navigate('/shipping')
		} else if (!cart.paymentMethod) {
			navigate('/payment')
		}
	}, [cart.shippingAddress, navigate, cart.paymentMethod])

	return (
		<Box sx={{ flexGrow: 1, my: 3 }}>
			<CheckoutStep stepOne stepTwo stepThree stepFour />
			<Grid container spacing={2}>
				<Grid item xs={12} md={8}>
					<Typography component='h1' variant='h2'>
						Place Order
					</Typography>

					<List>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText>
									<Typography variant='h5' component='h1'>
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
									<Typography variant='h5' component='h1'>
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
									<Typography variant='h5' component='h1'>
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
					<Typography component='h1' variant='h4'>
						Order Summary
					</Typography>

					<Paper aria-label='main mailbox folders' elevation={5}>
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
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

export default PlaceOrderScreen
