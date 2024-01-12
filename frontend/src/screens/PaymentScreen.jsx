import { Box, Button, Checkbox, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckoutStep from '../components/CheckoutStep'
import FromContainer from '../components/FromContainer'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

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
        <Typography component='h1' variant='h4'>
          Payment Method
        </Typography>

        <CheckoutStep stepOne stepTwo stepThree />

        <Checkbox defaultChecked color='secondary' variant='radio' />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 3 }}>
          Continue
        </Button>
      </Box>
    </FromContainer>
  )
}

export default PaymentScreen
