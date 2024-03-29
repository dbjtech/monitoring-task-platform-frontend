import { useAppDispatch } from "@/hooks/reduxHooks"
import { MonitorTask, MonitorTaskParams } from "@/services/monitor/monitor.model"
import { addMonitorTask, updateMonitorTask } from "@/services/monitor/monitor.service"
import { getMonitorTaskThunk } from "@/store/monitor/monitor.slice"
import { UploadOutlined } from "@ant-design/icons"
import { useRequest } from "ahooks"
import { Button, Checkbox, Form, Input, InputNumber, Modal, Switch, Upload } from "antd"
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
		const [pingInterval, setPingInterval] = useState<number>(30)

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
					params.locationSwitchStatus = values.locationSwitchStatus ? 1 : 0
					values.pingInterval ? (params.pingInterval = pingInterval.toString()) : (params.pingInterval = "")
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
				initData &&
					form.setFieldsValue({
						...initData,
						locationSwitchStatus: Number(initData.locationSwitchStatus) ? true : false,
						pingInterval: initData.pingInterval ? true : false
					})
				setPingInterval(Number(initData?.pingInterval) || 30)
			}
		}))

		return (
			<Modal
				open={isShow}
				title={updateId ? "修改任务" : "新建任务"}
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
						rules={[{ required: true, message: "监控任务名称不能为空" }]}
						label='任务名称'
						name='taskName'
					>
						<Input size='large' type='text' placeholder='请输入监控任务名称' />
					</Form.Item>
					<Form.Item
						required
						rules={[{ required: true, message: "管理员不能为空" }]}
						label='管理员'
						name='adminName'
					>
						<Input size='large' type='adminName' placeholder='请输入任务管理员' />
					</Form.Item>
					<Form.Item
						required
						rules={[{ required: true, message: "邮件接收人不能为空" }]}
						label='邮件接收人'
						name='emails'
					>
						<Input size='large' type='emails' placeholder='如有多个邮箱中间用英文逗号","隔开' />
					</Form.Item>
					<Form.Item
						required={updateId ? false : true}
						rules={updateId ? [] : [{ required: true, message: "请上传监控设备表" }]}
						valuePropName='fileList'
						getValueFromEvent={normFile}
						label='设备列表'
						name='terminalFile'
					>
						<Upload maxCount={1} accept='.xls,.xlsx' beforeUpload={uploadExcel}>
							<Button icon={<UploadOutlined />}>上传设备</Button>
						</Upload>
					</Form.Item>
					<Form.Item label='拉直线开关' required name='locationSwitchStatus' valuePropName='checked'>
						<Switch checkedChildren='开启' unCheckedChildren='关闭' defaultChecked />
					</Form.Item>
					<Form.Item name='pingInterval' valuePropName='checked'>
						<Checkbox>
							Ping终端周期
							<InputNumber
								value={pingInterval}
								size='small'
								min={10}
								onChange={e => {
									setPingInterval(e || 10)
								}}
							/>
							min （仅支持MQTT协议）
						</Checkbox>
					</Form.Item>
				</Form>
				<ListTemplate>*文件模板*</ListTemplate>
				<img src={ListTemplatePNG} alt='列表模板' />
				<Tips>
					<TipsTitle>*注意*</TipsTitle>：创建任务后请及时做数据转发配置
					<a href='https://docs.qq.com/doc/DT0xmc0h1dnFyUllB?_t=1676259188748' target='_blank'>
						参考手册
					</a>
				</Tips>
			</Modal>
		)
	})
)

export default MonitorTaskModal
