import {
  Avatar,
  Box,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from '../components/CheckoutStep'
import CustomLink from '../components/CustomLink'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  return (
    <Box sx={{ my: 5 }}>
      <CheckoutStep stepOne stepTwo stepThree stepFour />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Item>
              <ListItem component='div' disablePadding>
                <ListItemButton>
                  <ListItemText>
                    <Typography variant='h6'>Shipping</Typography>
                    <Typography variant='body1'>
                      Address: {cart.shippingAddress.address},
                      {cart.shippingAddress.city},
                      {cart.shippingAddress.postalCode},
                      {cart.shippingAddress.country}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem component='div' disablePadding>
                <ListItemButton>
                  <ListItemText>
                    <Typography variant='h6'>Payment</Typography>
                    <Typography variant='body1'>
                      Method: {cart.paymentMethod}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <Divider />
              <ListItem component='div' disablePadding>
                <ListItemButton>
                  <ListItemText>
                    <Typography variant='h6'>Order Items</Typography>
                    <Typography variant='body1'>
                      {cart.cartItems.length === 0 ? (
                        <Typography>Cart is empty</Typography>
                      ) : (
                        <Typography>
                          {cart.cartItems.reduce(
                            (acc, item) => acc + item.qty,
                            0
                          )}{' '}
                          items Available
                        </Typography>
                      )}
                      {cart.cartItems.map((item, index) => (
                        <Grid container spacing={2} key={index} sx={{ m: 1 }}>
                          <Grid item xs={2}>
                            <ListItem component='div' disablePadding>
                              <ListItemAvatar>
                                <Avatar
                                  alt={item.name}
                                  src={item.image}
                                  sx={{ width: 56, height: 56 }}
                                />
                              </ListItemAvatar>
                            </ListItem>
                          </Grid>
                          <Grid item xs={6}>
                            <ListItem component='div' disablePadding>
                              <ListItemText>
                                <Typography
                                  variant='body1'
                                  component={CustomLink}
                                  to={`/products/${item.product}`}>
                                  {item.name}
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                          <Grid item xs={4}>
                            <ListItemText>
                              <Typography variant='body1'>
                                {item.qty} x ${item.price} = $
                                {item.qty * item.price}
                              </Typography>
                            </ListItemText>
                          </Grid>
                        </Grid>
                      ))}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <Divider />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <ListItem component='div' disablePadding>
                <ListItemText>
                  <Typography variant='h6'>Order Summary</Typography>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem component='div' disablePadding>
                <ListItemText>
                  <Typography variant='body1'>
                    Items:{' '}
                    {cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Typography>
                </ListItemText>
                <ListItemText>
                  <Typography variant='body1'>
                    $
                    {cart.cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PlaceOrderScreen
