import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { useEffect, useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import CustomLink from '../components/CustomLink'
import FromContainer from '../components/FromContainer'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { useRegisterMutation } from '../slices/usersApiSlice'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassowrd] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    } else {
      try {
        const response = await register({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...response }))
        navigate(redirect)
      } catch (error) {
        toast.error(
          error?.data?.message || error?.error || 'Something went wrong!'
        )
      }
    }
  }
  return (
    <FromContainer>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            type='password'
            autoComplete='current-password'
          />
          <TextField
            margin='normal'
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassowrd(e.target.value)}
            label='Confirm Password'
            type='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            disabled={isLoading}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <CustomLink to='/forgotpassword' variant='body2'>
                Forgot password?
              </CustomLink>
            </Grid>
            <Grid item>
              <CustomLink
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                variant='body2'>
                {'Already have an account? Sign In'}
              </CustomLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </FromContainer>
  )
}

export default RegisterScreen
