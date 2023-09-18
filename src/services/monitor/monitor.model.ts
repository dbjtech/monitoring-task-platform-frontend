export interface MonitorTask {
	id: number
	taskName: string
	emailCounts: number
	terminalCounts: number
	createTime: number
	emails: string
	adminName: string
	pingInterval: string
}

export interface MonitorTaskParams {
	taskId?: number //监控任务id  update时使用
	taskName: string //监控任务名称
	terminalFile?: File //监控任务监控设备列表文件
	emails: string //监控任务通知人邮箱
	adminName: string //管理员姓名
	pingInterval: string //自动ping IV100设备时间周期
}

export interface MonitorTerminalsParams {
	taskId: number
	page: number
	pageSize: number
	keyword?: string
}

export interface MonitorTaskTerminalsRes {
	current: number
	pages: number
	size: number
	total: number
	records: MonitorTaskTerminals[]
}

export interface MonitorTaskTerminals {
	sn: string
	iccid: string
	activeTime: number
	modelName: string
	version: string
	networkProtocol: number
	login: number
	updateTime: number
	locationTime: number
}
