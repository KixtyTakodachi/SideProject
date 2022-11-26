import React, { useState } from 'react'
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
// import "moment/locale/ru"
// import "moment/locale/kk"
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

import "./ThemeItem.scss"

const { RangePicker } = DatePicker

export default function ThemeItem(){

    const [activeTab, setActiveTab] = useState(0)

    const [currentDateRange, setCurrentDateRange] = useState([dayjs(new Date()), dayjs(new Date()).add(1, 'month')])

    const language = useStore(state => state.language)

    const dataSource = useStore(state => state.dataSource)

    const select_options = dataSource.map(item => {
        return {
            value: item.name,
            label: item.name
        }
    })

    const left_bar_menu = [
        {
            id: 0,
            name: language === 'Ru' ? 'Сводный отчет' : 'Шоғырландырылған есеп',
            icon: <AppstoreOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 1,
            name: language === 'Ru' ? 'Источники' : 'Дереккөздер',
            icon: <DeploymentUnitOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 2,
            name: language === 'Ru' ? 'Авторы' : 'Авторлар',
            icon: <HighlightOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 3,
            name: language === 'Ru' ? 'Сообщества' : 'Қауымдастықтар',
            icon: <TeamOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 4,
            name: language === 'Ru' ? 'География' : 'География',
            icon: <EnvironmentOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 5,
            name: language === 'Ru' ? 'Теги' : 'Тегтер',
            icon: <TagOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 6,
            name: language === 'Ru' ? 'Популярные слова' : 'Танымал сөздер',
            icon: <MessageOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 7,
            name: language === 'Ru' ? 'Ссылки' : 'Сілтемелер',
            icon: <LinkOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 8,
            name: language === 'Ru' ? 'Персоны' : 'Тұлғалар',
            icon: <UserOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 9,
            name: language === 'Ru' ? 'Юрлица' : 'Заңды тұлға',
            icon: <AuditOutlined style={{marginRight:'10px'}}/>,
        },
        {
            id: 10,
            name: language === 'Ru' ? 'Места' : 'Орындар',
            icon: <SendOutlined rotate={-45} style={{marginRight:'10px'}}/>,
        },
        {
            id: 11,
            name: language === 'Ru' ? 'Корзина' : 'Себет',
            icon: <DeleteOutlined style={{marginRight:'10px'}}/>,
        },
    ]

    const content_comments = [
        {
            id: 0,
            name: 'Test test 1',
            avatar: comment_avatar,
            author_audience: 100,
            public_source: 'Test public 1',
            public_audience: 10000,
            social_media: 'facebook.com',
            link: 'https://facebook.com',
            message_type: 'Пост',
            date: '01.05.2022',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias autem culpa delectus deleniti distinctio facilis in ipsam iusto magni minus praesentium, quae reiciendis sequi similique tenetur ullam. Ea, facere...',
            picture: comment_img,
            favourite: false,
        },
        {
            id: 1,
            name: 'Test test 2',
            avatar: comment_avatar,
            author_audience: 200,
            public_source: 'Test public 2',
            public_audience: 20000,
            social_media: 'ok.ru',
            link: 'https://ok.ru',
            message_type: 'Коммент',
            date: '02.05.2022',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias autem culpa delectus deleniti distinctio facilis in ipsam iusto magni minus praesentium, quae reiciendis sequi similique tenetur ullam. Ea, facere...',
            picture: comment_img,
            favourite: true,
        },
        {
            id: 2,
            name: 'Test test 3',
            avatar: comment_avatar,
            author_audience: 0,
            public_source: '',
            public_audience: 0,
            social_media: 'vk.com',
            link: 'https://vk.com',
            message_type: 'Пост',
            date: '03.05.2022',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias autem culpa delectus deleniti distinctio facilis in ipsam iusto magni minus praesentium, quae reiciendis sequi similique tenetur ullam. Ea, facere...',
            picture: comment_img,
            favourite: true,
        },
        {
            id: 3,
            name: 'Test test 4',
            avatar: comment_avatar,
            author_audience: 400,
            public_source: '',
            public_audience: 0,
            social_media: 'dzen.com',
            link: 'https://dzen.com/',
            message_type: 'Пост',
            date: '04.05.2022',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias autem culpa delectus deleniti distinctio facilis in ipsam iusto magni minus praesentium, quae reiciendis sequi similique tenetur ullam. Ea, facere...',
            picture: comment_img,
            favourite: false,
        },
    ]

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

    const toggleFavourite = () => {

    }

    const actionClick = (action, id) => {
        console.log(`actionClick action - ${action} from id - ${id}`)
    }

    return (
        <div className='themeItem'>
            <Header/>
            <div className='container'>
                <div className='themeItem_wrapper'>
                    <div className='themeItem_left_bar'>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
                            <h1 className='themeItem_left_bar_title'>{language === 'Ru' ? 'Темы' : 'Тақырыптар'}</h1>
                            <div className='themeItem_left_bar_button'>
                                <PlusSquareOutlined />
                            </div>
                        </div>
                        <Select
                            className='themeItem_left_bar_select'
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
                        <h1 className='themeItem_content_title'>
                            {
                                left_bar_menu.find(item => item.id === activeTab).name
                            }
                        </h1>
                        <div className='themeItem_content_comments_wrapper'>
                            {
                                content_comments.map(item => {
                                    return <CommentComponent
                                        name={item.name}
                                        avatar={item.avatar}
                                        author_audience={item.author_audience}
                                        public_source={item.public_source}
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
                    <div className='themeItem_right_bar'>
                        <div className='themeItem_right_bar_calendar_wrapper'>
                            <RangePicker
                                locale={language === 'Ru' ? localeRu : localeKz}
                                onChange={(values) => onChange(values)}
                                value={currentDateRange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

function CommentComponent(props){
    const {
        name,
        avatar,
        author_audience,
        public_source,
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
                        <div style={{marginBottom: '5px'}}>
                            {
                                favourite ?
                                    <StarFilled style={{color: 'yellow', marginRight: '5px'}}/>
                                    :
                                    <StarOutlined style={{ marginRight: '5px'}}/>
                            }
                            {
                                name
                            }
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={social_media_img_dictionary[social_media.split('.')[0]]} style={{marginRight: '5px'}}/>
                            <a style={{fontSize: '12px', textDecoration: 'none', color: '#4870b7', marginRight: '10px'}} href={link} target={"_blank"}>{social_media}</a>
                            <div style={{color:'#b6b6b6', fontSize:'12px', marginRight: '10px'}}>{message_type}</div>
                            <div style={{fontSize: '12px'}}>{date}</div>
                        </div>
                    </div>
                </div>
                <div className='themeItem_comment_actions'>
                    <div className='action_button' onClick={() => actionClick('worked', id)}>
                        <CheckOutlined/>
                        <div className='action_button_tooltip'>Пометить как обработанное</div>
                    </div>
                    <div className='action_button' onClick={() => actionClick('favourite', id)}>
                        <BookOutlined/>
                        <div className='action_button_tooltip'>Добавить в избранное</div>
                    </div>
                    <div className='action_button' onClick={() => actionClick('neutral', id)}>
                        <MehFilled/>
                        <div className='action_button_tooltip'>Нейтрально</div>
                    </div>
                    <div className='action_button_wrapper' onClick={() => actionClick('task', id)}>
                        <PushpinFilled />
                        <div className='action_button_tooltip'>Создать поручение</div>
                    </div>
                    <div className='action_button_wrapper' onClick={() => actionClick('share', id)}>
                        <ShareAltOutlined />
                        <div className='action_button_tooltip'>Поделиться</div>
                    </div>
                    <div className='action_button_wrapper delete_button' onClick={() => actionClick('delete', id)}>
                        <DeleteFilled />
                        <div className='action_button_tooltip'>Удалить</div>
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
                    <a href={link} style={{color: '#4870b7', textDecoration:'none', display: 'block', marginTop: '10px'}}>Показать польный текст ></a>
                    <div className='themeItem_comment_body_bottom_text'> Редактировать разметку</div>
                    <div className='themeItem_comment_body_bottom_text'><PlusOutlined /> Добавить теги</div>
                </div>
                <img src={picture} className='themeItem_comment_picture'/>
            </div>
        </div>
    )
}
