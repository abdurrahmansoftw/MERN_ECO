import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice'

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

	console.log(product)
	return (
		<Typography variant='h1' sx={{ my: 5, py: 5 }}>
			ProductEditScreen
		</Typography>
	)
}

export default ProductEditScreen
