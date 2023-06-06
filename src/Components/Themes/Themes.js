import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useStore } from '../../store/store'
import { Select, Button, Table } from 'antd'
import { EditOutlined, PauseOutlined, DeleteOutlined } from '@ant-design/icons'
import './Themes.scss'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { ru_kz_dict } from '../../dictionaries/ru_kz_dict'
import { themes_dict } from '../../dictionaries/themes_dict'

export default function Themes() {
	const active_month_year = useStore((state) => state.active_month_year)
	const dataSource = useStore((state) => state.dataSource)
	const language = useStore((state) => state.language)
	const changeActiveTheme = useStore((state) => state.changeActiveTheme)
	const getThemes = useStore((state) => state.getThemes)

	const [tableData, setTableData] = useState(dataSource)
	useEffect(() => {
		if (Object.keys(dataSource).length === 0) {
			getThemes()
		}
	}, [])
	useEffect(() => setTableData(dataSource), [dataSource])

	const select_options = [
		{
			label: ru_kz_dict.all_groups[language],
			value: 'all',
		},
		{
			label: ru_kz_dict.commercial[language],
			value: 'commercial',
		},
		{
			label: 'Демо',
			value: 'demo',
		},
	]
	const columns = [
		{
			title: '#',
			dataIndex: 'id',
			key: 'id',
		},
		// {
		//     title: '',
		//     dataIndex: 'type',
		//     key: 'type',
		//     render: (_, record) => (
		//         <div className='themes_table_type'>
		//             {
		//                 record.type === 'СМ' ?
		//                     ru_kz_dict.sm[language]
		//                 :
		//                     ru_kz_dict.smi[language]
		//             }
		//             <div className='themes_table_type_tooltip'>
		//                 {
		//                     record.type === 'СМ' ?
		//                             ru_kz_dict.sm_tooltip[language]
		//
		//                         :
		//                             ru_kz_dict.smi_tooltip[language]
		//
		//                 }
		//             </div>
		//         </div>
		//     )
		// },
		{
			title: ru_kz_dict.title[language],
			key: 'title',
			render: (_, record) => (
				<div>
					<Link to={`./${record.alias}`}>
						<div className="themes_table_name" onClick={() => chooseTheme(record.alias)}>
							{record.title}
						</div>
					</Link>
					{/*<div>{language === 'ru' ?*/}
					{/*    ru_kz_dict.dannie.ru + record.date_from*/}
					{/*    :*/}
					{/*    ru_kz_dict.dannie.kz.slice(0,9) + record.date_from + ru_kz_dict.dannie.kz.slice(9)*/}
					{/*}</div>*/}
				</div>
			),
		},
		{
			title: ru_kz_dict.actions[language],
			key: 'action',
			render: (_, record) => (
				<div className="themes_table_button_wrapper">
					<Button className="themes_table_button" onClick={() => editRecord(record)}>
						<EditOutlined />
						<div className="themes_table_button_tooltip">{ru_kz_dict.edit_tooltip[language]}</div>
					</Button>
					<Button className="themes_table_button" onClick={() => stopRecord(record)}>
						<PauseOutlined />
						<div className="themes_table_button_tooltip">{ru_kz_dict.stop_tooltip[language]}</div>
					</Button>
					<Button className="themes_table_button" onClick={() => deleteRecord(record)}>
						<DeleteOutlined />
						<div className="themes_table_button_tooltip">{ru_kz_dict.delete_tooltip[language]}</div>
					</Button>
				</div>
			),
		},
	]

	const addNewTheme = () => {
		console.log('Add theme button clicked')
	}

	const editRecord = (record) => {
		console.log('editRecord clicked record:', record)
	}

	const stopRecord = (record) => {
		console.log('stopRecord clicked record:', record)
	}

	const deleteRecord = (record) => {
		console.log('deleteRecord clicked record:', record)
	}

	const selectChange = (value) => {
		if (value === 'all') {
			setTableData(dataSource)
		} else {
			setTableData(dataSource.filter((item) => item.group_type === value))
		}
	}

	const chooseTheme = (id) => {
		// changeActiveTheme(themes_dict[dataSource.find(item => item.id === id).name])
		changeActiveTheme(id)
	}

	return (
		<div className="themes">
			<Header />
			<div className="container">
				<div className="themes_header">
					<h1 className="themes_header_title">{ru_kz_dict.temi[language]}</h1>
					<Select
						className="themes_select"
						defaultValue={'all'}
						options={select_options}
						onChange={selectChange}
					/>
					<Button className="themes_header_button" type="primary" onClick={addNewTheme}>
						{ru_kz_dict.add_theme[language]}
					</Button>
				</div>
				<Table
					pagination={false}
					dataSource={tableData}
					columns={columns}
					loading={dataSource.length === 0}
				/>
			</div>
			<Footer />
		</div>
	)
}

function TableName(props) {
	const { id, name, chooseTheme } = props
	return (
		<div className="themes_table_name" onClick={() => chooseTheme(id)}>
			{name}
		</div>
	)
}
