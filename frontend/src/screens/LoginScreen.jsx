import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { useState } from 'react'

import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import FromContainer from '../components/FromContainer'
import CustomLink from '../components/Link'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <FromContainer>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <CustomLink to='/forgotpassword' variant='body2'>
                Forgot password?
              </CustomLink>
            </Grid>
            <Grid item>
              <CustomLink to='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </CustomLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </FromContainer>
  )
}

export default LoginScreen
