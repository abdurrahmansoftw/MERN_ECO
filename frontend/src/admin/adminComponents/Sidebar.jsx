import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from '@mui/material'
import React from 'react'

import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ListItemButton from '@mui/material/ListItemButton'

const drawerWidth = 240

const Sidebar = () => {
	return (
		<Drawer
			variant='permanent'
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
		>
			<Toolbar />
			<Box sx={{ overflow: 'auto' }}>
				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
			</Box>
		</Drawer>
	)
}

export default Sidebar
