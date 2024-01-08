import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' elevation={1}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <Button color='inherit'>Cart</Button>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
