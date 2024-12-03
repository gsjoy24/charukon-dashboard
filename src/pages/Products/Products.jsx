import {
	Box,
	Button,
	IconButton,
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
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import PageTitle from "../../components/Shared/PageTitle";
import { useGetProductsQuery } from "../../redux/features/productApi";

const Products = () => {
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

	const { data, isFetching } = useGetProductsQuery({
		page,
		searchTerm: debouncedSearchTerm
	});

	const tableHeadings = ["#", "Name", "Stock", "Price", "Actions"];

	const handlePageChange = (_, value) => setPage(value);

	return (
		<Box sx={{ mt: 10, mx: "auto", width: { xs: "95%", md: "100%" } }}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' flexWrap='wrap' gap={2}>
				<PageTitle title='Products' />
				<TextField
					label='Search Products'
					variant='outlined'
					placeholder='Search by Product Name'
					fullWidth
					sx={{ maxWidth: "400px" }}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button component={Link} to='/add-product' variant='contained'>
					Add Product
				</Button>
			</Stack>

			<TableContainer component={Paper} sx={{ my: 3, borderRadius: 1 }}>
				{isFetching ? (
					<Table>
						<TableHead>
							<TableRow>
								{tableHeadings.map((heading) => (
									<TableCell key={heading} align='center'>
										{heading}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{[...Array(10)].map((_, index) => (
								<TableRow key={index}>
									{[...Array(tableHeadings.length)].map((_, i) => (
										<TableCell key={i} align='center'>
											<Skeleton variant='text' />
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<Table>
						<TableHead>
							<TableRow>
								{tableHeadings.map((heading) => (
									<TableCell key={heading} align='center'>
										{heading}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.data?.length > 0 ? (
								data?.data?.map((product, index) => (
									<TableRow key={product._id}>
										<TableCell align='center'>{index + 1 + (page - 1) * data?.meta?.limit}</TableCell>
										<TableCell align='center'>{product?.name}</TableCell>
										<TableCell align='center'>{product?.stock}</TableCell>
										<TableCell align='center'>৳{product?.last_price}</TableCell>
										<TableCell align='center'>
											<IconButton component={Link} to={`/update-product?id=${product._id}`} aria-label='Edit product'>
												<FaRegPenToSquare />
											</IconButton>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} align='center'>
										<Typography>No products found.</Typography>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				)}
			</TableContainer>

			{data?.meta?.totalPages > 1 && (
				<Box display='flex' justifyContent='center' sx={{ my: 3 }}>
					<Pagination
						count={data?.meta?.totalPages}
						page={page}
						onChange={handlePageChange}
						color='primary'
						size='large'
					/>
				</Box>
			)}
		</Box>
	);
};

export default Products;
