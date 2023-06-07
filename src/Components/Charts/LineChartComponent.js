import React from 'react'
import '../ThemeItem/ThemeItem.scss'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import CustomChartToolTip from './ToolTips/CustomChartToolTip'
import { charts_colors, keys_translaltion_dictionary } from '../../global_vars'

function LineChartComponent(props) {
	let { legendsFilter, chartData, XAxisKey, lineKeys } = props

	let lines
	if (Array.isArray(lineKeys)) {
		lines = lineKeys.map((item, index) => {
			return (
				<Line
					name={keys_translaltion_dictionary[item] || item}
					key={item + index}
					type={'monotone'}
					dataKey={item}
					stroke={charts_colors[index]}
				/>
			)
		})
	} else {
		lines = (
			<Line
				name={keys_translaltion_dictionary[lineKeys] || lineKeys}
				type={'monotone'}
				dataKey={lineKeys}
				stroke={charts_colors[0]}
			/>
		)
	}

	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				margin={{
					top: 5,
					right: 5,
					bottom: 5,
					left: 30,
				}}
				width={642}
				height={250}
				data={chartData}
			>
				{/*{*/}
				{/*  !legendsFilter.includes('positive') ?*/}
				{/*    <Line type={'monotone'} dataKey={'positive'} stroke={'#8fc144'}/>*/}
				{/*    :*/}
				{/*    ''*/}
				{/*}*/}
				{/*{*/}
				{/*  !legendsFilter.includes('mentions') ?*/}
				{/*    <Line type={'monotone'} dataKey={'mentions'} stroke={'#4779d0'}/>*/}
				{/*    :*/}
				{/*    ''*/}
				{/*}*/}
				{/*{*/}
				{/*  !legendsFilter.includes('negative') ?*/}
				{/*    <Line type={'monotone'} dataKey={'negative'} stroke={'#cf6662'}/>*/}
				{/*    :*/}
				{/*    ''*/}
				{/*}*/}
				{lines}
				<CartesianGrid stroke={'#b6b6b6'} />
				<XAxis dataKey={XAxisKey} />
				<YAxis />
				<Tooltip content={<CustomChartToolTip />} />
				<Legend verticalAlign="bottom" height={36} />
			</LineChart>
		</ResponsiveContainer>
	)
}

export default LineChartComponent
