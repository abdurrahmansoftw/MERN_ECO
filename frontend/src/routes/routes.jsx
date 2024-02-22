import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../layouts/ErrorPage'
import Layout from '../layouts/Layout'
import App from '../screens/App'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <App /> }],
  },
])

export default routes
