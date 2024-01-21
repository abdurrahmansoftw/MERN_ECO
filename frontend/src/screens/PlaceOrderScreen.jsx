import {
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
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
										Item Ordered ({cart.cartItems.length})
									</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider />
						{cart.cartItems.map((item) => (
							<ListItem disablePadding key={item.product}>
								<ListItemButton>
									<img src={item.image} alt={item.name} className='w-16' />
								</ListItemButton>
								<ListItemButton
									components={CustomLink}
									to={`/product/${item.product}`}
								>
									<ListItemText>{item.name}</ListItemText>
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
				</Grid>
			</Grid>
		</Box>
	)
}

export default PlaceOrderScreen
