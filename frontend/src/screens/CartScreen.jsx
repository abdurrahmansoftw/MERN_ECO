import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const CartScreen = () => {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant='h3' gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        {cartItems.length === 0 ? (
          <Grid item xs={12} md={10}>
            Your cart is empty.{' '}
            <Button
              variant='outlined'
              component={Link}
              to='/'
              onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Grid>
        ) : (
          <Grid item xs={12} md={8}>
            <Typography variant='h6' gutterBottom>
              You have: {cartItems.length} items in your cart
            </Typography>

            {cartItems.map((item) => (
              <Grid container key={item.product} spacing={3} sx={{ my: 1 }}>
                <Grid item xs={12} md={2}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%' }}
                  />
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
                    <Select value={item.qty} onChange={(e) => e.target.value}>
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
                    variant='outlined'
                    color='error'
                    component={Link}
                    to={`/product/${item.product}`}>
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}

        <Grid item xs={12} md={2}>
          Hello
        </Grid>
      </Grid>
    </Container>
  )
}

export default CartScreen
