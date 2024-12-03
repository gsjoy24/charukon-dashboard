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
import { useDebounce } from "use-debounce";
import PageTitle from "../../components/Shared/PageTitle";
import { useGetOrdersQuery } from "../../redux/features/orderApi";
import Customer from "./Customer";
import UpdateOrderStatus from "./UpdateOrderStatus";

const tableHeadings = ["#", "Order ID", "Customer", "Products", "Total Price", "Status"];

const Orders = () => {
	// States for page, search term, and debounced search term
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

	// Fetching orders with pagination and search
	const { data, isFetching } = useGetOrdersQuery({ page, searchTerm: debouncedSearchTerm });

	// Handlers for pagination and search input
	const handlePageChange = (_, value) => setPage(value);
	const handleSearchChange = (event) => setSearchTerm(event.target.value);

	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: "320px", sm: "700px", md: "100%" },
				mx: "auto"
			}}
		>
			{/* Header Section */}
			<Stack
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: { xs: "column", sm: "row" },
					gap: 2,
					mb: 3
				}}
			>
				<PageTitle title='Orders' />
				<TextField
					label='Search Orders'
					variant='outlined'
					fullWidth
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder='Search by Order ID or Customer Name'
					sx={{ maxWidth: 400 }}
				/>
			</Stack>

			{/* Table Container */}
			<TableContainer component={Paper} sx={{ my: 3, borderRadius: 1 }}>
				<Table sx={{ minWidth: 650 }} aria-label='orders table' size='medium'>
					<TableHead>
						<TableRow>
							{tableHeadings.map((heading) => (
								<TableCell key={heading} align='center' sx={{ fontSize: "16px" }}>
									{heading}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{isFetching ? (
							[...Array(5)].map((_, index) => (
								<TableRow key={index}>
									{[...Array(6)].map((_, i) => (
										<TableCell key={i}>
											<Skeleton variant='rectangular' height={30} />
										</TableCell>
									))}
								</TableRow>
							))
						) : data?.data?.length > 0 ? (
							data?.data?.map((order, index) => (
								<TableRow key={order?.order_id}>
									<TableCell align='center'>{index + 1 + (page - 1) * data?.meta?.limit}</TableCell>
									<TableCell align='center'>{order?.order_id}</TableCell>
									<TableCell align='center'>
										<Customer orderData={order} />
									</TableCell>
									<TableCell align='center'>
										{order?.products?.map((product) => (
											<Typography key={product?.product?._id} variant='body2'>
												{product?.quantity} x {product?.product?.name}
											</Typography>
										))}
									</TableCell>
									<TableCell align='center'>৳ {order?.total_price || 0}</TableCell>
									<TableCell align='center'>
										<UpdateOrderStatus id={order?._id} defaultStatus={order?.status} />
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6} align='center'>
									<Typography>No orders found</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			{data?.meta?.totalPages > 1 && (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
					<Pagination count={data?.meta?.totalPages} page={page} onChange={handlePageChange} color='primary' />
				</Box>
			)}
		</Box>
	);
};

export default Orders;
