import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }))
  }

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Container sx={{ py: 2 }}>
      <Typography component='h1' variant='h3' align='center' color='text.primary' gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={4} sx={{ my: 5 }}>
        <Grid xs={12} sm={6} md={8}>
          <Paper elevation={2} sx={{ p: 2 }}>
            {cartItems.length === 0 ? (
              <Box>
                Your cart is empty.
                <Button variant='outlined' component={Link} to='/' onClick={() => navigate(-1)}>
                  Go Back
                </Button>
              </Box>
            ) : (
              <Grid item xs={12} md={12}>
                <Typography variant='h6' gutterBottom>
                  You have: {cartItems.length} items in your cart
                </Typography>

                {cartItems.map((item) => (
                  <Grid container key={item.product} spacing={3} sx={{ my: 1 }}>
                    <Grid item xs={12} md={2}>
                      <img src={item.image} alt={item.name} style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant='h6' gutterBottom>
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography variant='p' gutterBottom>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <FormControl fullWidth size='small' variant='standard'>
                        <Select value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Button
                        onClick={() => removeFromCartHandler(item._id)}
                        variant='outlined'
                        color='error'
                        size='small'>
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Paper aria-label='main mailbox folders' elevation={0} sx={{ p: 2 }}>
            <Box>
              <Typography variant='h6' gutterBottom>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </Typography>
            </Box>
            <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>Price</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>
                    ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />

            <Button
              onClick={checkoutHandler}
              elevation={0}
              variant='contained'
              color='success'
              disabled={cartItems.length === 0}
              sx={{ display: 'block', width: '100%' }}>
              Procced to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CartScreen
