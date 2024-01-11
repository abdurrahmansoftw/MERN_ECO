import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetUsersQuery, useGetUserDetailsQuery } = usersApiSlice
