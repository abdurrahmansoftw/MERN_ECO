import { Container, Grid, Typography } from '@mui/material'
import ProductCard from '../components/ProductCard'
import products from '../products'

const HomeScreen = () => {
  return (
    <Container>
      <Typography variant='h4' component='div' gutterBottom>
        My Product Grid
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HomeScreen
