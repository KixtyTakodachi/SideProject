import React from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import CustomChartToolTip from './ToolTips/CustomChartToolTip'
import { charts_colors, keys_translaltion_dictionary } from '../../global_vars'

function BarChartComponent(props) {
	const { legendsFilter, barChartData, barKeys, XAxisKey } = props

	let bars
	if (Array.isArray(barKeys)) {
		bars = barKeys.map((item, index) => {
			return (
				<Bar
					name={keys_translaltion_dictionary[item] || item}
					key={item + index}
					type={'monotone'}
					dataKey={item}
					fill={charts_colors[index]}
					stackId="a"
				/>
			)
		})
	} else {
		bars = (
			<Bar
				name={keys_translaltion_dictionary[barKeys] || barKeys}
				type={'monotone'}
				dataKey={barKeys}
				fill={charts_colors[0]}
			/>
		)
	}

	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				margin={{
					top: 5,
					right: 5,
					bottom: 5,
					left: 85,
				}}
				layout={'vertical'}
				width={642}
				height={250}
				data={barChartData}
			>
				{/*{!legendsFilter.includes('positive') ? (*/}
				{/*	<Bar type={'monotone'} dataKey={'positive'} fill={'#8fc144'} />*/}
				{/*) : (*/}
				{/*	''*/}
				{/*)}*/}
				{/*{!legendsFilter.includes('mentions') ? (*/}
				{/*	<Bar type={'monotone'} dataKey={'mentions'} fill={'#4779d0'} />*/}
				{/*) : (*/}
				{/*	''*/}
				{/*)}*/}
				{/*{!legendsFilter.includes('negative') ? (*/}
				{/*	<Bar type={'monotone'} dataKey={'negative'} fill={'#cf6662'} />*/}
				{/*) : (*/}
				{/*	''*/}
				{/*)}*/}
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" />
				<YAxis type="category" dataKey={XAxisKey} />
				<Tooltip content={<CustomChartToolTip />} />
				<Legend verticalAlign="bottom" height={36} />
				{bars}
			</BarChart>
		</ResponsiveContainer>
	)
}

export default BarChartComponent
