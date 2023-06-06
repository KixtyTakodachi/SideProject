import React from 'react'
import { useStore } from '../../../store/store'
import { ru_kz_dict } from '../../../dictionaries/ru_kz_dict'
import { keys_translaltion_dictionary } from '../../../global_vars'

function PieChartToolTip({ active, payload }) {
	const language = useStore((state) => state.language)

	if (active && payload && payload.length > 0) {
		return (
			<div className="chart_tooltip">
				{payload[0] ? (
					<div className="chart_tooltip_text">
						{`${keys_translaltion_dictionary[payload[0].name] || payload[0].name}: ${
							payload[0].value
						}`}
					</div>
				) : (
					''
				)}
			</div>
		)
	}
}
export default PieChartToolTip
