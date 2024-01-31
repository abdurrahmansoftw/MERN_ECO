import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
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
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
	useCreateProductMutation,
	useGetProductsQuery,
} from '../../slices/productsApiSlice'

const ProductListScreen = () => {
	const { data: products, isLoading, error, refetch } = useGetProductsQuery()
	const [createProduct, { isLoading: loadingCreate }] =
		useCreateProductMutation()

	const createProductHandler = async () => {
		if (window.confirm('Are you sure? to create a new product')) {
			try {
				await createProduct()
				refetch()
			} catch (error) {
				toast.error(error?.data?.message || error.message)
			}
		}
	}

	const deleteHandler = (id) => {
		console.log(id)
	}
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
					<Button variant='outlined' onClick={createProductHandler}>
						Create New Product
					</Button>
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
									<Button
										component={Link}
										to={`/admin/product/${product._id}`}
										variant='outlined'
										color='success'
									>
										{<CreateIcon />}
									</Button>
									<Button
										onClick={() => deleteHandler(product._id)}
										variant='outlined'
										color='warning'
									>
										{<DeleteIcon />}
									</Button>
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
