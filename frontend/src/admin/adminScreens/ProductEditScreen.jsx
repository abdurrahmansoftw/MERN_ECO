import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomLink from '../../components/CustomLink'
import FromContainer from '../../components/FromContainer'
import {
	useGetProductDetailsQuery,
	useUpdateProductMutation,
} from '../../slices/productsApiSlice'

const ProductEditScreen = () => {
	const { id: productId } = useParams()

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState('')

	const {
		data: product,
		isLoading,
		error,
		refetch,
	} = useGetProductDetailsQuery(productId)

	const [updateProduct, { isLoading: updateLoading }] =
		useUpdateProductMutation()

	const navigate = useNavigate()

	useEffect(() => {
		if (product) {
			setName(product.name)
			setPrice(product.price)
			setImage(product.image)
			setBrand(product.brand)
			setCategory(product.category)
			setCountInStock(product.countInStock)
			setDescription(product.description)
		}
	}, [product])

	const updateHandleSubmit = async (event) => {
		event.preventDefault()

		const updatedProduct = {
			productId,
			name,
			price,
			image,
			brand,
			category,
			countInStock,
			description,
		}
		const result = await updateProduct(updatedProduct).unwrap()
		if (result.error) {
			toast.error(result.error)
		} else {
			toast.success('Product Updated')
			navigate('/admin/productlist')
		}
	}
	return (
		<React.Fragment>
			<Button component={Link} to='/admin/productlist'>
				Go Back
			</Button>
			<FromContainer>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<EditIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Edit Product
					</Typography>
					<Box
						component='form'
						onSubmit={updateHandleSubmit}
						noValidate
						sx={{ mt: 1 }}
						autoComplete='off'
					>
						<TextField
							margin='normal'
							required
							fullWidth
							id='name'
							label='name'
							name='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoComplete='name'
							autoFocus
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							id='price'
							label='price'
							name='price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							autoComplete='price'
							autoFocus
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							id='image'
							label='image'
							name='image'
							value={image}
							onChange={(e) => setImage(e.target.value)}
							autoComplete='image'
							autoFocus
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							id='brand'
							label='brand'
							name='brand'
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
							autoComplete='brand'
							autoFocus
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							id='category'
							label='category'
							name='category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							autoComplete='category'
							autoFocus
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							id='countInStock'
							label='countInStock'
							name='countInStock'
							value={countInStock}
							onChange={(e) => setCountInStock(e.target.value)}
							autoComplete='countInStock'
							autoFocus
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 3 }}
							disabled={isLoading}
						>
							{updateLoading ? 'Loading...' : 'Update Product'}
						</Button>

						{isLoading && (
							<Typography component='h1' variant='h5'>
								Loading...
							</Typography>
						)}

						<Grid container>
							<Grid item xs>
								<CustomLink to='/forgotpassword' variant='body2'>
									Forgot password?
								</CustomLink>
							</Grid>
							<Grid item>
								<CustomLink
									to={redirect ? `/register?redirect=${redirect}` : '/register'}
									variant='body2'
								>
									{"Don't have an account? Sign Up"}
								</CustomLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</FromContainer>
		</React.Fragment>
	)
}

export default ProductEditScreen
