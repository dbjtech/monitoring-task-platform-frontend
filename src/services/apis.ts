export const apiBase = 'api'
export const apiVersion = 'v1'
export const apiPrefix = `/${apiBase}/${apiVersion}`

export const ApiAddress: { [index: string]: string } = {
	// 账户
	LOGIN: '/login',
	LOGOUT: '/logout',
	PASSWORD: '/password',
	// 监控任务
	MONITOR_TASK: '/monitor_task',
	MONITOR_TASK_TERMINALS: '/monitor_task/terminals'
}

Object.keys(ApiAddress).forEach(key => {
	ApiAddress[key] = apiPrefix + ApiAddress[key]
})
