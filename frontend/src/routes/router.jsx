import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import Layout from '../pages/Layout'
import CartScreen from '../screens/CartScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import OrderScreen from '../screens/OrderScreen'
import PaymentScreen from '../screens/PaymentScreen'
import PlaceOrderScreen from '../screens/PlaceOrderScreen'
import ProductScreen from '../screens/ProductScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ShippingScreen from '../screens/ShippingScreen'
import PrivateRoutes from './PrivateRoutes'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomeScreen /> },
			{ path: 'product/:id', element: <ProductScreen /> },
			{ path: 'cart', element: <CartScreen /> },
			{ path: 'login', element: <LoginScreen /> },
			{ path: 'register', element: <RegisterScreen /> },
			{ path: 'forgotpassword', element: <ForgotPasswordScreen /> },
		],
	},
	/* Private routes */
	{
		element: <PrivateRoutes />,
		children: [
			{ path: 'shipping', element: <ShippingScreen /> },
			{ path: 'payment', element: <PaymentScreen /> },
			{ path: 'placeorder', element: <PlaceOrderScreen /> },
			{ path: 'order/:id', element: <OrderScreen /> },
		],
	},
])

export default router
