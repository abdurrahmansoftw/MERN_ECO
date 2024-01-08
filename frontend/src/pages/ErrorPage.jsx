import { Box, Typography } from '@mui/material'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <div>
      <Navbar />
      <Box sx={{ py: 2 }}>
        <Typography variant='h4' component='div' gutterBottom>
          Oops
        </Typography>

        <div>
          {isRouteErrorResponse(error)
            ? 'This page does not exist.'
            : 'An unexpected error occurred.'}
        </div>
      </Box>
    </div>
  )
}

export default ErrorPage
