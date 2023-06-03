import React from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import PieChartToolTip from './ToolTips/PieChartToolTip'

const pie_colors = {
	positive: '#8fc144',
	negative: '#cf6662',
	neitral: '#4779d0',
}

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
					return <Cell key={`cell_${index}`} fill={pie_colors[entry.name]} />
				})}
			</Pie>
			<Tooltip content={<PieChartToolTip />} />
		</PieChart>
	)
}

export default PieChartComponent
