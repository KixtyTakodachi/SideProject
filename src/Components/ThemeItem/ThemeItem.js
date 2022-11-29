import React, { useState, useEffect } from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer"
import {useStore} from "../../store/store";
import {
    PlusSquareOutlined,
    AppstoreOutlined,
    DeploymentUnitOutlined,
    HighlightOutlined,
    TeamOutlined,
    EnvironmentOutlined,
    TagOutlined,
    MessageOutlined,
    LinkOutlined,
    UserOutlined,
    AuditOutlined,
    SendOutlined,
    DeleteOutlined,
    StarOutlined,
    StarFilled,
    CheckOutlined,
    BookOutlined,
    MehFilled,
    PushpinFilled,
    ShareAltOutlined,
    DeleteFilled,
    PlusOutlined,
} from "@ant-design/icons"
import { Select } from "antd";
import { DatePicker } from "antd"
import { Checkbox} from "antd";
import "dayjs/locale/ru"
import "dayjs/locale/kk"
import { default as localeKz } from 'antd/es/date-picker/locale/kk_KZ'
import { default as localeRu } from 'antd/es/date-picker/locale/ru_RU'
import dayjs from "dayjs";
import comment_avatar from '../../img/comment_avatar.svg'
import facebook from '../../img/facebook.png'
import vk from '../../img/vk.png'
import ok from '../../img/ok.png'
import dzen from '../../img/dzen.png'
import comment_img from '../../img/comment_img.png'
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts'
import "./ThemeItem.scss"
import {ru_kz_dict} from "../../dictionaries/ru_kz_dict";
import {themes_dict} from "../../dictionaries/themes_dict";

const { RangePicker } = DatePicker

