import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { Box, CssBaseline } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'
import Navbar from '../components/common/Navbar'
import getLPTheme from '../theme/theme'

const defaultTheme = createTheme({})

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color='primary'
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label='Platform'
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
}

const Layout = () => {
  const [mode, setMode] = useState('dark')
  const [showCustomTheme, setShowCustomTheme] = useState(true)
  const LPtheme = createTheme(getLPTheme(mode))

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev)
  }
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />

      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      <Box>
        <Outlet />
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
