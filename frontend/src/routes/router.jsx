import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import Layout from '../pages/Layout'
import CartScreen from '../screens/CartScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import ProductScreen from '../screens/ProductScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ShippingScreen from '../screens/ShippingScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'product/:id', element: <ProductScreen /> },
      { path: 'cart', element: <CartScreen /> },
      /* Auth in  */
      { path: 'login', element: <LoginScreen /> },
      { path: 'register', element: <RegisterScreen /> },
      { path: 'forgotpassword', element: <ForgotPasswordScreen /> },
      { path: 'shipping', element: <ShippingScreen /> },
    ],
  },
])

export default router
