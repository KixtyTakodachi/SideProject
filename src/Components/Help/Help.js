import React from 'react'
import { Modal } from 'antd'
import { useStore } from '../../store/store'
import {
	MailOutlined,
	PhoneOutlined,
	ReadOutlined,
	CommentOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons'
import './Help.scss'

function Help(props) {
	const helpModal = useStore((state) => state.helpModal)
	const changeHelpModal = useStore((state) => state.changeHelpModal)

	return (
		<Modal
			width={620}
			footer={[]}
			open={helpModal}
			onCancel={() => changeHelpModal(false)}
			title={'Помощь'}
		>
			<div className="help_desc">
				Эксперты Scan Analytics рады помочь в решении ваших задач. Выберите удобный способ получить
				ответ на ваш вопрос:
			</div>
			<div className="help_items_wrapper">
				<div className="help_item">
					{/*FIXME if own image will be needed <img/>*/}
					<div className="help_icon">
						<MailOutlined />
					</div>
					<div className="help_item_desc_wrapper">
						<a className="help_item_title">Электронная почта</a>
						<div className="help_item_desc">
							Отправьте письмо с вопросом через веб-форму, и мы ответим вам в течение одного
							рабочего дня.
						</div>
					</div>
				</div>
				<div className="help_item">
					{/*FIXME if own image will be needed <img/>*/}
					<div className="help_icon">
						<PhoneOutlined />
					</div>
					<div className="help_item_desc_wrapper">
						<div className="help_item_title">Звонок</div>
						<div className="help_item_desc">
							Связаться со службой поддержки можно по телефону --- с 9:30 до 18:30 --- с
							понедельника по пятницу.
						</div>
					</div>
				</div>
				<div className="help_item">
					{/*FIXME if own image will be needed <img/>*/}
					<div className="help_icon">
						<ReadOutlined />
					</div>
					<div className="help_item_desc_wrapper">
						<a className="help_item_title">Руководство пользователя Scan Analytics</a>
						<div className="help_item_desc">
							Воспользуйтесь рубрикатором по функционалу системы, чтобы быстро найти ответы на
							интересующие вопросы.
						</div>
					</div>
				</div>
				<div className="help_item">
					{/*FIXME if own image will be needed <img/>*/}
					<div className="help_icon">
						<CommentOutlined />
					</div>
					<div className="help_item_desc_wrapper">
						<a className="help_item_title">Запрос на добавление источника</a>
						<div className="help_item_desc">
							Вы можете сделать запрос на индексацию источника, если его нет в нашей базе.
						</div>
					</div>
				</div>
				<div className="help_item">
					{/*FIXME if own image will be needed <img/>*/}
					<div className="help_icon">
						<CloseCircleOutlined />
					</div>
					<div className="help_item_desc_wrapper">
						<a className="help_item_title">Сообщить об ошибке</a>
						<div className="help_item_desc">Информация об ошибках обрабатывается режиме 24/7</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default Help
