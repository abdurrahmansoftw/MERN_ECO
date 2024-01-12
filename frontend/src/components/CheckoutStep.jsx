import { Box } from '@mui/material'
import React from 'react'
import CustomLink from './CustomLink'

const CheckoutStep = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Box>
      <CustomLink to='/cart'>Cart</CustomLink>
    </Box>
  )
}

export default CheckoutStep
