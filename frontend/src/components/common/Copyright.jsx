import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' mt={1}>
      {'Copyright © '}
      <Link href='https://mui.com/'>Sitemark&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  )
}
