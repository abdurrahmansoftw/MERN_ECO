import React, { useEffect, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import CustomLink from '../../components/CustomLink'
import FromContainer from '../../components/FromContainer'
import {
	useGetProductDetailsQuery,
	useUpdateProductMutation,
} from '../../slices/productsApiSlice'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'

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

		try {
			await updateProduct({
				productId,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			}).unwrap()
			refetch()
			navigate('/admin/productlist')
		} catch (error) {
			console.log(error)
		}
	}

	console.log(product)
	return (
		<React.Fragment>
			<Button LinkComponent={CustomLink} to='/admin/productlist'>
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
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
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
