import { Result, Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

const ErrorPage = () => {
	let navigate = useNavigate()

	return (
		<Result
			status='404'
			title='404'
			subTitle='对不起，您访问的页面不存在。'
			extra={
				<Button type='primary' icon={<RollbackOutlined />} onClick={() => navigate('/')}>
					返回首页
				</Button>
			}
		/>
	)
}

export default ErrorPage
