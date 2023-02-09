import { ApiAddress } from "@/services/apis"
import request from "@/services/request"
import {
	MonitorTask,
	MonitorTaskParams,
	MonitorTaskTerminalsRes,
	MonitorTerminalsParams
} from "./monitor.model"

export function getMonitorTask(): Promise<MonitorTask[]> {
	return request.get(ApiAddress.MONITOR_TASK)
}

export function addMonitorTask(data: MonitorTaskParams): Promise<MonitorTask[]> {
	return request.post(ApiAddress.MONITOR_TASK, data)
}

export function deleteMonitorTask(id: number): Promise<MonitorTask[]> {
	return request.delete(ApiAddress.MONITOR_TASK, { params: { id } })
}

export function getMonitorTaskTerminals(params: MonitorTerminalsParams): Promise<MonitorTaskTerminalsRes> {
	return request.get(ApiAddress.MONITOR_TASK_TERMINALS, { params: params })
}
