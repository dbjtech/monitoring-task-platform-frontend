import { ApiAddress } from '@/services/apis'
import request from '@/services/request'
import { MonitorTask, MonitorTaskParams, MonitorTaskTerminals } from './monitor.model'

export function getMonitorTask(): Promise<MonitorTask[]> {
	return request.get(ApiAddress.MONITOR_TASK)
}

export function addMonitorTask(data: MonitorTaskParams): Promise<MonitorTask[]> {
	return request.post(ApiAddress.MONITOR_TASK, data)
}

export function getMonitorTaskTerminals(id: string): Promise<MonitorTaskTerminals[]> {
	return request.get(ApiAddress.MONITOR_TASK_TERMINALS, { params: { id } })
}
