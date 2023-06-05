import React from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import PieChartToolTip from './ToolTips/PieChartToolTip'
import { charts_colors } from '../../global_vars'

function PieChartComponent(props) {
	const { pieChartData } = props
	return (
		<PieChart width={642} height={230}>
			<Pie
				dataKey="value"
				isAnimationActive
				data={pieChartData}
				cx={'50%'}
				cy={'50%'}
				fill={'#8884d8'}
				label
			>
				{pieChartData.map((entry, index) => {
					return <Cell key={`cell_${index}`} fill={charts_colors[index]} />
				})}
			</Pie>
			<Tooltip content={<PieChartToolTip />} />
			<Legend verticalAlign="bottom" height={36} />
		</PieChart>
	)
}

export default PieChartComponent
