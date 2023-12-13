import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { MonitorTask } from "@/services/monitor/monitor.model"
import { deleteMonitorTask, downLoadMonitorTask } from "@/services/monitor/monitor.service"
import { getMonitorTaskThunk, selectMonitorStore } from "@/store/monitor/monitor.slice"
import { APP_NAME } from "@/utils/constants"
import { dateFormat } from "@/utils/utils"
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { useTitle } from "ahooks"
import { Button, Input, Modal, Table } from "antd"
import { useState, useRef, useEffect } from "react"
import AddresseeModal, { AddresseeModalRef } from "./addresseeModal"
import MonitorTaskModal, { MonitorTaskModalRef } from "./monitorTaskModal"
import { MonitorAction, MonitorPage, MonitorTable } from "./style"
import TerminalsModal, { TerminalsModalRef } from "./terminalsModal"

const { Column } = Table

const MonitoringPage = () => {
	useTitle(`${APP_NAME}`)
	const dispatch = useAppDispatch()
	const { monitorTaskList } = useAppSelector(selectMonitorStore)
	const addresseeModalRef = useRef<AddresseeModalRef | null>(null)
	const terminalsModalRef = useRef<TerminalsModalRef | null>(null)
	const monitorTaskModalRef = useRef<MonitorTaskModalRef | null>(null)
	const [tableList, setTableList] = useState<MonitorTask[]>([])

	const onSearch = (e: any) => {
		const searchValue = e.target.value
		const filterValue = monitorTaskList
			.filter((item: MonitorTask) => item.taskName.includes(searchValue))
			.sort((a, b) => a.id - b.id)
		setTableList(filterValue)
	}
	const createTask = () => {
		monitorTaskModalRef.current?.showModal(true)
	}
	const updateTask = (row: MonitorTask) => {
		const initData = {
			taskId: row.id,
			taskName: row.taskName,
			emails: row.emails,
			adminName: row.adminName,
			pingInterval: row.pingInterval
		}
		monitorTaskModalRef.current?.showModal(true, initData)
	}
	const deleteTask = (row: MonitorTask) => {
		Modal.confirm({
			title: "删除任务",
			icon: <DeleteOutlined />,
			content: "确认要删除该条监控任务吗？",
			onOk() {
				deleteMonitorTask(row.id).then(() => {
					dispatch(getMonitorTaskThunk())
				})
			}
		})
	}
	const showAddressee = (row: MonitorTask) => {
		addresseeModalRef.current?.renderList(row.emails)
		addresseeModalRef.current?.showModal(true)
	}
	const showTerminals = (row: MonitorTask) => {
		terminalsModalRef.current?.queryTaskId(row.id)
		terminalsModalRef.current?.showModal(true)
	}
	const downLoadTask = (row: MonitorTask) => {
		downLoadMonitorTask(row.id)
	}

	useEffect(() => {
		const sortItem = [...monitorTaskList]
		sortItem.sort((a, b) => a.id - b.id)
		setTableList(sortItem)
	}, [monitorTaskList])
	useEffect(() => {
		dispatch(getMonitorTaskThunk())
	}, [])

	return (
		<MonitorPage>
			<MonitorAction>
				<Input
					prefix={<SearchOutlined />}
					allowClear
					placeholder='请输入任务名称'
					onChange={onSearch}
					style={{ width: 300 }}
				/>
				<Button type='primary' onClick={createTask}>
					创建任务
				</Button>
			</MonitorAction>
			<MonitorTable>
				<Table
					rowKey='id'
					dataSource={tableList}
					bordered
					size='small'
					pagination={{ pageSize: 10, showSizeChanger: false }}
				>
					<Column title='ID' dataIndex='id' key='id' align='center' />
					<Column title='名称' dataIndex='taskName' key='taskName' align='center' />
					<Column
						title='收件人数'
						dataIndex='emailCounts'
						key='emailCounts'
						align='center'
						render={(text: string, row: MonitorTask) => <a onClick={() => showAddressee(row)}>{text}</a>}
					/>
					<Column
						title='监控设备数'
						dataIndex='terminalCounts'
						key='terminalCounts'
						align='center'
						render={(text: string, row: MonitorTask) => <a onClick={() => showTerminals(row)}>{text}</a>}
					/>
					<Column title='管理员' dataIndex='adminName' key='adminName' align='center' />
					<Column
						title='创建时间'
						dataIndex='createTime'
						key='createTime'
						align='center'
						render={(text: number) => <span>{dateFormat(text)}</span>}
					/>
					<Column
						title='修改时间'
						dataIndex='updateTime'
						key='updateTime'
						align='center'
						render={(text: number) => <span>{dateFormat(text)}</span>}
					/>
					<Column
						title='操作'
						render={(text: string, row: MonitorTask) => (
							<>
								<a onClick={() => updateTask(row)} className='ml-2'>
									修改
								</a>
								<a onClick={() => deleteTask(row)} className='ml-2'>
									删除
								</a>
								<a onClick={() => downLoadTask(row)} className='ml-2'>
									下载监控日志
								</a>
							</>
						)}
						align='center'
					/>
				</Table>
			</MonitorTable>
			<AddresseeModal ref={addresseeModalRef} />
			<TerminalsModal ref={terminalsModalRef} />
			<MonitorTaskModal ref={monitorTaskModalRef} />
		</MonitorPage>
	)
}

export default MonitoringPage
