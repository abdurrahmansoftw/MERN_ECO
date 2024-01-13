import {
  Alert,
  Avatar,
  Box,
  Button,
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
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckoutStep from '../components/CheckoutStep'
import CustomLink from '../components/CustomLink'
import { clearCartItems } from '../slices/cartSlice'
import { useAddOrderItemsMutation } from '../slices/ordersApiSlice'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const [createOrder, { isLoading, error }] = useAddOrderItemsMutation()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
      console.log(res);
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Box sx={{ my: 5 }}>
      <CheckoutStep stepOne stepTwo stepThree stepFour />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
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
                            <ListItem  disablePadding>
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
          <Grid item xs={12}  md={4}>
            <Item>
              <ListItem component='div' disablePadding>
                <ListItemText>
                  <Typography variant='h6'>Order Summary</Typography>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem component='div' disablePadding>
                <ListItemText>
                  <Typography variant='body1'>Items:</Typography>
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
              <Divider />
              <ListItem component='div' disablePadding>
                <ListItemText>
                  <Typography variant='body1'>Shipping</Typography>
                </ListItemText>
                <ListItemText>
                  <Typography variant='body1'>${cart.shippingPrice}</Typography>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem component='div' disablePadding>
                <ListItemText>
                  <Typography variant='body1'>Tax</Typography>
                </ListItemText>
                <ListItemText>
                  <Typography variant='body1'>$ {cart.taxPrice}</Typography>
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem component='div' disablePadding>
                <ListItemText>
                  <Typography variant='body1'>Total</Typography>
                </ListItemText>
                <ListItemText>
                  <Typography variant='body1'>$ {cart.totalPrice}</Typography>
                </ListItemText>
              </ListItem>
              <Divider />

              {error && (
                <Alert variant='outlined' color='warning'>
                  {error}
                </Alert>
              )}

              <ListItem component='div' disablePadding>
                <ListItemButton>
                  <ListItemText>
                    <Button
                      elevation={0}
                      variant='contained'
                      color='primary'
                      onClick={placeOrderHandler}
                      disabled={cart.length === 0}
                      sx={{ display: 'block', width: '100%' }}>
                      Place Order
                    </Button>
                    {isLoading && <p>loading...</p>}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PlaceOrderScreen
