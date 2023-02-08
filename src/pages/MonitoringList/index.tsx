import { MonitorTask } from '@/services/monitor/monitor.model'
import { getMonitorTask } from '@/services/monitor/monitor.service'
import { SearchOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Input, Table } from 'antd'
import { useState } from 'react'
import { MonitorAction, MonitorPage, MonitorTable } from './style'

const { Column } = Table

const MonitoringPage = () => {
	const [taskList, setTaskList] = useState<MonitorTask[]>([])
	const [tableList, setTableList] = useState<MonitorTask[]>([])

	const { loading } = useRequest(getMonitorTask, {
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
	const createTask = () => {}
	const updateTask = () => {}
	const deleteTask = () => {}
	const updateTerminals = () => {}

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
					<Column title='收件人数' dataIndex='emailCounts' key='emailCounts' align='center' />
					<Column title='监控设备数' dataIndex='terminalCounts' key='terminalCounts' align='center' />
					<Column title='创建时间' dataIndex='createTime' key='createTime' align='center' />
					<Column
						title='操作'
						render={data => (
							<>
								<a onClick={updateTask} className='ml-2'>
									修改
								</a>
								<a onClick={deleteTask} className='ml-2'>
									删除
								</a>
								<a onClick={updateTerminals} className='ml-2'>
									更新设备
								</a>
							</>
						)}
						align='center'
					/>
				</Table>
			</MonitorTable>
		</MonitorPage>
	)
}

export default MonitoringPage
