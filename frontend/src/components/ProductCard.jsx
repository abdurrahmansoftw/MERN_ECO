import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {product.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          {product.price}
        </Button>
        <Button size='small' color='primary'>
          {product.category}
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
