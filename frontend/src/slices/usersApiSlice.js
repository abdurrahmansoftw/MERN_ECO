import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        // eslint-disable-next-line no-undef
        url: USERS_URL / auth,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation } = usersApiSlice
