import React from 'react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import CustomChartToolTip from './ToolTips/CustomChartToolTip'

function BarChartComponent(props) {
	const { legendsFilter, chartData } = props
	return (
		<BarChart width={642} height={200} data={chartData}>
			{!legendsFilter.includes('positive') ? (
				<Bar type={'monotone'} dataKey={'positive'} fill={'#8fc144'} />
			) : (
				''
			)}
			{!legendsFilter.includes('mentions') ? (
				<Bar type={'monotone'} dataKey={'mentions'} fill={'#4779d0'} />
			) : (
				''
			)}
			{!legendsFilter.includes('negative') ? (
				<Bar type={'monotone'} dataKey={'negative'} fill={'#cf6662'} />
			) : (
				''
			)}
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey={'date'} />
			<YAxis />
			<Tooltip content={<CustomChartToolTip />} />
		</BarChart>
	)
}

export default BarChartComponent
