import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

	console.log(product)
	return (
		<Typography variant='h1' sx={{ my: 5, py: 5 }}>
			ProductEditScreen
		</Typography>
	)
}

export default ProductEditScreen
