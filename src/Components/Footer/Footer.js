import React from 'react'
import { useStore } from '../../store/store'
import './Footer.scss'
import { ru_kz_dict } from '../../dictionaries/ru_kz_dict'

export default function Footer() {
	const language = useStore((state) => state.language)

	const supportRedir = () => {
		window.location.replace(window.location.origin + '/help')
	}

	return (
		<div className="footer">
			<div className="container">
				<div className="footer_wrapper">
					<div className="footer_support" onClick={supportRedir}>
						{ru_kz_dict.tech_sup[language]}
					</div>
					<div className="footer_copyright">©2022 SCAN</div>
				</div>
			</div>
		</div>
	)
}
