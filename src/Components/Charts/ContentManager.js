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
import CommentComponent from '../Comment/CommentComponent'

function ContentManager(props) {
	const { activeTab, chartData, pieChartData, legendsFilter } = props
	let chartDataByTab = chartData[tab_line_data_dictionary[activeTab]]
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
					<div className="themeItem_content_tables">
						<div className="table_wrapper">
							<h1 className="chart_title">Количество упоминаний</h1>
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
					</div>
				</>
			)
		}
		case '1': {
			return (
				<>
					{/*<div className="themeItem_content_tables">*/}
					{/*	<TableComponent*/}
					{/*		tableData={tableData}*/}
					{/*		columnsKeys={[*/}
					{/*			'date',*/}
					{/*			'id',*/}
					{/*			'text',*/}
					{/*			'hub',*/}
					{/*			'url',*/}
					{/*			'hubtype',*/}
					{/*			'type',*/}
					{/*			'author_fullname',*/}
					{/*			'author_url',*/}
					{/*			'author_type',*/}
					{/*			'author_sex',*/}
					{/*			'author_age',*/}
					{/*			'audienceCount',*/}
					{/*			'commentsCount',*/}
					{/*			'repostsCount',*/}
					{/*			'likesCount',*/}
					{/*			'er',*/}
					{/*			'viewsCount',*/}
					{/*			'review_rating',*/}
					{/*			'duplicateCount',*/}
					{/*			'toneMark',*/}
					{/*			'role',*/}
					{/*			'aggression',*/}
					{/*			'country',*/}
					{/*			'region',*/}
					{/*			'city',*/}
					{/*			'geo_address',*/}
					{/*			'language',*/}
					{/*			'WOM',*/}
					{/*			'processed',*/}
					{/*		]}*/}
					{/*	/>*/}
					{/*</div>*/}
					{tableData.map((item, index) => {
						return <CommentComponent key={item.id} name={item.author_fullname} text={item.text} />
					})}
				</>
			)
		}
		case '2': {
			let formattedPieChartData = []

			Object.keys(pieChartDataByTab[0]).forEach((item) => {
				if (pieChartDataByTab[0][`${item}_percent`]) {
					formattedPieChartData.push({
						name: item,
						value: +pieChartDataByTab[0][`${item}_percent`],
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
								lineKeys={['neitral', 'negative', 'positive']}
								chartData={chartDataByTab}
							/>
						</div>
						<div className="chart_wrapper">
							<h1 className="chart_title">Распределение тональности</h1>
							<PieChartComponent pieChartData={formattedPieChartData} />
						</div>
					</div>
					<div className="themeItem_content_tables">
						<div className="table_wrapper">
							<h1 className="chart_title">Динамика упоминаний</h1>
							<TableComponent
								tableData={tableData}
								columnsKeys={['rounded_timestamp', 'neitral', 'negative', 'positive']}
							/>
						</div>
					</div>
				</>
			)
		}
		case '3': {
			const allLineKeys = Object.keys(chartDataByTab[0]).filter(
				(item) => item !== 'rounded_timestamp',
			)
			const formattedPieChartData = pieChartDataByTab
				.map((item) => {
					return {
						name: item.tag,
						value: item.total_percent,
					}
				})
				.sort(sortFunction('value'))

			const tableMentionsData = chartData.tags_total_day
			const tableMentionsHoursData = chartData.tags_top_10

			const tonalityByTag = [...barChartDataByTab.sort(sortFunction('row_number'))].filter(
				(item) => item.row_number <= 10,
			)
			const audienceByTag = [...barChartDataByTab.sort(sortFunction('audience'))].filter(
				(item) => item.row_number <= 10,
			)

			const topTenByTonality = tonalityByTag.map((item) => item.tag)
			const lineChartData = chartDataByTab.map((item) => {
				const mutatedItem = {}
				topTenByTonality.forEach((elem) => {
					mutatedItem[elem] = item[elem]
				})
				mutatedItem.rounded_timestamp = item.rounded_timestamp
				return mutatedItem
			})
			console.log(chartDataByTab)

			return (
				<>
					<div className="themeItem_content_chart">
						<div className="chart_wrapper">
							<h1 className="chart_title">Динамика упоминаний по тэгам (Топ - 10)</h1>
							<LineChartComponent
								XAxisKey={'rounded_timestamp'}
								lineKeys={allLineKeys}
								chartData={lineChartData}
							/>
						</div>
						<div className="chart_wrapper">
							<h1 className="chart_title">Количество упоминаний</h1>
							<PieChartComponent pieChartData={formattedPieChartData} />
						</div>
						<div className="chart_wrapper">
							<h1 className="chart_title">Тональность упоминания по тэгам (Топ - 10)</h1>
							<BarChartComponent
								XAxisKey={'tag'}
								barKeys={['neitral', 'negative', 'positive']}
								barChartData={tonalityByTag}
							/>
						</div>
						<div className="chart_wrapper">
							<h1 className="chart_title">Аудитория по тэгам (Топ - 10)</h1>
							<BarChartComponent
								XAxisKey={'tag'}
								barKeys={'audience'}
								barChartData={audienceByTag}
							/>
						</div>
					</div>
					<div className="themeItem_content_tables">
						<div className="table_wrapper">
							<h1 className="chart_title">Тональность упоминания по тэгам</h1>
							<TableComponent
								tableData={tableMentionsData}
								columnsKeys={['tag', 'total', 'neitral', 'negative', 'positive']}
							/>
						</div>
						<div className="table_wrapper">
							<h1 className="chart_title">Аудитория по тэгам</h1>
							<TableComponent
								tableData={tableMentionsData}
								columnsKeys={['tag', 'audience', 'er', 'total']}
							/>
						</div>
						<div className="table_wrapper">
							<h1 className="chart_title">Динамика упоминаний по тэгам</h1>
							<TableComponent
								tableData={tableMentionsHoursData}
								columnsKeys={['rounded_timestamp', ...allLineKeys]}
							/>
						</div>
					</div>
				</>
			)
		}
		case '4': {
			const second_table_data = chartData.hub_total || []
			const formattedPieChartData = pieChartDataByTab.map((item) => {
				return {
					name: item.hub,
					value: +item.total_percent,
				}
			})
			return (
				<>
					<div className="themeItem_content_chart">
						<div className="chart_wrapper">
							<h1 className="chart_title">Динамика упоминаний по источникам</h1>
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
						<div className="chart_wrapper">
							<h1 className="chart_title">Распределение по источникам</h1>
							<PieChartComponent pieChartData={formattedPieChartData} />
						</div>
					</div>

					<div className="themeItem_content_tables">
						<div className="table_wrapper">
							<h1 className="chart_title">Динамика упоминаний по источникам</h1>
							<TableComponent
								tableData={tableData}
								columnsKeys={[
									'rounded_timestamp',
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
							/>
						</div>
						<div className="table_wrapper">
							<h1 className="chart_title">Распределение по источникам</h1>
							<TableComponent
								tableData={second_table_data}
								columnsKeys={['hub', 'total', 'positive', 'neitral', 'negative']}
							/>
						</div>
					</div>
				</>
			)
		}
		case '5': {
			let formattedPieChartData = []

			if (pieChartDataByTab) {
				formattedPieChartData = pieChartDataByTab.map((item) => {
					return {
						name: item.author_sex,
						value: item.count_authors,
					}
				})
			}

			let forth_table_data = chartData.authors_by_events || []
			let fifth_table_data = chartData.authors_by_audience || []
			let sixth_table_data = chartData.authors_by_er || []

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
						{/*<div className="chart_wrapper">*/}
						{/*	<h1 className="chart_title">Возраст авторов</h1>*/}
						{/*	<BarChartComponent*/}
						{/*		XAxisKey={'author_age'}*/}
						{/*		barKeys={'percent'}*/}
						{/*		barChartData={barChartDataByTab}*/}
						{/*	/>*/}
						{/*</div>*/}
						<div className="chart_wrapper">
							<h1 className="chart_title">Пол авторов</h1>
							<PieChartComponent pieChartData={formattedPieChartData} />
						</div>
					</div>
					<div className="themeItem_content_tables">
						<div className="table_wrapper">
							<h1 className="chart_title">Количество авторов по дням</h1>
							<TableComponent
								tableData={tableData}
								columnsKeys={['rounded_timestamp', 'count_authors']}
							/>
						</div>
						{/*<div className="table_wrapper">*/}
						{/*	<h1 className="chart_title">Возраст авторов</h1>*/}
						{/*	<TableComponent*/}
						{/*		tableData={barChartDataByTab}*/}
						{/*		columnsKeys={['author_age', 'percent']}*/}
						{/*	/>*/}
						{/*</div>*/}
						<div className="table_wrapper">
							<h1 className="chart_title">Количество авторов по дням</h1>
							<TableComponent
								tableData={pieChartDataByTab}
								columnsKeys={['author_sex', 'count_authors', 'percent']}
							/>
						</div>
						<div className="table_wrapper">
							<h1 className="chart_title">Топ авторов по количеству упоминаний</h1>
							<TableComponent
								tableData={forth_table_data}
								columnsKeys={[
									'author_fullname',
									'author_url',
									'author_type',
									'total',
									'audience',
									'positive',
									'neitral',
									'negative',
								]}
							/>
						</div>
						<div className="table_wrapper">
							<h1 className="chart_title">Топ авторов по количеству аудитории</h1>
							<TableComponent
								tableData={fifth_table_data}
								columnsKeys={[
									'author_fullname',
									'author_url',
									'author_type',
									'total',
									'audience',
									'positive',
									'neitral',
									'negative',
								]}
							/>
						</div>
						<div className="table_wrapper">
							<h1 className="chart_title">Топ авторов по количеству вовлеченности</h1>
							<TableComponent
								tableData={sixth_table_data}
								columnsKeys={[
									'author_fullname',
									'author_url',
									'author_type',
									'total',
									'audience',
									'positive',
									'neitral',
									'negative',
								]}
							/>
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
			let countrieTablesData = chartData.countries
			let citieTablesData = chartData.cities
			let regionTablesData = chartData.regions

			console.log('total_with_country_percent:', chartData.geo_stat)

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
						<div className="geo_stat">{`
						Отчет по странам и городам представлен только по тем авторам, для которых есть данные по местоположению.
						Страна: ${chartData.geo_stat[0].total_with_country_percent}% от всех авторов;
						Город: ${chartData.geo_stat[0].total_with_city_percent}%;
						Регион: ${chartData.geo_stat[0].total_with_region_percent}%`}</div>
					</div>
					<div className="themeItem_content_tables">
						<div className="table_wrapper">
							<h1 className="chart_title">Страны</h1>
							<TableComponent
								tableData={countrieTablesData}
								columnsKeys={[
									'country',
									'total',
									'total_percent',
									'positive',
									'neitral',
									'negative',
								]}
							/>
						</div>
						<div className="table_wrapper">
							<h1 className="chart_title">Города</h1>
							<TableComponent
								tableData={citieTablesData}
								columnsKeys={['city', 'total', 'total_percent', 'positive', 'neitral', 'negative']}
							/>
						</div>
						<div className="table_wrapper">
							<h1 className="chart_title">Регионы</h1>
							<TableComponent
								tableData={regionTablesData}
								columnsKeys={[
									'region',
									'total',
									'total_percent',
									'positive',
									'neitral',
									'negative',
								]}
							/>
						</div>
					</div>
				</>
			)
		}
		case '12': {
			const formattedTableData = tableData.map((item) => {
				return {
					...item,
					geo_title: item.geo_title.includes('span')
						? item.geo_title
								.match(/[\wа-я]+,|>[\wа-я]+</gi)
								.map((item) => item.match(/[\wа-я]+/i)[0])
								.join(', ')
						: item.geo_title,
				}
			})

			return (
				<>
					<div className="themeItem_content_tables">
						<div className="table_wrapper">
							<h1 className="chart_title">Места</h1>
							<TableComponent
								tableData={tableData}
								columnsKeys={[
									'#',
									'geo_title',
									'geo_address',
									'total',
									'er',
									'positive',
									'neitral',
									'negative',
								]}
							/>
						</div>
					</div>
				</>
			)
		}
		default: {
			return (
				<>
					<div className="themeItem_content_chart">No data yet</div>
				</>
			)
		}
	}
}

export default ContentManager

function sortFunction(prop) {
	return (a, b) => {
		return a[prop] - b[prop]
	}
}
