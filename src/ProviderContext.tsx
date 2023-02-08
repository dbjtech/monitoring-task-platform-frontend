import { store } from '@/store'
import { ConfigProvider as AntdProvider } from 'antd'
import antdZhCN from 'antd/lib/locale/zh_CN'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

interface ProviderContextProps {
	children: any
}

export const ProviderContext = ({ children }: ProviderContextProps) => {
	return (
		<AntdProvider locale={antdZhCN}>
			<ReduxProvider store={store}>
				<BrowserRouter>{children}</BrowserRouter>
			</ReduxProvider>
		</AntdProvider>
	)
}
