import { Modal, Table } from "antd"
import { useState, memo, useImperativeHandle, forwardRef } from "react"

const { Column } = Table

interface AddresseeData {
	id: number
	email: string
}

export interface AddresseeModalRef {
	showModal: (isShow: boolean) => void
	renderList: (emails: string) => void
}

const AddresseeModal = memo(
	forwardRef((props: React.PropsWithChildren, ref: React.ForwardedRef<AddresseeModalRef>) => {
		const [isShow, setIsShow] = useState<boolean>(false)
		const [list, setList] = useState<AddresseeData[]>([])

		useImperativeHandle(ref, () => ({
			showModal: (isShow: boolean) => {
				setIsShow(isShow)
			},
			renderList: (emails: string) => {
				const listData = emails
					? emails
							.split(",")
							.map((item: string, index: number) => {
								return {
									id: index + 1,
									email: item
								}
							})
							.filter(item => item.email)
					: []
				setList(listData)
			}
		}))

		return (
			<Modal
				open={isShow}
				title='邮件接收人'
				footer={<></>}
				onCancel={() => {
					setIsShow(false)
				}}
			>
				<Table
					rowKey='id'
					dataSource={list}
					bordered
					size='small'
					pagination={{ pageSize: 10, showSizeChanger: false }}
				>
					<Column width={80} title='序号' dataIndex='id' key='id' align='center' />
					<Column title='邮件接收人' dataIndex='email' key='email' align='center' />
				</Table>
			</Modal>
		)
	})
)

export default AddresseeModal
