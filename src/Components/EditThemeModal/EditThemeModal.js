import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Input, Modal, Upload, Form, notification } from 'antd'
import { useStore } from '../../store/store'
import './EditThemeModal.scss'
import { default as localeRu } from 'antd/es/date-picker/locale/ru_RU'
import { UploadOutlined } from '@ant-design/icons'
import { date_format } from '../../global_vars'

const initialValues = {
	from_date: '',
	to_date: '',
	file: '',
}

function EditThemeModal(props) {
	const { isVisible, title, alias, setEditModalProps } = props

	const resetUpdateRes = useStore(state => state.resetUpdateRes)
	const updateRes = useStore(state => state.updateRes)
	const [api, contextHolder] = notification.useNotification()

	const openNotificationWithIcon = (type) => {
		api[type]({
			message: type === 'success' ? 'Success' : 'Error',
			description: type === 'success' ? 'Theme data uploaded!' : 'Something went wrong...',
			onClose: resetUpdateRes,
		})
	}
	useEffect(() => {
		if(updateRes){
			openNotificationWithIcon(updateRes)
		}
	},[updateRes])

	const sendUpdateTheme = useStore((state) => state.sendUpdateTheme)

	const [form] = Form.useForm()

	const onCancel = () => {
		form.resetFields()
		setEditModalProps({
			visible: false,
			alias: '',
			title: '',
		})
	}

	const changeValue = (e) => {}

	const onOk = (values) => {
		sendUpdateTheme(
			alias,
			values.from_date.format(date_format),
			values.to_date ? values.to_date.format(date_format) : '',
			values.file.file,
		)
	}

	const onReset = () => {
		form.resetFields()
	}

	return (
		<>
			{contextHolder}
			<Modal
				title="Редактировать тему"
				open={isVisible}
				onCancel={onCancel}
				footer={[
					<Button key="cancel_button" onClick={onCancel}>
						Cancel
					</Button>,
					<Button key="reset_button" onClick={onReset}>
						Reset
					</Button>,
					<Button key="upload_button" form="uploadFileForm" type="primary" htmlType="submit">
						Upload
					</Button>,
				]}
			>
				<Form
					initialValues={initialValues}
					form={form}
					onFinish={onOk}
					name="uploadFileForm"
					id="uploadFileForm"
					labelCol={{
						span: 2,
					}}
				>
					<Form.Item>
						{/*<Input data-field={'title'} addonBefore={'Title'} onChange={changeValue} />*/}
						<div className="form_theme_title">{`Тема: ${title}`}</div>
					</Form.Item>
					<Form.Item
						label={'От'}
						name={'from_date'}
						rules={[
							{
								required: true,
								message: 'Укажите дату',
							},
						]}
					>
						<DatePicker onChange={changeValue} locale={localeRu} />
					</Form.Item>
					<Form.Item label={'До'} name={'to_date'}>
						<DatePicker onChange={changeValue} locale={localeRu} />
					</Form.Item>
					<Form.Item name={'file'} valuePropName={'file'}>
						<Upload beforeUpload={() => false}>
							<Button icon={<UploadOutlined />}>Выберите файл</Button>
						</Upload>
					</Form.Item>
				</Form>

				{/*<Input data-field={'title'} value={title} addonBefore={'Title'} onChange={changeValue} />*/}
				{/*<DatePicker onChange={changeValue} locale={localeRu} />*/}
				{/*<Upload beforeUpload={() => false}>*/}
				{/*	<Button icon={<UploadOutlined />}>Выберите файл</Button>*/}
				{/*</Upload>*/}
			</Modal>
		</>
	)
}

export default EditThemeModal
