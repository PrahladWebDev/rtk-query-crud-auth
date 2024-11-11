import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/products' }),
    tagTypes: ['Product'], // Define tag types for cache invalidation

    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/',
                method: 'POST',
                body: product,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Product'], // Invalidate 'Product' tag to trigger refetch
        }),

        getProducts: builder.query({
            query: () => ({
                url: '/',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Product'], // Provide the 'Product' tag to this query
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: patch,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Product'], // Invalidate tag to trigger refetch
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Product'], // Invalidate tag to trigger refetch
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
