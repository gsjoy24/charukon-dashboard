import { Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { useGetDashboardQuery } from "../../redux/features/dashboardApi";
import StatCard from "./StatCard";

const DashboardManagement = () => {
	const { data, isFetching } = useGetDashboardQuery({});

	const mainData = data?.data || {};
	return isFetching ? (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "90vh"
			}}
		>
			<CircularProgress />
		</Box>
	) : (
		<Box sx={{ padding: "2rem", mt: 10 }}>
			{/* Dashboard Header */}
			<Typography variant='h4' gutterBottom sx={{ fontWeight: "bold", marginBottom: "2rem" }}>
				Dashboard
			</Typography>

			{/* Grid Container for Cards */}
			<Grid container spacing={3}>
				<StatCard title='Total Users' value={mainData?.totalUsers || 0} bgColor='#f0f4ff' color='#1a73e8' />
				<StatCard title='Total Products' value={mainData?.totalProducts || 0} bgColor='#ffedcc' color='#ff8c00' />
				<StatCard title='Total Categories' value={mainData?.totalCategories || 0} bgColor='#ffe0e0' color='#d93025' />
				<StatCard
					title='Total Sub-Categories'
					value={mainData?.totalSubCategories || 0}
					bgColor='#e1e0ff'
					color='#5e35b1'
				/>

				{/* Orders Status Breakdown */}
				{mainData?.totalOrders && (
					<Grid item xs={12}>
						<Card sx={{ borderRadius: 3, backgroundColor: "#e8f0fe" }}>
							<CardContent>
								<Typography variant='h6' sx={{ fontWeight: "bold" }}>
									Orders Status
								</Typography>
								<Grid container spacing={2} sx={{ marginTop: "1rem" }}>
									{Object.entries(mainData?.totalOrders).map(
										([key, value]) =>
											key !== "total" && (
												<Grid item xs={5} md={4} key={key}>
													<Typography variant='subtitle1' sx={{ textTransform: "capitalize" }}>
														{key}
													</Typography>
													<Typography variant='h5' sx={{ fontWeight: "bold", color: "#1a73e8" }}>
														{value}
													</Typography>
												</Grid>
											)
									)}
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default DashboardManagement;
