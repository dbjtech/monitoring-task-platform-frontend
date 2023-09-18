import { MonitorTaskTerminals, MonitorTaskTerminalsRes } from "@/services/monitor/monitor.model"
import { getMonitorTaskTerminals } from "@/services/monitor/monitor.service"
import { LoginStatus, NetworkProtocol } from "@/utils/constants"
import { dateFormat } from "@/utils/utils"
import { SearchOutlined } from "@ant-design/icons"
import { useRequest } from "ahooks"
import { Input, Modal, Table } from "antd"
import { useState, memo, useImperativeHandle, forwardRef } from "react"

const { Column } = Table

export interface TerminalsModalRef {
	showModal: (isShow: boolean) => void
	queryTaskId: (taskId: number) => void
}

const TerminalsModal = memo(
	forwardRef((props: React.PropsWithChildren, ref: React.ForwardedRef<TerminalsModalRef>) => {
		const [taskId, setTaskId] = useState<number>(0)
		const [isShow, setIsShow] = useState<boolean>(false)
		const [tableList, setTableList] = useState<MonitorTaskTerminals[]>([])
		const [keyword, setKeyword] = useState<string>("")
		const [page, setPage] = useState<number>(1)
		const [pageSize, setPageSize] = useState<number>(10)
		const [totalData, setTotalData] = useState<number>(0)
		const { loading } = useRequest(
			() => getMonitorTaskTerminals({ taskId: taskId, keyword: keyword, page: page, pageSize: pageSize }),
			{
				refreshDeps: [taskId, keyword, page, pageSize],
				onSuccess: (data: MonitorTaskTerminalsRes) => {
					setPage(data.current)
					setTotalData(data.total)
					setTableList(data.records)
				}
			}
		)

		const onSearch = (e: any) => {
			const searchValue = e.target.value
			setKeyword(searchValue)
			setPage(1)
		}

		useImperativeHandle(ref, () => ({
			showModal: (isShow: boolean) => {
				setIsShow(isShow)
			},
			queryTaskId: (taskId: number) => {
				setTaskId(taskId)
			}
		}))

		return (
			<Modal
				open={isShow}
				width={1000}
				title='设备详情'
				footer={<></>}
				onCancel={() => {
					setIsShow(false)
					setKeyword("")
					setPage(1)
				}}
			>
				<Input
					value={keyword}
					prefix={<SearchOutlined />}
					allowClear
					placeholder='请输入SN/ICCID(区分大小写)'
					onChange={onSearch}
					style={{ width: 300, margin: "20px 0" }}
				/>
				<Table
					rowKey='sn'
					loading={loading}
					dataSource={tableList}
					bordered
					size='large'
					pagination={{
						total: totalData,
						current: page,
						showSizeChanger: true,
						defaultPageSize: 10,
						pageSizeOptions: ["5", "10", "25", "50"],
						showTotal: total => `共 ${total} 条结果`,
						onChange: (page, pageSize = 10) => {
							setTableList([])
							setPage(page)
							setPageSize(pageSize)
						}
					}}
				>
					<Column
						title='SN'
						dataIndex='sn'
						key='sn'
						align='center'
						render={(text: string) => <span>{text || "-"}</span>}
					/>
					<Column
						title='ICCID'
						dataIndex='iccid'
						key='iccid'
						align='center'
						render={(text: string) => <span>{text || "-"}</span>}
					/>
					<Column
						title='设备类型'
						dataIndex='modelName'
						key='modelName'
						align='center'
						render={(text: string) => <span>{text || "-"}</span>}
					/>
					<Column
						title='设备版本号'
						dataIndex='version'
						key='version'
						align='center'
						render={(text: string) => <span>{text || "-"}</span>}
					/>
					<Column
						title='通信协议'
						dataIndex='networkProtocol'
						key='networkProtocol'
						align='center'
						render={(text: number) => <span>{NetworkProtocol[text] || "-"}</span>}
					/>
					<Column
						title='在线状态'
						dataIndex='login'
						key='login'
						align='center'
						render={(text: number) => <span>{LoginStatus[text] || "-"}</span>}
					/>
					<Column
						title='激活日期'
						dataIndex='activeTime'
						key='activeTime'
						align='center'
						render={(text: number) => <span>{dateFormat(text)}</span>}
					/>
					<Column
						title='上次定位时间'
						dataIndex='locationTime'
						key='locationTime'
						align='center'
						render={(text: number) => <span>{dateFormat(text)}</span>}
					/>
					<Column
						title='最后通讯时间'
						dataIndex='updateTime'
						key='updateTime'
						align='center'
						render={(text: number) => <span>{dateFormat(text)}</span>}
					/>
				</Table>
			</Modal>
		)
	})
)

export default TerminalsModal
