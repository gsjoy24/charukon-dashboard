import CloseIcon from "@mui/icons-material/Close";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NavLinks from "../../constant";

const MobileSidebar = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Drawer anchor='left' open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: "80vw" } }}>
				<Box sx={{ display: "flex", justifyContent: "space-around", p: 1 }}>
					<Typography
						component={Link}
						to='/'
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: "8px",
							textDecoration: "none",
							fontSize: "2rem",
							fontWeight: "bold"
						}}
					>
						KK
					</Typography>
					<IconButton onClick={() => setOpen(false)}>
						<CloseIcon />
					</IconButton>
				</Box>
				<List>
					{NavLinks.map((link) => (
						<ListItem key={link.title} disablePadding onClick={() => setOpen(false)}>
							<ListItemButton
								component={NavLink}
								to={link.link}
								sx={{
									minHeight: 54,
									justifyContent: "initial",
									px: 4,
									display: "flex",
									"&:hover": {
										bgcolor: "#f1f1f1"
									}
								}}
							>
								<ListItemIcon>{link.icon}</ListItemIcon>
								<ListItemText primary={link.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>

			<IconButton onClick={() => setOpen((prevState) => !prevState)}>
				<MenuRoundedIcon fontSize='large' />
			</IconButton>
		</>
	);
};

export default MobileSidebar;
