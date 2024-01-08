/* eslint-disable react/prop-types */
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { name, image, description } = product
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
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size='small' color='primary' variant='text'>
          <AddShoppingCartIcon />
        </Button>
        <Button
          size='small'
          color='primary'
          component={Link}
          to={`/products/${product._id}`}
          variant='contained'>
          Details
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
