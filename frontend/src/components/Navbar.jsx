import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Badge, Box, Button, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart)
  console.log(cartItems)
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
          <Button color='inherit' component={Link} to='/cart'>
            {cartItems.length === 0 ? (
              <Box>
                <ShoppingCartIcon /> Cart
              </Box>
            ) : (
              <Box>
                <Badge
                  sx={{ mr: 1 }}
                  badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
                  color='success'>
                  <ShoppingCartIcon fontSize='small' />
                </Badge>
                Cart
              </Box>
            )}
          </Button>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
