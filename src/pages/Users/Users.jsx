import {
	Box,
	Chip,
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
import { useDebounce } from "use-debounce"; // Import debounce hook
import PageTitle from "../../components/Shared/PageTitle";
import { useGetUserQuery } from "../../redux/features/userApi";
import ChangeUserStatus from "./ChangeUserStatus";

const Users = () => {
	const tableHeadings = ["#", "Name", "Email", "Phone", "Status", "Created At", "Actions"];
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
	const { data, isFetching, error } = useGetUserQuery({
		page,
		searchTerm: debouncedSearchTerm
	});

	const handlePageChange = (_, value) => {
		setPage(value);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
		setPage(1);
	};

	return (
		<Box
			sx={{
				mt: 10,
				width: { xs: "320px", sm: "700px", md: "100%" },
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
				<PageTitle title='Users' />
				<TextField
					sx={{
						maxWidth: "400px"
					}}
					label='Search Users'
					variant='outlined'
					fullWidth
					onChange={handleSearchChange}
					value={searchTerm}
					placeholder='Search by name or email'
				/>
			</Stack>

			<TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
				<Table sx={{ minWidth: 650 }} size='medium' aria-label='User Management Table'>
					<TableHead>
						<TableRow>
							{tableHeadings.map((heading) => (
								<TableCell key={heading} align='center' sx={{ fontSize: "16px", fontWeight: "bold" }}>
									{heading}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					{isFetching ? (
						<TableBody>
							{[...Array(10)].map((_, index) => (
								<TableRow key={index}>
									{[...Array(7)].map((_, index) => (
										<TableCell key={index} align='center'>
											<Skeleton variant='text' width='80%' height={30} />
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					) : error ? (
						<TableBody>
							<TableRow>
								<TableCell colSpan={tableHeadings.length} align='center' sx={{ color: "red" }}>
									<Typography variant='body1'>Error loading users. Please try again later.</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					) : (
						<TableBody>
							{data?.data?.length > 0 ? (
								data.data.map((user, index) => (
									<TableRow key={user?._id}>
										<TableCell align='center'>{index + 1}</TableCell>
										<TableCell align='center'>{user?.full_name}</TableCell>
										<TableCell align='center'>{user?.email}</TableCell>
										<TableCell align='center'>{user?.mobile_number || "N/A"}</TableCell>
										<TableCell align='center'>
											<Chip label={user?.status} color={user?.status === "active" ? "success" : "error"} />
										</TableCell>
										<TableCell align='center'>{user?.createdAt.split("T")[0]}</TableCell>
										<TableCell align='center'>
											<ChangeUserStatus user={user} />
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={tableHeadings.length} align='center' sx={{ color: "gray" }}>
										<Typography variant='body1'>No users found. Try modifying your search.</Typography>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					)}
				</Table>
			</TableContainer>

			{data?.meta?.totalPages > 1 && (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
					<Pagination count={data.meta.totalPages} page={page} onChange={handlePageChange} color='primary' />
				</Box>
			)}
		</Box>
	);
};

export default Users;
