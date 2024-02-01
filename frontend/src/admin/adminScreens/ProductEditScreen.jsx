import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SyncIcon from '@mui/icons-material/Sync'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FromContainer from '../../components/FromContainer'
import {
	useGetProductDetailsQuery,
	useUpdateProductMutation,
	useUploadProductImageMutation,
} from '../../slices/productsApiSlice'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
})

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

	const [uploadProductImage, { isLoading: loadingUpload }] =
		useUploadProductImageMutation()

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
		refetch()
		if (result.error) {
			toast.error(result.error)
		} else {
			toast.success('Product Updated')
			navigate('/admin/productlist')
		}
	}

	const uploadFileHandler = async (e) => {
		const formData = new FormData()
		formData.append('image', e.target.files[0])
		try {
			const res = await uploadProductImage(formData).unwrap()
			toast.success(res.message)
			setImage(res.image)
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
	}

	return (
		<React.Fragment>
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
						<SyncIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Update Product
					</Typography>

					{error && <Typography variant='h6'>{error}</Typography>}
					{isLoading && <Typography variant='h6'>Loading...</Typography>}
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

						<div>
							<TextField
								margin='normal'
								required
								fullWidth
								id='image'
								label='Image URL'
								name='image'
								value={image}
								onChange={(e) => setImage(e.target.value)}
								autoComplete='image'
								autoFocus
							/>
							<Button
								component='label'
								variant='contained'
								startIcon={<CloudUploadIcon />}
								disabled={loadingUpload}
							>
								Upload file
								<VisuallyHiddenInput type='file' onClick={uploadFileHandler} />
							</Button>
						</div>

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
							<UploadFileIcon />{' '}
							{updateLoading ? 'Loading...' : 'Update Product'}
						</Button>

						{isLoading && (
							<Typography component='h1' variant='h5'>
								Loading...
							</Typography>
						)}
					</Box>
				</Box>
			</FromContainer>
		</React.Fragment>
	)
}

export default ProductEditScreen
