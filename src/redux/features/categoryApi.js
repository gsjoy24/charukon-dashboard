import { baseApi } from '../api/baseApi';

const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addCategory: builder.mutation({
			query: (data) => ({
				url: `/categories`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: [{ type: 'Category', id: 'LIST' }]
		}),
		getCategory: builder.query({
			query: () => ({
				url: `/categories`,
				method: 'GET'
			}),
			providesTags: (result) => {
				if (result?.success && Array.isArray(result.data)) {
					return result.data.length
						? result.data.map((category) => ({ type: 'Category', id: category._id }))
						: [{ type: 'Category', id: 'LIST' }];
				}
				return [{ type: 'Category', id: 'LIST' }];
			}
		}),
		addSubCategory: builder.mutation({
			query: (data) => ({
				url: `/subcategories`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: [
				{ type: 'Category', id: 'LIST' },
				{ type: 'SubCategory', id: 'LIST' }
			]
		}),
		updateCategory: builder.mutation({
			query: ({ id, data }) => ({
				url: `/categories/${id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }]
		}),
		getSubCategory: builder.query({
			query: () => ({
				url: `/subcategories`,
				method: 'GET'
			}),
			providesTags: (result) => {
				if (result?.success && Array.isArray(result.data)) {
					return result.data.length
						? result.data.map((subCategory) => ({ type: 'SubCategory', id: subCategory._id }))
						: [{ type: 'SubCategory', id: 'LIST' }];
				}
				return [{ type: 'SubCategory', id: 'LIST' }];
			}
		}),
		updateSubCategory: builder.mutation({
			query: ({ id, data }) => ({
				url: `/subcategories/${id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'SubCategory', id },
				{ type: 'Category', id: 'LIST' }
			]
		})
	})
});

export const {
	useAddCategoryMutation,
	useGetCategoryQuery,
	useAddSubCategoryMutation,
	useGetSubCategoryQuery,
	useUpdateCategoryMutation,
	useUpdateSubCategoryMutation
} = categoryApi;
