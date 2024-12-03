import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import NavLinks from "../../constant";

const Sidebar = ({ open }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<List sx={{ flexGrow: 1 }}>
				{NavLinks.map((link) => (
					<ListItem
						key={link.title}
						disablePadding
						sx={{
							display: "block",
							"&:hover": {
								bgcolor: "#f1f1f1"
							}
						}}
					>
						<ListItemButton
							component={NavLink}
							to={link.link}
							sx={{
								minHeight: 54,
								justifyContent: "initial",
								px: 4,
								display: "flex",
								"&.active": {
									bgcolor: "#4E91FD",
									color: "#fff"
								}
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: 3,
									justifyContent: "center",
									fontSize: 30,
									color: "inherit"
								}}
							>
								{link.icon}
							</ListItemIcon>
							{open && <ListItemText primary={link.title} sx={{ opacity: 1 }} />}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Sidebar;
