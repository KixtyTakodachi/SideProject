import React, {useState} from 'react'
import Header from "../Header/Header";
import {useStore} from "../../store/store";
import {Select, Button, Table} from "antd";
import { EditOutlined, PauseOutlined, DeleteOutlined} from '@ant-design/icons'
import './Themes.scss'
import Footer from "../Footer/Footer";

export default function Themes(){

    const dataSource = [
        {
            id: 1,
            type: 'СМ',
            name: 'Test 1',
            date_from: '2022-01-01',
            group_type: 'commercial'
        },
        {
            id: 2,
            type: 'СМИ',
            name: 'Test 2',
            date_from: '2022-01-02',
            group_type: 'demo'
        },
        {
            id: 3,
            type: 'СМ',
            name: 'Test 3',
            date_from: '2022-01-03',
            group_type: 'commercial'
        },
        {
            id: 4,
            type: 'СМИ',
            name: 'Test 4',
            date_from: '2022-01-04',
            group_type: 'demo'
        },
        {
            id: 5,
            type: 'СМ',
            name: 'Test 5',
            date_from: '2022-01-05',
            group_type: 'commercial'
        },
    ]

    const language = useStore(state => state.language)

    const [tableData, setTableData] = useState(dataSource)

    const select_options = [
        {
            label: language === 'Ru' ? 'Все группы' : 'Барлық топтар',
            value: 'all'
        },
        {
            label: language === 'Ru' ? 'Коммерческие' : 'Коммерциялық',
            value: 'commercial'
        },
        {
            label: language === 'Ru' ? 'Демо' : 'Демо',
            value: 'demo'
        }
    ]

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => (
                <div className='themes_table_type'>
                    {record.type}
                    <div className='themes_table_type_tooltip'>
                        {
                            record.type === 'СМ' ?
                                language === 'Ru' ?
                                    'Социальные медиа и онлайн-СМИ'
                                    :
                                    'Әлеуметтік медиа және желілік медиа'
                                :
                                language === 'Ru' ?
                                    'Онлайн-СМИ, пресса, ТВ, радио'
                                    :
                                    'Онлайн БАҚ, баспасөз, теледидар, радио'
                        }
                    </div>
                </div>
            )
        },
        {
            title: language === 'Ru' ? 'Название' : 'Аты',
            key: 'name',
            render: (_, record) => (
                <div>
                    <a>{record.name}</a>
                    <div>{language === 'Ru' ?
                        'Данные собираются с ' + record.date_from
                        :
                        'Деректер ' + record.date_from + ' бастап жиналады'
                    }</div>
                </div>
            )
        },
        {
            title: language === 'Ru' ? 'Действия' : 'Әрекеттер',
            key: 'action',
            render: (_, record) => (
                <div className='themes_table_button_wrapper'>
                    <Button className='themes_table_button' onClick={() => editRecord(record)}>
                        <EditOutlined />
                        <div className='themes_table_button_tooltip'>
                            {
                                language === 'Ru' ?
                                    'Редактировать'
                                    :
                                    'Өңдеу'
                            }
                        </div>
                    </Button>
                    <Button className='themes_table_button' onClick={() => stopRecord(record)}>
                        <PauseOutlined />
                        <div className='themes_table_button_tooltip'>
                            {
                                language === 'Ru' ?
                                    'Остановить'
                                    :
                                    'Тоқта'
                            }
                        </div>
                    </Button>
                    <Button className='themes_table_button' onClick={() => deleteRecord(record)}>
                        <DeleteOutlined />
                        <div className='themes_table_button_tooltip'>
                            {
                                language === 'Ru' ?
                                    'Удалить'
                                    :
                                    'Жою'
                            }
                        </div>
                    </Button>
                </div>
            )
        }
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
        if(value === 'all'){
            setTableData(dataSource)
        } else {
            setTableData(
                dataSource.filter(item => item.group_type === value)
            )
        }
    }

    return (
        <div className='themes'>
            <Header/>
            <div className='container'>
                <div className='themes_header'>
                    <h1 className='themes_header_title'>{language === 'Ru' ? 'Темы' : 'Тақырыптар'}</h1>
                    <Select
                        className='themes_select'
                        defaultValue={'all'}
                        options={select_options}
                        onChange={selectChange}
                    />
                    <Button className='themes_header_button' type='primary' onClick={addNewTheme}>
                        {
                            language === 'Ru' ?
                                'Добавить новую тему'
                            :
                                'Жаңа тақырып қосыңыз'
                        }
                    </Button>
                </div>
                <Table pagination={false} dataSource={tableData} columns={columns}/>
            </div>
            <Footer />
        </div>
    )
}
