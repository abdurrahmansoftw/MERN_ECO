import { Box } from '@mui/material'
import Hero from '../layouts/Home/Hero'
import Testimonials from '../layouts/Home/ProductGrid'

const App = () => {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Hero />
      <Testimonials />
    </Box>
  )
}

export default App
