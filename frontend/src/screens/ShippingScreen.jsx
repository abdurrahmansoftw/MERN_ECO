import React, { useState } from 'react'

import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from '../components/CheckoutStep'
import FromContainer from '../components/FromContainer'
import { saveShippingAddress } from '../slices/cartSlice'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  )
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <FromContainer>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LocalShippingIcon />
        </Avatar>
        <Typography component='h1' variant='h4'>
          Shipping address
        </Typography>

        <CheckoutStep stepOne stepTwo />

        <Box
          component='form'
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Address'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete='address'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            label='City'
            type='text'
            autoComplete='current-city'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Postal Code'
            type='number'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            autoComplete='number'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label='country'
            type='text'
            id='country'
            autoComplete='current-country'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 3 }}>
            Continue
          </Button>
        </Box>
      </Box>
    </FromContainer>
  )
}

export default ShippingScreen
