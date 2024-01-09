import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import Layout from '../pages/Layout'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'product/:id', element: <ProductScreen /> },
    ],
  },
])

export default router
