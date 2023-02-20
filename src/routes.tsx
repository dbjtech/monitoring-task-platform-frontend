import { Navigate } from 'react-router'
import { lazy } from 'react'
import HomeLayout from './layouts/HomeLayout'
import ErrorPage from './pages/404'
import EntranceLayout from './layouts/EntranceLayout'

const Login = lazy(() => import('./pages/Login'))
const MonitoringList = lazy(() => import('./pages/MonitoringList'))

const routes = () => [
	{
		path: '/',
		element: <HomeLayout />,
		children: [
			{
				path: '',
				element: <Navigate to='monitoringList' />
			},
			{
				path: 'monitoringList',
				element: <MonitoringList />
			}
		]
	},
	{
		path: '/login',
		element: <Navigate to='/entrance/login' />
	},
	{
		path: '/entrance',
		element: <EntranceLayout />,
		children: [
			{
				path: '',
				element: <Navigate to='login' />
			},
			{
				path: 'login',
				element: <Login />
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
]

export default routes
