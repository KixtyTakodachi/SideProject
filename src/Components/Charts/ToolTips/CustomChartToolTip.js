import React from 'react'
import { useStore } from '../../../store/store'
import { ru_kz_dict } from '../../../dictionaries/ru_kz_dict'
import { keys_translaltion_dictionary } from '../../../global_vars'

function CustomChartToolTip({ active, payload, label }) {
	const language = useStore((state) => state.language)

	if (active && payload && payload.length > 0) {
		return (
			<div className="chart_tooltip">
				<div className="chart_tooltip_text">
					{(language === 'ru' ? 'Время: ' : 'Уақыт: ') + label}
				</div>
				{payload.map((item) => (
					<div key={item.name} className="chart_tooltip_text">{`${
						keys_translaltion_dictionary[item.name] || item.name
					}: ${item.value}`}</div>
				))}
			</div>
		)
	}
}

export default CustomChartToolTip
