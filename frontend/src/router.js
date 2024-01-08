import { createBrowserRouter } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ErrorPage from './pages/ErrorPage'
import Layout from './pages/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomeScreen /> }],
  },
])

export default router
