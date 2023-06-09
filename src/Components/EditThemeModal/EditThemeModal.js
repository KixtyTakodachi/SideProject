import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Input, Modal, Upload, Form } from 'antd'
import { useStore } from '../../store/store'
import './EditThemeModal.scss'
import { default as localeRu } from 'antd/es/date-picker/locale/ru_RU'
import { UploadOutlined } from '@ant-design/icons'
import { date_format } from '../../global_vars'

const initialValues = {
	date: '',
	file: '',
}

function EditThemeModal(props) {
	const { isVisible, title, alias, setEditModalProps } = props

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
		sendUpdateTheme(alias, values.date.format(date_format), values.file.file)
	}

	return (
		<Modal
			title="Редактировать тему"
			open={isVisible}
			onCancel={onCancel}
			footer={[
				<Button key="cancel_button" onClick={onCancel}>
					Cancel
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
			>
				<Form.Item>
					{/*<Input data-field={'title'} addonBefore={'Title'} onChange={changeValue} />*/}
					<div className="form_theme_title">{`Тема: ${title}`}</div>
				</Form.Item>
				<Form.Item name={'date'}>
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
	)
}

export default EditThemeModal
