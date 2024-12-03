import { Card, CardContent, Grid, Typography } from "@mui/material";

const StatCard = ({ title, value, bgColor, color }) => (
	<Grid item xs={12} sm={6} md={2.4}>
		<Card sx={{ backgroundColor: bgColor, borderRadius: 3 }}>
			<CardContent>
				<Typography variant='h6' sx={{ fontWeight: "bold" }}>
					{title}
				</Typography>
				<Typography variant='h3' sx={{ color, fontWeight: "bold" }}>
					{value}
				</Typography>
			</CardContent>
		</Card>
	</Grid>
);
export default StatCard;
