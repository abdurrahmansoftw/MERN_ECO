import React, { useState } from 'react'

import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import FromContainer from '../components/FromContainer'

const ShippingScreen = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
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
            autoComplete='address'
            autoFocus
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
