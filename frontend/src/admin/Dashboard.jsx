import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Dashboard = () => {
	return (
		<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
			<Toolbar />

			<Typography paragraph>Dashboard</Typography>
		</Box>
	)
}

export default Dashboard
