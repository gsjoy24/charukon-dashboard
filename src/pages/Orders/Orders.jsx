import {
	Box,
	Pagination,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Shared/PageTitle";
import { useGetOrdersQuery } from "../../redux/features/orderApi";
import Customer from "./Customer";
import UpdateOrderStatus from "./UpdateOrderStatus";

const tableHeadings = ["#", "Order ID", "Customer", "Products Details", "Total Price", "Status"];

const Orders = () => {
	// State for pagination and search
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const { data, isFetching } = useGetOrdersQuery({ page, searchTerm });
	const handlePageChange = (_, value) => {
		setPage(value);
	};
	const handleSearchChange = (event) => {
		// set one second delay to avoid multiple API calls
		setTimeout(() => {
			setSearchTerm(event.target.value);
			setPage(1);
		}, 1000);
	};

	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: "320px", sm: "700px", md: "100%", lg: "100%" },
				mx: "auto"
			}}
		>
			<Stack
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: { xs: "column", sm: "row" },
					gap: 2
				}}
			>
				<PageTitle title='Orders' />
				{/* Search Field */}
				<TextField
					sx={{
						maxWidth: "400px"
					}}
					label='Search Orders'
					variant='outlined'
					fullWidth
					onChange={handleSearchChange}
					placeholder='Search by Order ID or Customer Name'
				/>
			</Stack>
			<TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
				{!isFetching ? (
					<Table sx={{ minWidth: 650 }} size='medium' aria-label='a dense table'>
						<TableHead>
							<TableRow>
								{tableHeadings.map((heading) => (
									<TableCell key={heading} align='center' sx={{ fontSize: "20px", fontWeight: "semibold" }}>
										{heading}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{data?.data?.map((order, index) => (
								<TableRow key={order?.order_id}>
									<TableCell align='center'>{index + 1}</TableCell>
									<TableCell align='center'>{order?.order_id}</TableCell>
									<TableCell align='center'>
										<Customer orderData={order} />
									</TableCell>
									<TableCell align='center'>
										{order?.products?.map((product) => (
											<Stack
												justifyContent={"center"}
												alignItems={"center"}
												direction={"row"}
												gap={3}
												sx={{
													borderBottom: "1px solid #ccc",
													width: "fit-content",
													margin: "1rem auto"
												}}
												key={product?.product?._id}
											>
												<Link target='_blank' to={`https://charukon.vercel.app/product/${product?.product?.slug}`}>
													{product?.product?.name || "Product Name"}
												</Link>
												<Typography variant='caption' sx={{ display: "block" }}>
													{product?.quantity || 0} x ৳ {product?.product?.last_price || 0}
												</Typography>
											</Stack>
										))}
									</TableCell>
									<TableCell align='center'>৳ {order?.total_price || 0}</TableCell>
									<TableCell
										align='center'
										sx={{
											maxWidth: "100px"
										}}
									>
										<UpdateOrderStatus id={order?._id} defaultStatus={order?.status} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<Skeleton variant='rectangular' height={200} />
				)}
			</TableContainer>
			{/* Pagination Component */}
			{data?.meta?.totalPages > 1 && (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
					<Pagination count={data.meta.totalPages} page={page} onChange={handlePageChange} color='primary' />
				</Box>
			)}
		</Box>
	);
};

export default Orders;