export default function ThemeItem(){

    const language = useStore(state => state.language)

    const comments_source = useStore(state => state.comment_data)

    const [activeTab, setActiveTab] = useState(0)

    const [currentDateRange, setCurrentDateRange] = useState([dayjs(new Date()), dayjs(new Date()).add(1, 'month')])

    const [content_comments, setContentComments] = useState(comments_source)

    const [chartData, setChartData] = useState([])

    const [pieChartData, setPieChartData] = useState([])

    const [radarChartData, setRadarChartData] = useState([])

    const [legendsFilter, setLegendsFilter] = useState([])

    useEffect(() => {
        const start_date = dayjs(currentDateRange[0]).format('YYYY-MM-DD')
        const end_date = dayjs(currentDateRange[1]).format('YYYY-MM-DD')
        let dates = []
        let date = start_date
        while(date <= end_date){
            dates.push(date)
            date = dayjs(date).add(1, 'day').format('YYYY-MM-DD')
        }
        const chartsData = dates.map(item => {
            return {
                date: item,
                mentions: Math.round(Math.random() * 10),
                negative: Math.round(Math.random() * 10),
                positive: Math.round(Math.random() * 10)
            }
        })
        setChartData(chartsData)
        const pieChartData = Object.entries(chartsData.reduce((a,b) => {
            return {
                mentions: a.mentions + b.mentions,
                negative: a.negative + b.negative,
                positive: a.positive + b.positive
            }
        })).map(([key, item]) => {
            return{
                name: key,
                value: item
            }
        })
        setPieChartData(pieChartData)
        const tooltip_dict = {
            negative: 'Негатив',
            positive: 'Позитив',
            mentions: ru_kz_dict.count_upominaniy[language],
        }
        setRadarChartData(
            pieChartData.map(item => {
                return {
                    name: tooltip_dict[item.name],
                    value: item.value
                }
            })
        )
    },[currentDateRange])

    useEffect(() => {
        setContentComments(comments_source)
    }, [JSON.stringify(comments_source)])

    const dataSource = useStore(state => state.dataSource)

    const active_theme = useStore(state => state.active_theme)

    const select_options = dataSource.map(item => {
        return {
            value: themes_dict[item.name],
            label: item.name
        }
    })

    const left_bar_menu = [
        {
            id: 0,
            name: ru_kz_dict.otchet[language],
            icon: <AppstoreOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 1,
            name: ru_kz_dict.sources[language],
            icon: <DeploymentUnitOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 2,
            name: ru_kz_dict.authors[language],
            icon: <HighlightOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 3,
            name: ru_kz_dict.community[language],
            icon: <TeamOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 4,
            name: ru_kz_dict.geography[language],
            icon: <EnvironmentOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 5,
            name: ru_kz_dict.tegs[language],
            icon: <TagOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 6,
            name: ru_kz_dict.popular_words[language],
            icon: <MessageOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 7,
            name: ru_kz_dict.links[language],
            icon: <LinkOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 8,
            name: ru_kz_dict.persons[language],
            icon: <UserOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 9,
            name: ru_kz_dict.ur_faces[language],
            icon: <AuditOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 10,
            name: ru_kz_dict.places[language],
            icon: <SendOutlined rotate={-45} style={{marginRight:'10px'}}/>,
        },
        {
            id: 11,
            name: ru_kz_dict.basket[language],
            icon: <DeleteOutlined style={{marginRight:'10px'}}/>,
        },
    ]

    const pie_colors = {
        mentions: '#8fc144',
        negative: '#cf6662',
        positive: '#4779d0',
    }

    const onSelectChange = (value) => {
        console.log('selected value', value)
    }

    const menuClick = (id) => {
        setActiveTab(id)
        console.log('menu item clicked id', id)
    }

    const onChange = (values) => {
        setCurrentDateRange(values)
    }

    const onCommentSelect = (e) => {
        console.log(`onCommentSelect id - ${e.target['data-id']} checked - ${e.target.checked}`)
    }

    const toggleFavourite = useStore(state => state.toggleFavorite)

    const actionClick = (action, id) => {
        console.log(`actionClick action - ${action} from id - ${id}`)
    }

    const filterChart = (type) => {
        if(!legendsFilter.includes(type)){
            setLegendsFilter([...legendsFilter, type])
        } else {
            setLegendsFilter(legendsFilter.filter(item => item !== type))
        }
    }

    return (
        <div className='themeItem'>
            <Header/>
            <div className='container'>
                <div className='themeItem_wrapper'>
                    <div className='themeItem_left_bar'>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
                            <h1 className='themeItem_left_bar_title'>{ru_kz_dict.temi[language]}</h1>
                            <div className='themeItem_left_bar_button'>
                                <PlusSquareOutlined />
                            </div>
                        </div>
                        <Select
                            className='themeItem_left_bar_select'
                            defaultValue={active_theme || 0}
                            showSearch
                            onChange={onSelectChange}
                            options={select_options}
                        />
                        <ul className='themeItem_left_bar_menu'>
                            {
                                left_bar_menu.map(item => {
                                    return <li
                                        key={item.id}
                                        className={[
                                            'themeItem_left_bar_menu_item',
                                            activeTab === item.id ? 'menu_active_item' : ''
                                        ].join(' ')}
                                        onClick={() => menuClick(item.id, item.name)}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className='themeItem_content'>
                        <div className='themeItem_content_title_wrapper'>
                            <h1 className='themeItem_content_title'>
                                {
                                    left_bar_menu.find(item => item.id === activeTab).name
                                }
                            </h1>
                            <div className='themeItem_right_bar_calendar_wrapper'>
                                <RangePicker
                                    locale={language === 'ru' ? localeRu : localeKz}
                                    onChange={(values) => onChange(values)}
                                    value={currentDateRange}
                                    size={'large'}
                                    className='themeItem_calendar'
                                />
                            </div>
                        </div>
                        <div className='themeItem_content_chart'>
                            <LineChart width={642} height={200} data={chartData}>
                                {
                                    !legendsFilter.includes('positive') ?
                                        <Line type={'monotone'} dataKey={'positive'} stroke={'#8fc144'}/>
                                        :
                                        ''
                                }
                                {
                                    !legendsFilter.includes('mentions') ?
                                        <Line type={'monotone'} dataKey={'mentions'} stroke={'#4779d0'}/>
                                        :
                                        ''
                                }
                                {
                                    !legendsFilter.includes('negative') ?
                                        <Line type={'monotone'} dataKey={'negative'} stroke={'#cf6662'}/>
                                        :
                                        ''
                                }
                                <CartesianGrid stroke={'#b6b6b6'}/>
                                <XAxis dataKey={'date'}/>
                                <YAxis />
                                <Tooltip content={<CustomChartToolTip />}/>
                            </LineChart>
                            <BarChart width={642} height={200} data={chartData}>
                                {
                                    !legendsFilter.includes('positive') ?
                                        <Bar type={'monotone'} dataKey={'positive'} fill={'#8fc144'}/>
                                        :
                                        ''
                                }
                                {
                                    !legendsFilter.includes('mentions') ?
                                        <Bar type={'monotone'} dataKey={'mentions'} fill={'#4779d0'}/>
                                        :
                                        ''
                                }
                                {
                                    !legendsFilter.includes('negative') ?
                                        <Bar type={'monotone'} dataKey={'negative'} fill={'#cf6662'}/>
                                        :
                                        ''
                                }
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey={'date'}/>
                                <YAxis />
                                <Tooltip content={<CustomChartToolTip />}/>
                            </BarChart>
                            <PieChart width={642} height={230}>
                                <Pie
                                    dataKey='value'
                                    isAnimationActive
                                    data={pieChartData}
                                    cx={'50%'}
                                    cy={'50%'}
                                    fill={'#8884d8'}
                                    label
                                >
                                    {
                                        pieChartData.map((entry, index) => {
                                            return(
                                                <Cell key={`cell_${index}`} fill={pie_colors[entry.name]}/>
                                            )
                                        })
                                    }
                                </Pie>
                                <Tooltip content={<PieChartToolTip />}/>
                            </PieChart>
                            <RadarChart width={642} height={230} data={radarChartData}>
                                <PolarGrid/>
                                <PolarAngleAxis dataKey={'name'}/>
                                <PolarRadiusAxis angle={30} domain={[0, 250]}/>
                                <Radar dataKey={'value'} stroke={'#4779d0'} fill={'#4779d0'} opacity={0.6}/>
                                <Tooltip content={<RadarChartToolTip />}/>
                            </RadarChart>
                            <div className='themeItem_content_chart_lagends_wrapper'>
                                <div
                                    className={[
                                        'themeItem_content_chart_lagends_item',
                                        legendsFilter.includes('positive') ?
                                            'legend_off' : ''
                                    ].join(' ')}
                                    onClick={() => filterChart('positive')}>
                                    <div className='round' style={{background:'#8fc144'}}></div>
                                    {
                                        ru_kz_dict.count_upominaniy[language]
                                    }
                                </div>
                                <div
                                    className={[
                                        'themeItem_content_chart_lagends_item',
                                        legendsFilter.includes('mentions') ?
                                            'legend_off' : ''
                                    ].join(' ')}
                                    onClick={() => filterChart('mentions')}>
                                    <div className='round' style={{background:'#4779d0'}}></div>
                                    Позитив
                                </div>
                                <div
                                    className={[
                                        'themeItem_content_chart_lagends_item',
                                        legendsFilter.includes('negative') ?
                                            'legend_off' : ''
                                    ].join(' ')}
                                    onClick={() => filterChart('negative')}>
                                    <div className='round' style={{background:'#cf6662'}}></div>
                                    Негатив
                                </div>
                            </div>
                        </div>
                        <div className='themeItem_content_comments_wrapper'>
                            {
                                content_comments.map(item => {
                                    return <CommentComponent
                                        name={item.name}
                                        avatar={item.avatar}
                                        author_audience={item.author_audience}
                                        public_source={item.public_source}
                                        public_source_link={item.public_source_link}
                                        public_audience={item.public_audience}
                                        social_media={item.social_media}
                                        link={item.link}
                                        message_type={item.message_type}
                                        date={item.date}
                                        text={item.text}
                                        picture={item.picture}
                                        onChange={onCommentSelect}
                                        favourite={item.favourite}
                                        toggleFavourite={toggleFavourite}
                                        actionClick={actionClick}
                                        id={item.id}
                                    />
                                })
                            }
                        </div>
                    </div>
                    {/*<div className='themeItem_right_bar'>*/}

                    {/*</div>*/}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

function CommentComponent(props){

    const language = useStore(state => state.language)

    const {
        name,
        avatar,
        author_audience,
        public_source,
        public_source_link,
        public_audience,
        social_media,
        message_type,
        date,
        text,
        picture,
        onChange,
        favourite,
        toggleFavourite,
        link,
        actionClick,
        id
    } = props

    const social_media_img_dictionary = {
        facebook: facebook,
        vk: vk,
        ok: ok,
        dzen: dzen,
    }

    return (
        <div className='themeItem_comment'>
            <div className='themeItem_comment_header'>
                <Checkbox onChange={onChange} className='themeItem_comment_checkbox' data-id={id}></Checkbox>
                <div className='themeItem_comment_user'>
                    <img src={avatar} alt={'avatar'} style={{borderRadius: '100%', marginRight: '10px', height: '35px'}}/>
                    <div className='themeItem_comment_user_info'>
                        <div style={{marginBottom: '5px', display: 'flex', alignItems:'center'}}>
                            {
                                favourite ?
                                    <StarFilled style={{color: 'gold', marginRight: '5px'}} onClick={() => toggleFavourite(id)}/>
                                    :
                                    <StarOutlined style={{ marginRight: '5px'}} onClick={() => toggleFavourite(id)}/>
                            }
                            {
                                <div style={{fontSize: '14px'}}>{name}</div>
                            }
                            {
                                author_audience > 0 ?
                                    <div className='themeItem_comment_audience'>
                                        <TeamOutlined />
                                        {
                                            author_audience
                                        }
                                        <div className='action_button_tooltip'>
                                            {
                                                ru_kz_dict.author_auditory[language]
                                            }
                                        </div>
                                    </div>
                                :
                                    ''
                            }
                            {
                                public_source.length > 0 ?
                                    <>
                                        <div style={{fontSize: '14px'}}>
                                            {
                                                ru_kz_dict.in[language]
                                            }
                                            <a style={{color:'#4870b7', textDecoration:'none', fontSize:'14px'}} href={public_source_link}>{' '+public_source}</a>
                                        </div>
                                        {
                                            public_audience > 0 ?
                                                <div className='themeItem_comment_audience'>
                                                    <TeamOutlined />
                                                    {
                                                        public_audience
                                                    }
                                                    <div className='action_button_tooltip'>
                                                        {
                                                            ru_kz_dict.message_auditory[language]
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                ''
                                        }
                                    </>
                                :
                                    ''
                            }
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={social_media_img_dictionary[social_media.split('.')[0]]} style={{marginRight: '5px'}} alt={'social_media'}/>
                            <a style={{fontSize: '12px', textDecoration: 'none', color: '#4870b7', marginRight: '10px'}} href={link} target={"_blank"} rel='noreferrer'>{social_media}</a>
                            <div style={{color:'#b6b6b6', fontSize:'12px', marginRight: '10px'}}>{message_type === 'Коммент' ? ru_kz_dict.comment[language] : message_type}</div>
                            <div style={{fontSize: '12px'}}>{date}</div>
                        </div>
                    </div>
                </div>
                <div className='themeItem_comment_actions'>
                    <div className='action_button' onClick={() => actionClick('worked', id)}>
                        <CheckOutlined/>
                        <div className='action_button_tooltip'>
                            {
                                ru_kz_dict.obrabotannoe_tooltip[language]
                            }
                        </div>
                    </div>
                    <div className='action_button' onClick={() => actionClick('favourite', id)}>
                        <BookOutlined/>
                        <div className='action_button_tooltip'>
                            {
                                ru_kz_dict.favorite_msg_tooltip[language]
                            }
                        </div>
                    </div>
                    <div className='action_button' onClick={() => actionClick('neutral', id)}>
                        <MehFilled/>
                        <div className='action_button_tooltip'>
                            {
                                ru_kz_dict.neutral_tooltip[language]
                            }
                        </div>
                    </div>
                    <div className='action_button_wrapper' onClick={() => actionClick('task', id)}>
                        <PushpinFilled />
                        <div className='action_button_tooltip'>
                            {
                                ru_kz_dict.poruchenie_tooltip[language]
                            }
                        </div>
                    </div>
                    <div className='action_button_wrapper' onClick={() => actionClick('share', id)}>
                        <ShareAltOutlined />
                        <div className='action_button_tooltip'>
                            {
                                ru_kz_dict.share_tooltip[language]
                            }
                        </div>
                    </div>
                    <div className='action_button_wrapper delete_button' onClick={() => actionClick('delete', id)}>
                        <DeleteFilled />
                        <div className='action_button_tooltip'>
                            {
                                ru_kz_dict.delete_tooltip[language]
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='themeItem_comment_body'>
                <div className='themeItem_comment_text_wrapper'>
                    <div className='themeItem_comment_text'>
                        {
                            text
                        }
                    </div>
                    <a href={link} style={{color: '#4870b7', textDecoration:'none', display: 'block', marginTop: '10px'}}>{
                        ru_kz_dict.show_full[language]
                    }</a>
                    <div className='themeItem_comment_body_bottom_text'> {
                        ru_kz_dict.edit[language]
                    }</div>
                    <div className='themeItem_comment_body_bottom_text'><PlusOutlined /> {
                        ru_kz_dict.add_tags[language]
                    }</div>
                </div>
                <img src={picture} className='themeItem_comment_picture' alt='post_picture'/>
            </div>
        </div>
    )
}

function CustomChartToolTip({active, payload, label}){

    const language = useStore(state => state.language)

    if(active && payload && payload.length > 0){
        const tooltip_dict = {
            negative: 'Негатив',
            positive: 'Позитив',
            mentions: ru_kz_dict.count_upominaniy[language],
        }
        return (
            <div className='chart_tooltip'>
                <div className='chart_tooltip_text'>{(language === 'Ru' ? 'Дата: ' : 'Күні: ') + label}</div>
                {
                    payload[1] ?
                        <div className='chart_tooltip_text'>{tooltip_dict[payload[1].name] + ': ' + payload[1].value}</div>
                    :
                        ''
                }
                {
                    payload[0] ?
                        <div className='chart_tooltip_text'>{tooltip_dict[payload[0].name] + ': ' + payload[0].value}</div>
                    :
                        ''
                }
                {
                    payload[2] ?
                        <div className='chart_tooltip_text'>{tooltip_dict[payload[2].name] + ': ' + payload[2].value}</div>
                    :
                        ''
                }
            </div>
        )
    }
}

function PieChartToolTip({active, payload}){

    const language = useStore(state => state.language)

    if(active && payload && payload.length > 0){
        const tooltip_dict = {
            negative: 'Негатив',
            positive: 'Позитив',
            mentions: ru_kz_dict.count_upominaniy[language],
        }
        return (
            <div className='chart_tooltip'>
                {
                    payload[0] ?
                        <div className='chart_tooltip_text'>{tooltip_dict[payload[0].name] + ': ' + payload[0].value}</div>
                        :
                        ''
                }
            </div>
        )
    }
}

function RadarChartToolTip({active, payload}){

    const language = useStore(state => state.language)

    if(active && payload.length > 0){
        return (
            <div className='chart_tooltip'>
                <div className='chart_tooltip_text'>{payload[0].payload.name + ': ' + payload[0].value}</div>
            </div>
        )
    }
}
