import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { BASE_URL } from '../constants'

const baseUrl = fetchBaseQuery({ baseUrl: BASE_URL })

export const apiSlice = createApi({
  baseUrl,
  tagTypes: ['Product', 'User', 'Order'],
  endpoints: (builder) => ({}),
})
