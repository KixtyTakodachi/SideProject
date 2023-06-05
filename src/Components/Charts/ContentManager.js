import React from 'react'
import '../ThemeItem/ThemeItem.scss'
import LineChartComponent from './LineChartComponent'
import PieChartComponent from './PieChartComponent'
import {
	tab_bar_data_dictionary,
	tab_data_dictionary,
	tab_line_data_dictionary,
	tab_pie_data_dictionary,
	tab_table_data_dictionary,
} from './tab_data_dictionary'
import BarChartComponent from './BarChartComponent'
import TableComponent from './TableComponent'
import { tab } from '@testing-library/user-event/dist/tab'

function ContentManager(props) {
	const { activeTab, chartData, pieChartData, legendsFilter } = props
	let chartDataByTab = chartData[tab_line_data_dictionary[activeTab]]
	if (chartDataByTab) {
		chartDataByTab = chartDataByTab.map((item) => {
			return {
				...item,
				count_authors: +item.count_authors,
				count_mentions: +item.count_mentions,
				sum_audience: +item.sum_audience,
				sum_er: +item.sum_er,
			}
		})
	}
	let pieChartDataByTab = chartData[tab_pie_data_dictionary[activeTab]]
	let barChartDataByTab = chartData[tab_bar_data_dictionary[activeTab]]
	let tableData = chartData[tab_table_data_dictionary[activeTab]]
	switch (activeTab) {
		case '0': {
			return (
				<>
					<div className="themeItem_content_chart">
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
					</div>
					<div className="themeItem_content_chart">
						<TableComponent
							tableData={tableData}
							columnsKeys={[
								'rounded_timestamp',
								'count_mentions',
								'count_authors',
								'sum_er',
								'sum_audience',
							]}
						/>
					</div>
				</>
			)
		}
		case '1': {
			return (
				<>
					<div className="themeItem_content_chart">
						<TableComponent
							tableData={tableData}
							columnsKeys={[
								'date',
								'id',
								'text',
								'hub',
								'url',
								'hubtype',
								'type',
								'author_fullname',
								'author_url',
								'author_type',
								'author_sex',
								'author_age',
								'audienceCount',
								'commentsCount',
								'repostsCount',
								'likesCount',
								'er',
								'viewsCount',
								'review_rating',
								'duplicateCount',
								'toneMark',
								'role',
								'aggression',
								'country',
								'region',
								'city',
								'geo_address',
								'language',
								'WOM',
								'processed',
							]}
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
					<div className="themeItem_content_chart">
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
					</div>
				</>
			)
		}
		case '3': {
			return (
				<>
					<div className="themeItem_content_chart">
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
					</div>
				</>
			)
		}
		case '4': {
			return (
				<>
					<div className="themeItem_content_chart">
						<div className="chart_wrapper">
							<h1 className="chart_title">Динамика упоминаний</h1>
							<LineChartComponent
								XAxisKey={'rounded_timestamp'}
								lineKeys={[
									'2gis.ru',
									'dzen.ru',
									'facebook.com',
									'instagram.com',
									'ok.ru',
									'other',
									'play.google.com',
									'telegram.org',
									'vk.com',
									'vsekz.org',
									'youtube.com',
								]}
								chartData={chartDataByTab}
							/>
						</div>
					</div>
				</>
			)
		}
		case '5': {
			let formattedPieChartData = []
			let formattedBarChartData = []

			if (pieChartDataByTab) {
				formattedPieChartData = pieChartDataByTab.map((item) => {
					return {
						name: item.author_sex,
						value: item.count_authors,
					}
				})
			}

			if (barChartDataByTab) {
				formattedBarChartData = barChartDataByTab.map((item) => {
					return {
						...item,
						percent: Math.round(+item.percent),
					}
				})
			}

			return (
				<>
					<div className="themeItem_content_chart">
						<div className="chart_wrapper">
							<h1 className="chart_title">Количество авторов по дням</h1>
							<LineChartComponent
								XAxisKey={'rounded_timestamp'}
								lineKeys={'count_authors'}
								chartData={chartDataByTab}
							/>
						</div>
						<div className="chart_wrapper">
							<h1 className="chart_title">Возраст авторов</h1>
							<BarChartComponent
								XAxisKey={'author_age'}
								barKeys={'percent'}
								barChartData={formattedBarChartData}
							/>
						</div>
						<div className="chart_wrapper">
							<h1 className="chart_title">Пол авторов</h1>
							<PieChartComponent pieChartData={formattedPieChartData} />
						</div>
					</div>
				</>
			)
		}
		case '7': {
			let countriesData = chartData.countries.map((item) => {
				return {
					name: item.country,
					value: +item.total_percent,
				}
			})
			let citiesData = chartData.cities.map((item) => {
				return {
					name: item.city,
					value: +item.total_percent,
				}
			})
			let regionsData = chartData.regions.map((item) => {
				return {
					name: item.region,
					value: +item.total_percent,
				}
			})
			return (
				<>
					<div className="themeItem_content_chart">
						<div className="chart_wrapper">
							<h1 className="chart_title">Страны</h1>
							<PieChartComponent pieChartData={countriesData} />
						</div>
						<div className="chart_wrapper">
							<h1 className="chart_title">Города</h1>
							<PieChartComponent pieChartData={citiesData} />
						</div>
						<div className="chart_wrapper">
							<h1 className="chart_title">Регионы</h1>
							<PieChartComponent pieChartData={regionsData} />
						</div>
					</div>
				</>
			)
		}
		default: {
			return (
				<>
					<div className="themeItem_content_chart">
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
					</div>
				</>
			)
		}
	}
}

export default ContentManager
