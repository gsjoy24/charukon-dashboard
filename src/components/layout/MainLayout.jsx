/* eslint-disable no-unused-vars */
import { Dashboard as DashboardIcon, Logout as LogoutIcon } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
	Avatar,
	Chip,
	Divider,
	InputAdornment,
	ListItemIcon,
	Menu,
	MenuItem,
	Stack,
	TextField,
	useMediaQuery
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { fontWeight } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import MobileAppbar from "./MobileAppbar";
import Sidebar from "./Sidebar";

const drawerWidth = 250;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: "hidden"
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: "hidden",
	width: 100,
	[theme.breakpoints.up("sm")]: {
		width: 100
	}
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
	...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	padding: "10px 0",
	boxShadow: "0px 0px 0px -0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0)",
	borderBottom: theme.palette.mode === "dark" ? "1px solid #3f3f3f" : "1px solid #E3E3E3",
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	}),
	backgroundColor: `${theme.palette.mode === "dark" ? "#000000" : "white"}`,
	color: `${theme.palette.mode === "dark" ? "white" : "black"}`
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	zIndex: 999,
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme)
	})
}));

const MainLayout = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const isMiddleScreen = useMediaQuery(theme.breakpoints.up("md"));
	const [open, setOpen] = React.useState(true);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{isLargeScreen || isMiddleScreen ? (
				<>
					<AppBar position='fixed' open={open} sx={{ background: "#fff", paddingRight: 0 }}>
						<Toolbar>
							<IconButton
								color='inherit'
								aria-label='open drawer'
								onClick={handleDrawerOpen}
								edge='start'
								sx={{
									marginRight: 5,
									...(open && { display: "none" })
								}}
							>
								<MenuIcon sx={{ fontSize: 30, ml: 2 }} />
							</IconButton>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
									pl: 5
								}}
							>
								<Box>
									<Typography variant='h5'>Welcome!</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "flex-end",
										gap: 2
									}}
								>
									<MenuItem onClick={handleLogout}>
										<LogoutIcon sx={{ fontSize: 20, mr: "7px" }} />
										Logout
									</MenuItem>
								</Box>
							</Box>
						</Toolbar>
					</AppBar>
					<Drawer variant='permanent' open={open}>
						<DrawerHeader
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "20px 30px"
							}}
						>
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
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === "rtl" ? <MenuIcon /> : <MenuIcon sx={{ fontSize: 30 }} />}
							</IconButton>
						</DrawerHeader>
						<Sidebar open={open} />
					</Drawer>
				</>
			) : (
				<MobileAppbar />
			)}

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: {
						xs: 2,
						sm: 3
					}
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default MainLayout;
