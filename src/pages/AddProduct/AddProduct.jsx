import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import KForm from '../../components/Form/KForm';
import KInput from '../../components/Form/KInput';
import KSelect from '../../components/Form/KSelect';
import { useGetCategoryQuery } from '../../redux/features/categoryApi';

const AddProduct = () => {
	const { data: categories } = useGetCategoryQuery({});

	const categoryOptions = categories?.data?.map((category) => ({ value: category._id, label: category.name })) || [];

	const subCategoryOptions =
		categories?.data
			?.map((category) => category.subcategories)
			.flat()
			.map((subCategory) => ({ value: subCategory._id, label: subCategory.name })) || [];

	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<Box>
			<Typography variant='h2' gutterBottom>
				Add Product
			</Typography>
			<KForm onSubmit={onSubmit}>
				<Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ width: '100%' }}>
					<KInput name='name' label='Name' />
					<KInput name='serial_number' label='Serial Number' />
				</Stack>

				<Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ width: '100%' }}>
					<KInput name='stock' label='Stock' type='number' />
					<KInput name='old_price' label='Old Price' type='number' />
					<KInput name='last_price' label='New Price' type='number' />
				</Stack>
				<Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ width: '100%' }}>
					<KSelect name='category' label='Category' options={categoryOptions} />
					<KSelect name='sub_category' label='Sub Category' options={subCategoryOptions} />
				</Stack>
				<KInput name='tags' label='Tags' />
				<KInput name='short_description' label='Short Description' multiline />
			</KForm>
		</Box>
	);
};

export default AddProduct;

// export type TProduct = {
// 	description: string,
// 	images: string[],
// };