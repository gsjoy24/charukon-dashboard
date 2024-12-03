import { baseApi } from "../api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBanner: builder.mutation({
      query: (data) => ({
        url: `/banners/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banners"],
    }),
    getBanners: builder.query({
      query: ({ page, search } = { page: 1, search: "" }) => ({
        url: `/banners`,
        method: "GET",
        params: { page, search, limit: 40 },
      }),
      providesTags: ["banners"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banners"],
    }),

    toggleBannerPause: builder.mutation({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["banners"],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useGetBannersQuery,
  useDeleteBannerMutation,
  useToggleBannerPauseMutation,
} = bannerApi;
