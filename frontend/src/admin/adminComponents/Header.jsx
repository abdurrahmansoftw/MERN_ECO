import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<AppBar component='nav'>
			<Toolbar>
				<Typography
					variant='h6'
					component={Link}
					to='/dashboard'
					sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
				>
					Admin Panel
				</Typography>
				<Button color='inherit' component={Link} to='admin/userlist'>
					User List
				</Button>
				<Button color='inherit' component={Link} to='admin/orderlist'>
					Order List
				</Button>
				<Button color='inherit' component={Link} to='admin/productlist'>
					Product List
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Header
