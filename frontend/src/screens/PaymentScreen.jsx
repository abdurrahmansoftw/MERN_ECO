import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CheckoutStep from '../components/CheckoutStep'
import FromContainer from '../components/FromContainer'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const [stripe, setStripe] = useState('')

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

        <RadioGroup name='use-radio-group' defaultValue='first'>
          <Box sx={{ display: 'flex', flexDirection: 'column', my: 5 }}>
            <FormControlLabel
              id='PayPal'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onClick={(e) => setPaymentMethod(e.target.value)}
              control={<Radio />}
              label=' PayPal or Credit Card'
            />
            <FormControlLabel
              id='stripe'
              value={stripe}
              onClick={(e) => setStripe(e.target.value)}
              control={<Radio />}
              label='Stripe'
            />
          </Box>
        </RadioGroup>

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
