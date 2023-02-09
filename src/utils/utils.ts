import dayjs from "dayjs"

export const dateFormat = (unixTime: number, format = "YYYY-MM-DD HH:mm:ss") => {
	if (!unixTime) return "-"
	return dayjs.unix(unixTime).format(format)
}
