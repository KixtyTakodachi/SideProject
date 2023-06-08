import React, { useState } from 'react'
import './Header.scss'
import logo from '../../img/blank.svg'
import avatar from '../../img/avatar.svg'
import { PlusCircleOutlined, ExportOutlined } from '@ant-design/icons'
import { useStore } from '../../store/store'
import { Link } from 'react-router-dom'
import { ru_kz_dict } from '../../dictionaries/ru_kz_dict'
import { Popover } from 'antd'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const language = useStore((state) => state.language)
	const changeLanguage = useStore((state) => state.changeLanguage)
	const page = useStore((state) => state.active_page)
	const changeActivePage = useStore((state) => state.changePage)
	const showCreateModal = useStore((state) => state.showCreateModal)

	const menuClick = (page) => {
		changeActivePage(page)
		// if(!window.location.href.includes(page)){
		//     window.location.replace(window.location.origin + `/${page}`)
		// }
	}

	const profileMenuClick = (path) => {
		window.location.replace(window.location.origin + `/${path}`)
	}

	const content = (
		<ul className={['header_user_menu', 'active'].join(' ')}>
			<div className="divider"></div>
			<li className="header_user_menu_item" onClick={showCreateModal}>
				<PlusCircleOutlined style={{ color: '#007eff' }} /> Добавить новую тему
			</li>
			<li
				className="header_user_menu_item"
				onClick={() => {
					profileMenuClick('login')
				}}
			>
				<ExportOutlined style={{ color: '#007eff' }} /> {ru_kz_dict.exit[language]}
			</li>
		</ul>
	)

	return (
		<div className="header">
			<div className="container">
				<div className="header_wrapper">
					<div className="header_logo_wrapper">
						{/*<img src={logo} className='header_logo' alt='logo'/>*/}
						<div className="header_logo_title">SCAN</div>
					</div>
					<ul className="header_menu">
						<Link to="/themes" style={{ textDecoration: 'none' }}>
							<li
								className={['header_menu_item', page === 'themes' ? 'active_menu_item' : ''].join(
									' ',
								)}
								onClick={() => menuClick('themes')}
							>
								{ru_kz_dict.temi[language]}
							</li>
						</Link>
						<li
							className={['header_menu_item', page === 'settings' ? 'active_menu_item' : ''].join(
								' ',
							)}
							onClick={() => menuClick('settings')}
						>
							{ru_kz_dict.settings[language]}
						</li>
						<li
							className={['header_menu_item', page === 'help' ? 'active_menu_item' : ''].join(' ')}
							onClick={() => menuClick('help')}
						>
							{ru_kz_dict.help[language]}
						</li>
					</ul>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div className="header_user_wrapper">
							<div className="header_user_img_wrapper">
								<img src={avatar} className="header_user_img" alt="avatar" />
							</div>
							<div className="header_user_login">16goncharova@gmail.com</div>
							<Popover content={content} title={'16goncharova@gmail.com'} trigger={'click'}>
								<div className="header_user_menu_button"></div>
							</Popover>
						</div>
						<div className="header_language">
							<div
								className={[
									'header_language_item',
									language === 'ru' ? 'language_active' : '',
								].join(' ')}
								onClick={() => changeLanguage('ru')}
							>
								Ру
							</div>
							/
							<div
								className={[
									'header_language_item',
									language === 'kz' ? 'language_active' : '',
								].join(' ')}
								onClick={() => changeLanguage('kz')}
							>
								Кз
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
