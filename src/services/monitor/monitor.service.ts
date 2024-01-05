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

export function downLoadMonitorTask(taskId: number) {
	window.open("api/v1/monitor_task/export?taskId=" + taskId)
}

export function addMonitorTask(data: MonitorTaskParams): Promise<MonitorTask[]> {
	const formData = new FormData()
	formData.append("terminalFile", data.terminalFile!)
	formData.append("taskName", data.taskName)
	formData.append("emails", data.emails)
	formData.append("adminName", data.adminName)
	formData.append("pingInterval", data.pingInterval)
	formData.append("locationSwitchStatus", data.locationSwitchStatus)

	return request.post(ApiAddress.MONITOR_TASK, formData, {
		headers: { "Content-Type": "multipart/form-data" }
	})
}

export function updateMonitorTask(data: MonitorTaskParams, taskId: number): Promise<MonitorTask[]> {
	const formData = new FormData()
	data.terminalFile && formData.append("terminalFile", data.terminalFile)
	formData.append("taskName", data.taskName)
	formData.append("emails", data.emails)
	formData.append("adminName", data.adminName)
	formData.append("pingInterval", data.pingInterval)
	formData.append("locationSwitchStatus", data.locationSwitchStatus)

	return request.put(ApiAddress.MONITOR_TASK_ACTION, formData, {
		params: { id: taskId },
		headers: { "Content-Type": "multipart/form-data" }
	})
}

export function deleteMonitorTask(id: number): Promise<MonitorTask[]> {
	return request.delete(ApiAddress.MONITOR_TASK_ACTION, { params: { id } })
}

export function getMonitorTaskTerminals(params: MonitorTerminalsParams): Promise<MonitorTaskTerminalsRes> {
	return request.get(ApiAddress.MONITOR_TASK_TERMINALS, { params: params })
}
