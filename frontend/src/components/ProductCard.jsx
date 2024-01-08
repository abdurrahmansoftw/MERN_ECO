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
  const { name, image, description, rating, numReviews } = product
  return (
    <Card>
      <CardActionArea>
        <CardMedia component='img' height='200' image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Button size='small' color='primary'>
            {rating}
          </Button>
          <Button size='small' color='primary'>
            {numReviews}
          </Button>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size='small' color='primary' variant='contained'>
          Add to Cart
        </Button>
        <Button size='small' color='primary' variant='contained'>
          Details
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
