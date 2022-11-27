import React, {useState} from 'react'
import Header from "../Header/Header";
import {useStore} from "../../store/store";
import {Select, Button, Table} from "antd";
import { EditOutlined, PauseOutlined, DeleteOutlined} from '@ant-design/icons'
import './Themes.scss'
import Footer from "../Footer/Footer";
import {Link} from "react-router-dom";

export default function Themes(){

    const dataSource = useStore(state => state.dataSource)

    const language = useStore(state => state.language)

    const changeActiveTheme = useStore(state => state.changeActiveTheme)

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
                                    'Әлеуметтік желілер және онлайн СМИ'
                                :
                                language === 'Ru' ?
                                    'Онлайн-СМИ, пресса, ТВ, радио'
                                    :
                                    'Онлайн, СМИ, баспасөз, телевидение, радио'
                        }
                    </div>
                </div>
            )
        },
        {
            title: language === 'Ru' ? 'Название' : 'Атауы',
            key: 'name',
            render: (_, record) => (
                <div>
                    <Link to='/theme'>
                        <div className='themes_table_name' onClick={() => chooseTheme(record.id)}>{record.name}</div>
                    </Link>
                    <div>{language === 'Ru' ?
                        'Данные собираются с ' + record.date_from
                        :
                        'Деректер ' + record.date_from + '-ден жиналады'
                    }</div>
                </div>
            )
        },
        {
            title: language === 'Ru' ? 'Действия' : 'Іс-әрекеттер',
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
                                    'Тоқтау'
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

    const chooseTheme = (id) => {
        changeActiveTheme(id)
    }

    return (
        <div className='themes'>
            <Header/>
            <div className='container'>
                <div className='themes_header'>
                    <h1 className='themes_header_title'>{language === 'Ru' ? 'Темы' : 'Темалар'}</h1>
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
                                'Жаңа тема қосу'
                        }
                    </Button>
                </div>
                <Table pagination={false} dataSource={tableData} columns={columns}/>
            </div>
            <Footer />
        </div>
    )
}

function TableName(props){
    const { id, name, chooseTheme } = props
    return(
        <div className='themes_table_name' onClick={() => chooseTheme(id)}>{name}</div>
    )
}
