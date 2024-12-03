import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Card, CardContent, IconButton, Link, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { selectCurrentUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const [showPass, setShowPass] = useState(false);
	const { control, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const [login] = useLoginMutation();

	const handleLogoClick = () => {
		if (user) {
			navigate("/");
		} else {
			navigate("/login");
		}
	};

	const onSubmit = async (data) => {
		const toastId = toast.loading("Logging in...");

		try {
			const res = await login(data).unwrap();
			const user = verifyToken(res.data.accessToken);
			dispatch(setUser({ user, token: res.data.accessToken }));
			if (res?.success === true) {
				toast.success("Logged in successfully", { id: toastId, duration: 2000 });
				navigate(`/`);
			}
		} catch (error) {
			toast.error("Failed to login", {
				id: toastId,
				duration: 2000
			});
		}
	};

	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			minHeight='100vh'
			padding={2}
		>
			<Card sx={{ width: { lg: 450, md: 450 }, boxShadow: 3, padding: 3 }}>
				<CardContent>
					<Link
						onClick={handleLogoClick}
						style={{ cursor: "pointer", textDecoration: "none", display: "flex", justifyContent: "center" }}
					>
						<Typography variant='h4' color='primary' gutterBottom>
							Charukon Dashboard
						</Typography>
					</Link>
					<Typography variant='h5' textAlign='center' gutterBottom>
						Login
					</Typography>
					<Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={2}>
						<Controller
							name='email'
							control={control}
							defaultValue=''
							render={({ field }) => <TextField {...field} label='Email' type='email' fullWidth required />}
						/>
						<Controller
							name='password'
							control={control}
							defaultValue=''
							render={({ field }) => (
								<Stack
									sx={{
										position: "relative"
									}}
								>
									<TextField {...field} label='Password' type={showPass ? "text" : "password"} fullWidth required />
									<IconButton
										onClick={() => setShowPass(!showPass)}
										sx={{
											position: "absolute",
											top: "0.5rem",
											right: 10
										}}
									>
										{showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</Stack>
							)}
						/>
						<Button type='submit' variant='contained' color='primary' fullWidth>
							Login
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Login;
