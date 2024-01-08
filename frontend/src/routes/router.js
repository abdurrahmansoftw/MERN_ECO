import { createBrowserRouter } from 'react-router-dom'
import HomeScreen from '../Screens/HomeScreen'
import ProductScreen from '../Screens/ProductScreen'
import ErrorPage from '../pages/ErrorPage'
import Layout from '../pages/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'games/:slug', element: <ProductScreen /> },
    ],
  },
])

export default router
