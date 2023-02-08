import { ApiAddress } from '@/services/apis'
import { LoginData, LoginRes } from '@/services/auth/auth.model'
import request from '@/services/request'
// import md5 from 'blueimp-md5'

export async function login(data: LoginData): Promise<LoginRes> {
	return request.post(ApiAddress.LOGIN, data, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export function logout() {
	return request.delete(ApiAddress.LOGOUT)
}

// export function register(data: any) {
// 	data.password = md5(data.password)

// 	return request.post(ApiAddress.REGISTRATION, data)
// }

// export function resetPassword(data: any) {
// 	data.password = md5(data.password)

// 	return request.post(ApiAddress.USER_PASSWORD_RESET, data)
// }
