import { configureStore } from "@reduxjs/toolkit"
import monitorReducer from "./monitor/monitor.slice"
import userReducer from "./user/user.slice"

export const store = configureStore({
	reducer: {
		users: userReducer,
		monitor: monitorReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
