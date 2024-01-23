import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

const navItems = ['Order List', 'Product List', 'User List']

const Header = () => {
	return (
		<AppBar component='nav'>
			<Toolbar>
				<Typography
					variant='h6'
					component='div'
					sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
				>
					Admin Panel
				</Typography>
				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					{navItems.map((item) => (
						<Button key={item} sx={{ color: '#fff' }}>
							{item}
						</Button>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
