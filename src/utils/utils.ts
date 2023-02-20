import dayjs from "dayjs"

export const dateFormat = (unixTime: number, format = "YYYY-MM-DD HH:mm:ss") => {
	if (!unixTime) return "-"
	if (unixTime.toString().length === 13) {
		unixTime = Number(unixTime.toString().slice(0, 10))
	}
	return dayjs.unix(unixTime).format(format)
}
