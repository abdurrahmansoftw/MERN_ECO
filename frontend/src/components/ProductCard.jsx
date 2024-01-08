import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia
        image={product.name} // Replace with the actual image source
        title={product.name}
      />
      <CardContent>
        <Typography variant='h6' component='div'>
          {product.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.description}
        </Typography>

        <Box>
          <Button variant='contained' color='primary'>
            Add to Cart
          </Button>
          <Button variant='outlined' color='primary'>
            Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductCard
