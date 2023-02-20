export interface MonitorTask {
	id: number
	taskName: string
	emailCounts: number
	terminalCounts: number
	createTime: number
	emails: string
	adminName: string
}

export interface MonitorTaskParams {
	taskId?: number
	taskName: string
	terminalFile?: File
	emails: string
	adminName: string
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
