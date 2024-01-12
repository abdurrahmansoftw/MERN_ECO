import {
  Box,
  Button,
  Step,
  StepButton,
  StepLabel,
  Stepper,
} from '@mui/material'
import React from 'react'
import CustomLink from './CustomLink'

const CheckoutStep = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Stepper>
        {stepOne ? (
          <Step>
            <StepButton>
              <Button component={CustomLink} to='/login'>
                Sign In
              </Button>
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
      <Stepper>
        {stepTwo ? (
          <Step>
            <StepLabel>
              <Button component={CustomLink} to='/shipping'>
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
      <Stepper>
        {stepThree ? (
          <Step>
            <StepLabel>
              <Button component={CustomLink} to='/login'>
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
      <Stepper>
        {stepFour ? (
          <Step>
            <StepLabel>
              <Button component={CustomLink} to='/placeOrder'>
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
