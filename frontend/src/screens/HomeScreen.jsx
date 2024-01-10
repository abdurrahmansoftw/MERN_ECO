import { Box, Grid, Typography } from '@mui/material'
import ProductSkeleton from '../Skeleton/ProductSkeleton'
import ProductCard from '../components/ProductCard'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return (
    <Box sx={{ my: 5 }}>
      {isLoading ? (
        <ProductSkeleton />
      ) : error ? (
        <Typography variant='body1'>{error.data.message || error.error}</Typography>
      ) : (
        <Box>
          <Typography variant='h5' gutterBottom>
            Latest Product List
          </Typography>
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={4} xl={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default HomeScreen
