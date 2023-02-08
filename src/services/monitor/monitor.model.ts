export interface MonitorTask {
	id: number
	taskName: string
	emailCounts: number
	terminalCounts: number
	createTime: number
}

export interface MonitorTaskParams {
	taskName: string
	terminalFile: File
	emails?: string
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
