import { Logout as LogoutIcon } from "@mui/icons-material";
import { AppBar, Box, Container, MenuItem, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice.js";
import MobileSidebar from "./MobileSidebar.jsx";

const MobileAppbar = () => {
	const appBarZIndex = 1200;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<>
			<AppBar
				elevation={1}
				sx={{
					background: "#fff",
					borderBottom: `1px solid #e3e3e3`,
					py: { xs: 0.5, md: 1 },
					zIndex: appBarZIndex
				}}
				position='fixed'
			>
				<Container>
					<Toolbar
						sx={{
							height: { xs: "50px", md: "100px" },
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							px: "0 !important"
						}}
					>
						<Box>
							<MobileSidebar />
						</Box>
						<Box>
							<MenuItem onClick={handleLogout} sx={{ color: "#000" }}>
								<LogoutIcon sx={{ fontSize: 20, mr: "7px" }} /> Logout
							</MenuItem>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};

export default MobileAppbar;
