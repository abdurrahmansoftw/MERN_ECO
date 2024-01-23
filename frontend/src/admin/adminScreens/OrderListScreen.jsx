import VisibilityIcon from '@mui/icons-material/Visibility'
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
import CustomLink from '../../components/CustomLink'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'

const OrderListScreen = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery()

	const orderViewHandler = () => {
		console.log('View Order')
	}

	return (
		<Box component='main' sx={{ flexGrow: 1, my: 5, py: 5 }}>
			{isLoading ? (
				<Typography>Loading...</Typography>
			) : error ? (
				<Alert severity='warning'>{error}</Alert>
			) : (
				<Typography variant='h4'>Order List</Typography>
			)}

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
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
						{orders?.map((order) => (
							<TableRow
								key={order._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell>{order.user.name}</TableCell>
								<TableCell>{order.createdAt.substring(0, 10)}</TableCell>
								<TableCell>${order.totalPrice}</TableCell>
								<TableCell>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<Alert severity='warning'>Not Paid</Alert>
									)}
								</TableCell>
								<TableCell>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<Alert severity='warning'>Not Delivered</Alert>
									)}
								</TableCell>
								<TableCell>
									<Button
										variant='outlined'
										color='primary'
										size='small'
										component={CustomLink}
										to={`/order/${order._id}`}
									>
										<VisibilityIcon />
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

export default OrderListScreen
