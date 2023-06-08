import React, { useEffect, useState } from 'react'
import { Input, Modal } from 'antd'
import { useStore } from '../../store/store'
import './CreateThemeModal.scss'

function CreateThemeModal(props) {
	const isModalVisible = useStore((state) => state.isModalVisible)
	const hideCreateModal = useStore((state) => state.hideCreateModal)
	const sendCreateTheme = useStore((state) => state.sendCreateTheme)

	const [inputValues, setInputValues] = useState({ title: '', alias: '' })

	const changeInputValue = (e) => {
		setInputValues({
			...inputValues,
			[e.target.dataset.field]: e.target.value,
		})
	}

	const onOk = () => {
		sendCreateTheme(inputValues.title, inputValues.alias)
	}

	const onCancel = () => {
		setInputValues({
			title: '',
			alias: '',
		})
		hideCreateModal()
	}

	useEffect(() => {
		if (isModalVisible) {
			setInputValues({
				title: '',
				alias: '',
			})
		}
	}, [isModalVisible])

	return (
		<Modal title="Добавить новую тему" open={isModalVisible} onCancel={onCancel} onOk={onOk}>
			<Input
				data-field={'title'}
				className="modal_input"
				value={inputValues.title}
				addonBefore={'Title:'}
				onChange={changeInputValue}
			/>
			<Input
				data-field={'alias'}
				className="modal_input"
				value={inputValues.alias}
				addonBefore={'Alias:'}
				onChange={changeInputValue}
			/>
		</Modal>
	)
}

export default CreateThemeModal
