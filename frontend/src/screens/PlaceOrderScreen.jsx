import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

const PlaceOrderScreen = () => {
	const cart = useSelector((state) => state.cart)
	return <Box>Ok</Box>
}

export default PlaceOrderScreen
