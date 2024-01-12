import {
  Box,
  Button,
  Step,
  StepButton,
  StepLabel,
  Stepper,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutStep = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Stepper>
        {stepOne ? (
          <Step>
            <StepButton component={Link} to='/login'>
              <Button>Sign In</Button>
            </StepButton>
          </Step>
        ) : (
          <Step>
            <StepLabel>
              <Button disabled>Sign In</Button>
            </StepLabel>
          </Step>
        )}
      </Stepper>
      <Stepper activeStep={2}>
        {stepTwo ? (
          <Step>
            <StepLabel>
              <Button component={Link} to='/shipping'>
                Shipping
              </Button>
            </StepLabel>
          </Step>
        ) : (
          <Step>
            <StepLabel>
              <Button disabled>Shipping</Button>
            </StepLabel>
          </Step>
        )}
      </Stepper>
      <Stepper activeStep={4}>
        {stepThree ? (
          <Step>
            <StepLabel>
              <Button component={Link} to='/login'>
                Sign In
              </Button>
            </StepLabel>
          </Step>
        ) : (
          <Step>
            <StepLabel>
              <Button disabled>Sign In</Button>
            </StepLabel>
          </Step>
        )}
      </Stepper>
      <Stepper activeStep={3}>
        {stepFour ? (
          <Step>
            <StepLabel>
              <Button component={Link} to='/placeOrder'>
                Place Order
              </Button>
            </StepLabel>
          </Step>
        ) : (
          <Step>
            <StepLabel>
              <Button disabled>Place Order</Button>
            </StepLabel>
          </Step>
        )}
      </Stepper>
    </Box>
  )
}

export default CheckoutStep
