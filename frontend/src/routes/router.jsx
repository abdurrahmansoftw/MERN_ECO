import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../admin/Dashboard'
import OrderListScreen from '../admin/adminScreens/OrderListScreen'
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
import ProfileScreen from '../screens/usersScreens/ProfileScreen'
import AdminRoutes from './AdminRoutes'
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
			{ path: 'profile', element: <ProfileScreen /> },
		],
	},
	/* Admin routes */
	{
		element: <AdminRoutes />,
		children: [
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'admin/orderlist', element: <OrderListScreen /> },
		],
	},
])

export default router
