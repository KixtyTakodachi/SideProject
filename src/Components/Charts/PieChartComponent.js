import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import PieChartToolTip from './ToolTips/PieChartToolTip'
import { charts_colors, keys_translaltion_dictionary } from '../../global_vars'

function PieChartComponent(props) {
	const { pieChartData } = props
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart width={700} height={250}>
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
						return (
							<Cell
								name={keys_translaltion_dictionary[entry.name] || entry.name}
								key={`cell_${index}`}
								fill={charts_colors[index]}
							/>
						)
					})}
				</Pie>
				<Tooltip content={<PieChartToolTip />} />
				<Legend verticalAlign="bottom" height={36} />
			</PieChart>
		</ResponsiveContainer>
	)
}

export default PieChartComponent
