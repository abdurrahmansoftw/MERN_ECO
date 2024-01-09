import { Box, Grid, Typography } from '@mui/material'
import ProductCard from '../components/ProductCard'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery()

  return (
    <Box sx={{ my: 5 }}>
      <Typography variant='h5' gutterBottom>
        Latest Product List
      </Typography>

      {isLoading && <Typography variant='h5'>Loading...</Typography>}
      {isError && (
        <Typography variant='h5'> {isError.data.message} </Typography>
      )}

      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4} xl={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HomeScreen
