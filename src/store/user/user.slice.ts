import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

interface UserStore {
	name: string
}

const initialState: UserStore = {
	name: 'admin'
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		updateUserName: (state, actions: PayloadAction<string>) => {
			state.name = actions.payload
		}
	}
})

export const { updateUserName } = usersSlice.actions
export const selectUserStore = (state: RootState) => state.users
export default usersSlice.reducer
