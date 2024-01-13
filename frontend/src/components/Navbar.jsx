/* eslint-disable react/jsx-no-duplicate-props */
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import Fade from '@mui/material/Fade'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/usersApiSlice'

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' elevation={1}>
        <Toolbar>
          <Typography
            variant='h6'
            component={Link}
            hrf={'/'}
            sx={{ flexGrow: 1 }}>
            Kingsman
          </Typography>
          <Button color='inherit' component={Link} to='/cart'>
            {cartItems.length === 0 ? (
              <Box>
                <ShoppingCartIcon /> Cart
              </Box>
            ) : (
              <Box>
                <Badge
                  sx={{ mr: 1 }}
                  badgeContent={cartItems.reduce((a, c) => a + c.qty, 0)}
                  color='success'>
                  <ShoppingCartIcon fontSize='small' />
                </Badge>
                Cart
              </Box>
            )}
          </Button>

          {userInfo ? (
            <div>
              <Button
                color='inherit'
                id='fade-button'
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <AccountCircleIcon fontSize='small' />{' '}
                {userInfo.isAdmin === true ? 'Admin' : 'Account'}
              </Button>
              <Menu
                id='fade-menu'
                MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>{userInfo.name}</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose} onClick={logoutHandler}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
