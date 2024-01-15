import { Container, CssBaseline } from '@mui/material'
import React from 'react'

const FromContainer = ({ children }) => {
	return (
		<Container component='main' maxWidth='sm'>
			<CssBaseline />
			{children}
		</Container>
	)
}

export default FromContainer
