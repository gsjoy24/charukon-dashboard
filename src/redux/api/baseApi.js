import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "https://charukon-server.vercel.app/api",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set(`authorization`, `${token}`);
		}
		return headers;
	}
});

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQuery,
	tagTypes: [
		"users",
		"user",
		"products",
		"product",
		"order",
		"orders",
		"categories",
		"category",
		"sub-categories",
		"sub-category",
		"dashboard"
	],
	endpoints: () => ({})
});
