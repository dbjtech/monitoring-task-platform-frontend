import { logout as logoutService } from '@/services/auth/auth.service'
import { useNavigate } from 'react-router-dom'
import { Logout } from './style'
import { useCallback } from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const HeaderActions = () => {
	const navigate = useNavigate()

	const showLogoutConfirm = useCallback(() => {
		Modal.confirm({
			title: '退出登录',
			icon: <ExclamationCircleOutlined />,
			content: '确认退出？',
			onOk() {
				logoutService().then(() => {
					window.sessionStorage.removeItem('mtsToken')
					navigate('/entrance/login')
				})
			}
		})
	}, [])

	return <Logout onClick={showLogoutConfirm}>登出</Logout>
}

export default HeaderActions
