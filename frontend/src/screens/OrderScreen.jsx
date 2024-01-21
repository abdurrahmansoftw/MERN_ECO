import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice'

const OrderScreen = () => {
	const { id: orderId } = useParams()
	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId)
	console.log({ order, isLoading, error })
	return <div>OrderScreen</div>
}

export default OrderScreen
