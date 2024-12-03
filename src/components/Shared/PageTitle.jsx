import { Typography } from "@mui/material";

const PageTitle = ({ title }) => {
	return (
		<Typography
			sx={{
				fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },
				fontWeight: "semibold"
			}}
			variant='h4'
		>
			{title}
		</Typography>
	);
};

export default PageTitle;
