import { Link as MuiLink } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const CustomLink = ({ to, children }) => {
	return (
		<RouterLink to={to} passHref LegacyBehavior>
			<MuiLink>{children}</MuiLink>
		</RouterLink>
	)
}

export default CustomLink
