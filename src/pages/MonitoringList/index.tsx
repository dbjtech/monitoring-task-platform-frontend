import { MonitorTask } from "@/services/monitor/monitor.model"
import { deleteMonitorTask, getMonitorTask } from "@/services/monitor/monitor.service"
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { useRequest } from "ahooks"
import { Button, Input, Modal, Table } from "antd"
import { useState, useRef } from "react"
import AddresseeModal, { AddresseeModalRef } from "./addresseeModal"
import MonitorTaskModal, { MonitorTaskModalRef } from "./monitorTaskModal"
import { MonitorAction, MonitorPage, MonitorTable } from "./style"
import TerminalsModal, { TerminalsModalRef } from "./terminalsModal"

const { Column } = Table

const MonitoringPage = () => {
	const addresseeModalRef = useRef<AddresseeModalRef | null>(null)
	const terminalsModalRef = useRef<TerminalsModalRef | null>(null)
	const monitorTaskModalRef = useRef<MonitorTaskModalRef | null>(null)
	const [taskList, setTaskList] = useState<MonitorTask[]>([])
	const [tableList, setTableList] = useState<MonitorTask[]>([])

	const { loading, run } = useRequest(getMonitorTask, {
		onSuccess: (res: MonitorTask[]) => {
			setTaskList(res)
			setTableList(res)
		}
	})
	const onSearch = (e: any) => {
		const searchValue = e.target.value
		const filterValue = taskList.filter((item: MonitorTask) => item.taskName.includes(searchValue))
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
			adminName: row.adminName
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
					run()
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
					loading={loading}
					bordered
					size='small'
					pagination={{ pageSize: 10, showSizeChanger: false }}
				>
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
					<Column title='创建时间' dataIndex='createTime' key='createTime' align='center' />
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
