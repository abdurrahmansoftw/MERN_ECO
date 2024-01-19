import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const ProductSkeleton = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
				<Skeleton sx={{ bgcolor: 'grey.900' }} />
			</Grid>
		</Grid>
	)
}

export default ProductSkeleton
