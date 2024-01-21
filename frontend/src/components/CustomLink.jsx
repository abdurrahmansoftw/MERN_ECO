import styled from '@emotion/styled'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const CustomLinkStyle = styled(RouterLink)(({ theme }) => ({
	color: theme.palette.primary.main,
	textDecoration: 'none',
	'&:hover': {
		textDecoration: 'underline',
	},
}))

const CustomLink = ({ to, children, ...props }) => {
	return (
		<CustomLinkStyle to={to} {...props}>
			{children}
		</CustomLinkStyle>
	)
}

export default CustomLink
