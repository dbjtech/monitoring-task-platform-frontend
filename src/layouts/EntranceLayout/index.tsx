import { Skeleton } from "antd"
import { Outlet } from "react-router-dom"
import { Suspense } from "react"

const EntranceLayout = () => {
	return (
		<Suspense fallback={<Skeleton active />}>
			<Outlet />
		</Suspense>
	)
}

export default EntranceLayout
