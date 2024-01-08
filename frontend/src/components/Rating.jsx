import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarHalfIcon from '@mui/icons-material/StarHalf'

import { Box } from '@mui/material'

const Rating = ({ value, text }) => {
  return (
    <Box>
      <span>
        {value >= 1 ? (
          <StarIcon fontSize='small' color='warning' />
        ) : value >= 0.5 ? (
          <StarHalfIcon fontSize='small' color='warning' />
        ) : (
          <StarBorderIcon fontSize='small' color='warning' />
        )}
      </span>

      <span>
        {value >= 2 ? (
          <StarIcon fontSize='small' color='warning' />
        ) : value >= 1.5 ? (
          <StarHalfIcon fontSize='small' color='warning' />
        ) : (
          <StarBorderIcon fontSize='small' color='warning' />
        )}
      </span>

      <span>
        {value >= 3 ? (
          <StarIcon fontSize='small' color='warning' />
        ) : value >= 2.5 ? (
          <StarHalfIcon fontSize='small' color='warning' />
        ) : (
          <StarBorderIcon fontSize='small' color='warning' />
        )}
      </span>

      <span>
        {value >= 4 ? (
          <StarIcon fontSize='small' color='warning' />
        ) : value >= 3.5 ? (
          <StarHalfIcon fontSize='small' color='warning' />
        ) : (
          <StarBorderIcon fontSize='small' color='warning' />
        )}
      </span>

      <span>
        {value >= 5 ? (
          <StarIcon fontSize='small' color='warning' />
        ) : value >= 4.5 ? (
          <StarHalfIcon fontSize='small' color='warning' />
        ) : (
          <StarBorderIcon fontSize='small' color='warning' />
        )}
      </span>

      <span className='text-nowrap'> {text && text} </span>
    </Box>
  )
}

export default Rating
