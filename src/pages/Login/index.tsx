import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { login } from '@/services/auth/auth.service'
import useTitle from 'ahooks/lib/useTitle'
import { APP_NAME } from '@/utils/constants'
import { LoginBox, PageMain, LoginTitle } from './style'
import { LoginRes } from '@/services/auth/auth.model'

const LoginPage = () => {
	useTitle(`${APP_NAME}-密码登录`)
	const navigate = useNavigate()
	const { loading, run } = useRequest(login, {
		manual: true,
		onSuccess: (res: LoginRes) => {
			window.sessionStorage.setItem('mtsToken', res.token || '')
			navigate('/')
		}
	})

	return (
		<PageMain>
			<LoginBox>
				<LoginTitle>用户登录</LoginTitle>
				<Form
					layout='vertical'
					onFinish={values => {
						run({
							...values
						})
					}}
				>
					<Form.Item required label='用户名' name='username'>
						<Input size='large' type='text' prefix={<UserOutlined />} placeholder='请输入用户名' />
					</Form.Item>
					<Form.Item required label='密码' name='password'>
						<Input size='large' autoComplete='new-password' type='password' prefix={<LockOutlined />} placeholder='请输入密码' />
					</Form.Item>
					<Form.Item>
						<Button
							loading={loading}
							htmlType='submit'
							type='primary'
							size='large'
							style={{ width: '100%', marginBottom: '5px' }}
						>
							登录
						</Button>
					</Form.Item>
				</Form>
			</LoginBox>
		</PageMain>
	)
}

export default LoginPage
