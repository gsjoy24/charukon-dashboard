import {
	Box,
	Pagination,
	Paper,
	Skeleton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@mui/material";
import { useState } from "react";
import PageTitle from "../../components/Shared/PageTitle";
import { useGetCategoryQuery } from "../../redux/features/categoryApi";
import AddCategoryModal from "./AddCategoryModal";
import SubCategories from "./SubCategories";
import UpdateCategoryModal from "./UpdateCategoryModal";

const tableHeadings = ["#", "Name", "Description", "Sub Categories", "Actions"];

const Categories = () => {
	const [page, setPage] = useState(1);
	const handlePageChange = (_, value) => setPage(value);

	const { data, isFetching } = useGetCategoryQuery({ page });

	return (
		<Box sx={{ mt: 10, width: "100%", mx: "auto" }}>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<PageTitle title='Categories' />
				<AddCategoryModal />
			</Stack>
			<TableContainer component={Paper} sx={{ my: 3, borderRadius: 1 }}>
				{isFetching ? (
					<Table sx={{ minWidth: 650 }} size='medium'>
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
							{[...Array(5)].map((_, index) => (
								<TableRow key={index}>
									{[...Array(tableHeadings.length)].map((_, idx) => (
										<TableCell key={idx} align='center'>
											<Skeleton variant='text' />
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<>
						{data?.data?.length ? (
							<Table sx={{ minWidth: 650 }} size='medium'>
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
									{data?.data?.map((category, index) => (
										<TableRow key={category._id}>
											<TableCell align='center'>{index + 1}</TableCell>
											<TableCell align='center'>{category?.name}</TableCell>
											<TableCell align='center' sx={{ maxWidth: "200px", overflow: "hidden" }}>
												{category?.description}
											</TableCell>
											<TableCell align='center'>
												<SubCategories category={category} />
											</TableCell>
											<TableCell align='center'>
												<UpdateCategoryModal category={category} />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<Box sx={{ textAlign: "center", py: 3 }}>
								<p>No categories available. Add one using the button above!</p>
							</Box>
						)}
					</>
				)}
			</TableContainer>
			{data?.meta && (
				<Pagination
					count={data?.meta?.totalPages}
					page={page}
					onChange={handlePageChange}
					color='primary'
					size='large'
					sx={{ my: 3 }}
				/>
			)}
		</Box>
	);
};

export default Categories;
