import { apiSlice } from './apiSlice'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrderItems: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: { ...order },
      }),
    }),
  }),
})

export const { useAddOrderItemsMutation } = ordersApiSlice
