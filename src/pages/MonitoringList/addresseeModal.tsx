import { Modal, Table } from "antd"
import { useState, useMemo, memo, useImperativeHandle, forwardRef } from "react"

const { Column } = Table

export interface AddresseeModalProps {
	emails: string
}

export interface AddresseeModalRef {
	showModal: (isShow: boolean) => void
}

const AddresseeModal = memo(
	forwardRef((props: AddresseeModalProps, ref: React.ForwardedRef<AddresseeModalRef>) => {
		const { emails } = props
		const [isShow, setIsShow] = useState<boolean>(false)

		const list = useMemo(() => {
			return emails
				? emails.split(",").map((item: string, index: number) => {
						return {
							id: index,
							email: item
						}
				  })
				: []
		}, [emails])

		useImperativeHandle(ref, () => ({
			showModal: (isShow: boolean) => {
				setIsShow(isShow)
			}
		}))

		return (
			<Modal
				open={isShow}
				title='邮件接收人'
				closable
				mask
				maskClosable
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
