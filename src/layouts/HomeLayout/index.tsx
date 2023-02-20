import HeaderActions from '@/components/HeaderActions'
import { APP_NAME } from '@/utils/constants'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { HomeHeader, LayoutContent, HeaderLeft, HeaderRight } from './style'

const HomeLayout = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<HomeHeader>
				<HeaderLeft>{APP_NAME}</HeaderLeft>
				<HeaderRight>
					<HeaderActions />
				</HeaderRight>
			</HomeHeader>
			<LayoutContent>
				<Outlet />
			</LayoutContent>
		</Layout>
	)
}

export default HomeLayout
