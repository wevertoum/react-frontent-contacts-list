import {
	Contacts as ContactsIcon,
	People as PeopleIcon,
} from "@mui/icons-material";
import {
	AppBar,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router";

const drawerWidth = 240;

export default function ContactsManagementLayout() {
	const navItems = [
		{ text: "Listar Usuários", path: "list-users", icon: <PeopleIcon /> },
		{ text: "Listar Contatos", path: "list-contacts", icon: <ContactsIcon /> },
	];

	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Gerenciador
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						backgroundColor: "#f9f9f9",
						borderRight: "1px solid #e0e0e0",
					},
				}}
			>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							p: 1,
						}}
					>
						<img
							src="/images/docnix.png"
							alt="Docnix Logo"
							style={{ maxHeight: 40, width: "auto" }}
						/>
					</Box>
				</Toolbar>
				<Box sx={{ overflow: "auto" }}>
					<List>
						{navItems.map((item) => (
							<ListItem key={item.text} disablePadding>
								<ListItemButton
									component={NavLink}
									to={item.path}
									sx={{
										"&.active": {
											backgroundColor: "rgba(0, 0, 0, 0.08)",
											borderLeft: "4px solid",
											borderColor: "primary.main",
										},
									}}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
}
