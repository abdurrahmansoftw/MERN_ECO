import { Box, Button, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutStep = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Box>
      <Stepper activeStep={1} alternativeLabel>
        {stepOne ? (
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
    </Box>
  )
}

export default CheckoutStep
