import { message } from "antd"
import axios from "axios"
import NProgress from "nprogress"

export interface NbResponse<T, M = null, K = null> {
	status: number | string
	message: string
	data: T
	meta?: M
	pagination?: K
}

const codeMessage: { [index: number]: string } = {
	200: "成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
	401: "用户没有权限（令牌、用户名、密码错误）。",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
	406: "请求的格式不可得。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器发生错误，请检查服务器。",
	502: "接口错误。",
	503: "服务不可用，服务器暂时过载或维护。",
	504: "接口超时。"
}

const request = axios.create({})

const REST_PARAMS = /(:[^/]+)/g
request.interceptors.request.use(
	config => {
		NProgress.start()
		const token = window.sessionStorage.getItem("mtsToken") || ""
		const matched = config.url?.match(REST_PARAMS)
		const params = config.params
		config.headers.Authorization = token
		let newUrl = config.url
		if (matched && matched.length > 0) {
			matched.forEach(param => {
				const paramName = param.substring(1)
				const pVal = params?.[paramName]
				if (!pVal) {
					throw new URIError(`[REST] No target value for replacing resource id in url.
                         Params in url must be placed in params within RequestOptions`)
				}
				newUrl = newUrl?.replace(param, pVal)
				delete params?.[paramName]
			})
		}

		return {
			...config,
			url: newUrl,
			params
		}
	},
	err => {}
)
request.interceptors.response.use(
	res => {
		NProgress.done()
		if (res.headers["content-type"]?.includes("application/force-download")) {
			window.open(res.request.responseURL)
			return Promise.resolve(res.data)
		}

		if (res.status === 200) {
			const resData = res.data
			if (resData.status === 200) {
				return Promise.resolve(resData.data)
			}
			if (resData.status === 401) {
				window.location.href = "/entrance/login"
			}
			if (!res.config.params?.notShowMessage) {
				message.error(resData.message)
			}
		}

		return Promise.reject(res)
	},
	error => {
		NProgress.done()
		if (error === "Error: timeout of 3000ms exceeded") {
		} else {
			message.error(codeMessage[error.status] || "服务器错误")
		}
		return Promise.reject(error)
	}
)

export default request
