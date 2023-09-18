import HeaderActions from "@/components/HeaderActions"
import { APP_NAME } from "@/utils/constants"
import { Layout, Skeleton } from "antd"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { HomeHeader, LayoutContent, HeaderLeft, HeaderRight } from "./style"

const HomeLayout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<HomeHeader>
				<HeaderLeft>{APP_NAME}</HeaderLeft>
				<HeaderRight>
					<HeaderActions />
				</HeaderRight>
			</HomeHeader>
			<LayoutContent>
				<Suspense fallback={<Skeleton active />}>
					<Outlet />
				</Suspense>
			</LayoutContent>
		</Layout>
	)
}

export default HomeLayout
