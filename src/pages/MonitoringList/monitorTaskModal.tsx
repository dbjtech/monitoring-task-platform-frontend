import { useAppDispatch } from "@/hooks/reduxHooks"
import { MonitorTask, MonitorTaskParams } from "@/services/monitor/monitor.model"
import { addMonitorTask, updateMonitorTask } from "@/services/monitor/monitor.service"
import { getMonitorTaskThunk } from "@/store/monitor/monitor.slice"
import { UploadOutlined } from "@ant-design/icons"
import { useRequest } from "ahooks"
import { Button, Form, Input, Modal, Upload } from "antd"
import { useState, memo, useImperativeHandle, forwardRef } from "react"
import { ListTemplate, Tips, TipsTitle } from "./style"
import ListTemplatePNG from "@/assets/images/monitor_template.png"

export interface MonitorTaskModalRef {
	showModal: (isShow: boolean, initData?: MonitorTaskParams) => void
}

const MonitorTaskModal = memo(
	forwardRef((props: React.PropsWithChildren, ref: React.ForwardedRef<MonitorTaskModalRef>) => {
		const [form] = Form.useForm()
		const dispatch = useAppDispatch()
		const [isShow, setIsShow] = useState<boolean>(false)
		const [updateId, setUpdateId] = useState<number>(0)

		const { loading: addLoading, run: runCreate } = useRequest(addMonitorTask, {
			manual: true,
			onSuccess: (data: MonitorTask[]) => {
				resetModal()
				dispatch(getMonitorTaskThunk())
			}
		})

		const { loading: creatLoading, run: runUpdate } = useRequest(updateMonitorTask, {
			manual: true,
			onSuccess: (data: MonitorTask[]) => {
				resetModal()
				dispatch(getMonitorTaskThunk())
			}
		})

		const uploadExcel = (file: File) => {
			return new Promise<void>((resolve, reject) => {
				file && reject()
			})
		}

		const normFile = (e: any) => {
			if (Array.isArray(e)) {
				return e
			}
			return e && e.fileList
		}

		const resetModal = () => {
			setIsShow(false)
			form.resetFields()
		}

		const submitForm = () => {
			form
				.validateFields()
				.then(values => {
					const params = {
						...values
					}
					if (values.terminalFile) {
						params.terminalFile = values.terminalFile[0].originFileObj
					}
					updateId ? runUpdate(params, updateId) : runCreate(params)
				})
				.catch(() => {})
		}

		useImperativeHandle(ref, () => ({
			showModal: (isShow: boolean, initData?: MonitorTaskParams) => {
				setIsShow(isShow)
				setUpdateId(initData?.taskId || 0)
				initData && form.setFieldsValue(initData)
			}
		}))

		return (
			<Modal
				open={isShow}
				title={updateId ? "????????????" : "????????????"}
				mask
				maskClosable={false}
				closable={false}
				confirmLoading={addLoading || creatLoading}
				onOk={submitForm}
				onCancel={resetModal}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						required
						rules={[{ required: true, message: "??????????????????????????????" }]}
						label='????????????'
						name='taskName'
					>
						<Input size='large' type='text' placeholder='???????????????????????????' />
					</Form.Item>
					<Form.Item
						required
						rules={[{ required: true, message: "?????????????????????" }]}
						label='?????????'
						name='adminName'
					>
						<Input size='large' type='adminName' placeholder='????????????????????????' />
					</Form.Item>
					<Form.Item
						required
						rules={[{ required: true, message: "???????????????????????????" }]}
						label='???????????????'
						name='emails'
					>
						<Input size='large' type='emails' placeholder='???????????????????????????????????????","??????' />
					</Form.Item>
					<Form.Item
						required={updateId ? false : true}
						rules={updateId ? [] : [{ required: true, message: "????????????????????????" }]}
						valuePropName='fileList'
						getValueFromEvent={normFile}
						label='????????????'
						name='terminalFile'
					>
						<Upload maxCount={1} accept='.xls,.xlsx' beforeUpload={uploadExcel}>
							<Button icon={<UploadOutlined />}>????????????</Button>
						</Upload>
					</Form.Item>
				</Form>
				<ListTemplate>*????????????*</ListTemplate>
				<img src={ListTemplatePNG} alt='????????????' />
				<Tips>
					<TipsTitle>*??????*</TipsTitle>????????????????????????????????????????????????
					<a href='https://docs.qq.com/doc/DT0xmc0h1dnFyUllB?_t=1676259188748' target='_blank'>
						????????????
					</a>
				</Tips>
			</Modal>
		)
	})
)

export default MonitorTaskModal
