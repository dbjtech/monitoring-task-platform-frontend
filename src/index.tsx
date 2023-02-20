import ReactDOM from 'react-dom/client'
import App from './App'
import dayjs from 'dayjs'
import 'dayjs/locale/zh'
import duration from 'dayjs/plugin/duration'
import { ProviderContext } from './ProviderContext'

dayjs.extend(duration)
dayjs.locale('zh')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<ProviderContext>
		<App />
	</ProviderContext>
)
