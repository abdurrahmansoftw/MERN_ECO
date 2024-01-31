import {
	Alert,
	Box,
	Button,
	CardMedia,
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
						my: 2,
					}}
				>
					<Typography variant='h4'>Product List</Typography>
					<Button variant='outlined'>Create New Product</Button>
				</Box>
			)}

			<TableContainer component={Paper} elevation={5}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>NAME</TableCell>
							<TableCell>Image</TableCell>
							<TableCell>PRICE</TableCell>
							<TableCell>CATEGORY</TableCell>
							<TableCell>BRAND</TableCell>

							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products?.map((product) => (
							<TableRow
								key={product._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell>{product.name}</TableCell>
								<TableCell>
									<CardMedia
										component='img'
										image={product.image}
										alt={product.name}
										sx={{ width: 40 }}
									/>
								</TableCell>
								<TableCell>${product.price}</TableCell>
								<TableCell>{product.category}</TableCell>
								<TableCell>{product.brand}</TableCell>
								<TableCell
									sx={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<Button variant='outlined'>Edit</Button>
									<Button variant='outlined'>Delete</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default ProductListScreen
