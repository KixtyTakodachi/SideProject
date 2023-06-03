import React from 'react'
import '../ThemeItem/ThemeItem.scss'
import LineChartComponent from './LineChartComponent'
import PieChartComponent from './PieChartComponent'
import {
	tab_data_dictionary,
	tab_line_data_dictionary,
	tab_pie_data_dictionary,
} from './tab_data_dictionary'

function ChartsManager(props) {
	const { activeTab, chartData, pieChartData, legendsFilter } = props
	const chartDataByTab = chartData[tab_line_data_dictionary[activeTab]]
	let pieChartDataByTab = chartData[tab_pie_data_dictionary[activeTab]]
	switch (activeTab) {
		case '0': {
			return (
				<>
					<div className="chart_wrapper">
						<h1 className="chart_title">Количество упоминаний</h1>
						<LineChartComponent
							XAxisKey={'rounded_timestamp'}
							lineKeys={'count_mentions'}
							legendsFilter={legendsFilter}
							chartData={chartDataByTab}
						/>
					</div>
					<div className="chart_wrapper">
						<h1 className="chart_title">Вовлеченность</h1>
						<LineChartComponent
							XAxisKey={'rounded_timestamp'}
							lineKeys={'sum_er'}
							legendsFilter={legendsFilter}
							chartData={chartDataByTab}
						/>
					</div>
					<div className="chart_wrapper">
						<h1 className="chart_title">Аудитория</h1>
						<LineChartComponent
							XAxisKey={'rounded_timestamp'}
							lineKeys={'sum_audience'}
							legendsFilter={legendsFilter}
							chartData={chartDataByTab}
						/>
					</div>
				</>
			)
		}
		case '2': {
			let formattedPieChartData = []

			Object.keys(pieChartDataByTab[0]).forEach((item) => {
				if (pieChartDataByTab[0][`${item}_percent`]) {
					formattedPieChartData.push({
						name: item,
						value: Math.round(+pieChartDataByTab[0][`${item}_percent`]),
					})
				}
			})
			return (
				<>
					<div className="chart_wrapper">
						<h1 className="chart_title">Динамика упоминаний</h1>
						<LineChartComponent
							XAxisKey={'rounded_timestamp'}
							lineKeys={['neitral', 'positive', 'negative']}
							chartData={chartDataByTab}
						/>
					</div>
					<div className="chart_wrapper">
						<h1 className="chart_title">Распределение тональности</h1>
						<PieChartComponent pieChartData={formattedPieChartData} />
					</div>
				</>
			)
		}
		case '3': {
			return (
				<>
					<div className="chart_wrapper">
						<h1 className="chart_title">Динамика упоминаний</h1>
						<LineChartComponent
							XAxisKey={'rounded_timestamp'}
							lineKeys={[
								'Al-Hilal',
								'Alfabank Kazakhstan',
								'ForteBank',
								'Halyk bank',
								'Kaspi Bank',
								'Береке банк',
								'ВТБ Казахстан',
								'Евразийский банк',
								'Отбасы банк',
							]}
							chartData={chartDataByTab}
						/>
					</div>
				</>
			)
		}
		default: {
			return (
				<>
					<div className="chart_wrapper">
						<h1 className="chart_title">Количество упоминаний</h1>
						<LineChartComponent legendsFilter={legendsFilter} chartData={chartData} />
					</div>
					<div className="chart_wrapper">
						<h1 className="chart_title">Вовлеченность</h1>
						<LineChartComponent legendsFilter={legendsFilter} chartData={chartData} />
					</div>
					<div className="chart_wrapper">
						<h1 className="chart_title">Аудитория</h1>
						<LineChartComponent legendsFilter={legendsFilter} chartData={chartData} />
					</div>
					<div className="chart_wrapper">
						<h1 className="chart_title">Распределение тональности</h1>
						<PieChartComponent pieChartData={pieChartData} />
					</div>
				</>
			)
		}
	}
}

export default ChartsManager
