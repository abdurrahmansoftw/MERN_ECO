import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' elevation={1}>
        <Toolbar>
          <Typography
            variant='h6'
            component={Link}
            hrf={'/'}
            sx={{ flexGrow: 1 }}>
            MERN SHOP
          </Typography>
          <Button color='inherit'>Cart</Button>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
