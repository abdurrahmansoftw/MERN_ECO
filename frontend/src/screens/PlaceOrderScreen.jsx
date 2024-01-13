import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from '../components/CheckoutStep'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  return (
    <Box sx={{ my: 5 }}>
      <CheckoutStep stepOne stepTwo stepThree stepFour />
    </Box>
  )
}

export default PlaceOrderScreen
