import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PlaceOrderScreen = () => {
	const navigate = useNavigate()
	const cart = useSelector((state) => state.cart)
	return <Box>Ok</Box>
}

export default PlaceOrderScreen
