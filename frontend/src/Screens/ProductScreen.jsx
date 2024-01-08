import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = () => {
  const { id: productId } = useParams()
  const product = products.find((p) => p._id === productId)

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
          <Box sx={{}}>
            <Paper aria-label='main mailbox folders'>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={product.name} />
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
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper aria-label='main mailbox folders'>
            <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Price' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={product.price} />
                </ListItemButton>
              </ListItem>
            </List>
            <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Status' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={
                      product.countInStock > 0 ? 'In Stock' : 'Out of Stock'
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Button
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
