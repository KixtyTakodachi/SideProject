import React from 'react'
import '../ThemeItem/ThemeItem.scss'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import CustomChartToolTip from './ToolTips/CustomChartToolTip'
import { charts_colors } from '../../global_vars'

function LineChartComponent(props) {
	let { legendsFilter, chartData, XAxisKey, lineKeys } = props

	let lines
	if (Array.isArray(lineKeys)) {
		lines = lineKeys.map((item, index) => {
			return (
				<Line key={item + index} type={'monotone'} dataKey={item} stroke={charts_colors[index]} />
			)
		})
	} else {
		lines = <Line type={'monotone'} dataKey={lineKeys} stroke={charts_colors[0]} />
	}

	return (
		<LineChart width={642} height={200} data={chartData}>
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
		</LineChart>
	)
}

export default LineChartComponent
