import { Box } from '@mui/material'
import React from 'react'
import CustomLink from './CustomLink'

const CheckoutStep = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Box>
      {stepOne ? (
        <CustomLink to='/login'>Sign In</CustomLink>
      ) : (
        <CustomLink disabled>Sign In</CustomLink>
      )}
    </Box>
  )
}

export default CheckoutStep
