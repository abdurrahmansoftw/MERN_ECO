import {
  Button,
  CardMedia,
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
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { addToCart } from '../slices/cartSlice'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'

const ProductScreen = () => {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId)

  const addTocardHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.status}</div>

  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <CardMedia
            sx={{ height: 400 }}
            image={product.image}
            title={product.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper aria-label='main mailbox folders' elevation={0}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>
                    <Typography variant='h5' component='h1'>
                      {product.name}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={product.description} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={product.brand} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={product.category} />
                </ListItemButton>
              </ListItem>

              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
          <Divider />
        </Grid>
        <Grid item xs={12} md={3}>
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
                  <ListItemText> ${product.price}</ListItemText>
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
                  <ListItemText>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            {product.countInStock > 0 && (
              <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Qty' />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText>
                      <FormControl fullWidth size='small' variant='standard'>
                        <Select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            )}

            <Button
              onClick={addTocardHandler}
              elevation={0}
              disabled={product.countInStock === 0}
              variant='contained'
              color='info'
              sx={{ display: 'block', width: '100%' }}>
              Add to Cart
            </Button>
          </Paper>
          <Divider />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductScreen
