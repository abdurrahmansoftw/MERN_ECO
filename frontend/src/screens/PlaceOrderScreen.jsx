import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PlaceOrderScreen = () => {
	const navigate = useNavigate()
	const cart = useSelector((state) => state.cart)
	
	useEffect(() => {
		if (!cart.shippingAddress) {
			navigate('/shipping')
		}
	}, [cart.shippingAddress, navigate])

	return <Box>Ok</Box>
}

export default PlaceOrderScreen
