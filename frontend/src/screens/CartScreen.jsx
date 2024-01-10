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
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const CartScreen = () => {
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  return (
    <Container sx={{ py: 2 }}>
      <Typography
        component='h1'
        variant='h3'
        align='center'
        color='text.primary'
        gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={4} sx={{ my: 5 }}>
        <Grid xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 2 }}>
            {cartItems.length === 0 ? (
              <Box>
                Your cart is empty.
                <Button
                  variant='outlined'
                  component={Link}
                  to='/'
                  onClick={() => navigate(-1)}>
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
                    <Grid item xs={12} md={1}>
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
                        <Select
                          value={item.qty}
                          onChange={(e) => e.target.value}>
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
          </Paper>
        </Grid>

        <Grid xs={12} md={4}>
          <Paper aria-label='main mailbox folders' elevation={0}>
            <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Price' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>
                    
                    {
                      // product.price
                      cartItems.reduce(
                        (acc, item) => acc + item.price * item.qty,
                        0
                      )
                    }
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Status' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>QTY</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />

            <Button
              onClick={''}
              elevation={0}
              variant='contained'
              color='info'
              sx={{ display: 'block', width: '100%' }}>
              Add to Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CartScreen
