import {
	Alert,
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import React from 'react'
import { useGetProductsQuery } from '../../slices/productsApiSlice'

const ProductListScreen = () => {
	const { data: products, isLoading, error } = useGetProductsQuery()
	return (
		<Box component='main' sx={{ flexGrow: 1, my: 5, py: 5 }}>
			{isLoading ? (
				<Typography>Loading...</Typography>
			) : error ? (
				<Alert severity='warning'>{error}</Alert>
			) : (
				<Box
					component='main'
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						flexGrow: 1,
						my: 5,
						py: 5,
					}}
				>
					<Typography variant='h4'>Order List</Typography>
					<Button variant='outlined'>Create New Product</Button>
				</Box>
			)}

			<TableContainer component={Paper} elevation={5}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>User</TableCell>
							<TableCell>DATE</TableCell>
							<TableCell>TOTAL</TableCell>
							<TableCell>PAID</TableCell>
							<TableCell>DELIVERED</TableCell>
							<TableCell>Details</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>order.user.name</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default ProductListScreen
