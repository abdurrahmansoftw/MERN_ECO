import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [products])

  return (
    <Box sx={{ my: 5 }}>
      <Typography variant='h5' gutterBottom>
        Latest Product List
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HomeScreen
