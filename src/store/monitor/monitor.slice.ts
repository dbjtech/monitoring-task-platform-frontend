import { MonitorTask } from "@/services/monitor/monitor.model"
import { getMonitorTask } from "@/services/monitor/monitor.service"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface MonitorTaskStore {
	monitorTaskList: MonitorTask[]
}

const initialState: MonitorTaskStore = {
	monitorTaskList: []
}

export const getMonitorTaskThunk = createAsyncThunk("/monitor_task", async () => {
	return getMonitorTask()
})

export const monitorSlice = createSlice({
	name: "monitor",
	initialState,
	reducers: {
		updateMonitorTask: (state, actions: PayloadAction<MonitorTask[]>) => {
			state.monitorTaskList = actions.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(getMonitorTaskThunk.fulfilled, (state, action) => {
			state.monitorTaskList = action.payload
		})
	}
})

export const { updateMonitorTask } = monitorSlice.actions
export const selectMonitorStore = (state: RootState) => state.monitor
export default monitorSlice.reducer
