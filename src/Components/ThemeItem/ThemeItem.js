import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useStore } from '../../store/store'
import {
	CheckOutlined,
	BookOutlined,
	MehFilled,
	PushpinFilled,
	ShareAltOutlined,
	DeleteFilled,
	PlusOutlined,
} from '@ant-design/icons'
import { DatePicker } from 'antd'
import { Checkbox } from 'antd'
import 'dayjs/locale/ru'
import 'dayjs/locale/kk'
import { default as localeKz } from 'antd/es/date-picker/locale/kk_KZ'
import { default as localeRu } from 'antd/es/date-picker/locale/ru_RU'
import dayjs from 'dayjs'
import facebook from '../../img/facebook.png'
import vk from '../../img/vk.png'
import ok from '../../img/ok.png'
import dzen from '../../img/dzen.png'
import './ThemeItem.scss'
import { ru_kz_dict } from '../../dictionaries/ru_kz_dict'
import LeftBar from '../LeftBar/LeftBar'
import { left_bar_dictionary } from '../../dictionaries/left_bar_dictionary'
import ContentManager from '../Charts/ContentManager'
import { date_format } from '../../global_vars'
import Loader from '../Loader/Loader'
import CreateThemeModal from '../CreateThemeModal/CreateThemeModal'

// const disabledDate = (current) => {
// 	const start = dayjs(new Date('2022-09-01'))
// 	const end = dayjs(new Date('2023-12-01'))
// 	return (current && current < start.endOf('month')) || (current && current > end.endOf('month'))
// }

export default function ThemeItem() {
	const language = useStore((state) => state.language)
	const comments_source = useStore((state) => state.comment_data)
	const changeMonthYear = useStore((state) => state.changeMonthYear)
	const active_theme = useStore((state) => state.active_theme)
	const changeActiveTheme = useStore((state) => state.changeActiveTheme)
	const getThemeData = useStore((state) => state.getThemeData)
	const themeData = useStore((state) => state.themeData)
	const leftBarTab = useStore((state) => state.leftBarTab)
	const toggleFavourite = useStore((state) => state.toggleFavorite)
	const clearThemeData = useStore((state) => state.clearThemeData)

	const [currentDate, setCurrentDate] = useState(dayjs(new Date('2023-05-09')))
	const [content_comments, setContentComments] = useState(comments_source)
	const [chartData, setChartData] = useState([])
	const [pieChartData, setPieChartData] = useState([])
	const [radarChartData, setRadarChartData] = useState([])
	const [legendsFilter, setLegendsFilter] = useState([])

	useEffect(() => {
		setContentComments(comments_source)
	}, [JSON.stringify(comments_source)])
	useEffect(
		() => () =>
			changeMonthYear(`${dayjs(new Date()).get('month') + 1}_${dayjs(new Date()).get('year')}`),
		[],
	)

	useEffect(() => {
		return () => {
			clearThemeData()
		}
	}, [])

	useEffect(() => {
		getThemeData(active_theme, currentDate.format(date_format))
	}, [active_theme, currentDate.format(date_format)])
	// useEffect(() => {
	// 	if(Object.keys(themeData).length > 0){
	// 		const chartData
	// 	}
	// }, [themeData])

	// useEffect(() => {
	//     callThemeData()
	// }, [])

	useEffect(() => {
		if (active_theme === '') {
			changeActiveTheme(window.location.pathname.split('/')[2])
		}
	}, [])

	const onCommentSelect = (e) => {
		console.log(`onCommentSelect id - ${e.target['data-id']} checked - ${e.target.checked}`)
	}

	const actionClick = (action, id) => {
		console.log(`actionClick action - ${action} from id - ${id}`)
	}

	const changeDate = (value) => {
		setCurrentDate(value)
	}

	const disabledDate = (current) => {
		const currentDate = current.format(date_format)
		return !themeData?.dates.includes(currentDate)
	}

	return (
		<div className="themeItem">
			<CreateThemeModal />
			<Loader />
			<Header />
			<div className="container">
				<div className="themeItem_wrapper">
					<LeftBar />
					<div className="themeItem_content">
						<div className="themeItem_content_title_wrapper">
							<h1 className="themeItem_content_title">
								{left_bar_dictionary[language][leftBarTab]}
							</h1>
							<div className="themeItem_right_bar_calendar_wrapper">
								{/*<RangePicker*/}
								{/*    locale={language === 'ru' ? localeRu : localeKz}*/}
								{/*    onCalendarChange={(values) => onChange(values)}*/}
								{/*    defaultValue={currentDateRange}*/}
								{/*    size={'large'}*/}
								{/*    className='themeItem_calendar'*/}
								{/*    picker={'month'}*/}
								{/*/>*/}
								<DatePicker
									disabledDate={disabledDate}
									locale={language === 'ru' ? localeRu : localeKz}
									// defaultValue={currentDateRange ? currentDateRange[0] : null}
									value={currentDate}
									onChange={changeDate}
									size="large"
									className="themeItem_calendar"
								/>
							</div>
						</div>
						<ContentManager
							activeTab={leftBarTab}
							chartData={themeData}
							legendsFilter={legendsFilter}
						/>
						{/*<div>*/}
						{/*{themeData?.raw_data.map((item, index) => {*/}
						{/*	return (*/}
						{/*		<CommentComponent*/}
						{/*			key={`comment ${index}`}*/}
						{/*			data={item}*/}
						{/*			// name={item.author_fullname}*/}
						{/*			// avatar={item.avatar}*/}
						{/*			// author_audience={item.audienceCount}*/}
						{/*			// public_source={item.public_source}*/}
						{/*			// public_source_link={item.public_source_link}*/}
						{/*			// public_audience={item.public_audience}*/}
						{/*			// social_media={item.social_media}*/}
						{/*			// link={item.link}*/}
						{/*			// message_type={item.message_type}*/}
						{/*			// date={item.date}*/}
						{/*			// text={item.text}*/}
						{/*			// picture={item.picture}*/}
						{/*			// onChange={onCommentSelect}*/}
						{/*			// favourite={item.favourite}*/}
						{/*			// toggleFavourite={toggleFavourite}*/}
						{/*			// actionClick={actionClick}*/}
						{/*			// id={item.id}*/}
						{/*		/>*/}
						{/*	)*/}
						{/*})}*/}
						{/*</div>*/}
						{/*<div className='themeItem_content_chart_lagends_wrapper'>*/}
						{/*    <div*/}
						{/*        className={[*/}
						{/*            'themeItem_content_chart_lagends_item',*/}
						{/*            legendsFilter.includes('positive') ?*/}
						{/*                'legend_off' : ''*/}
						{/*        ].join(' ')}*/}
						{/*        onClick={() => filterChart('positive')}>*/}
						{/*        <div className='round' style={{background:'#8fc144'}}></div>*/}
						{/*        {*/}
						{/*            ru_kz_dict.count_upominaniy[language]*/}
						{/*        }*/}
						{/*    </div>*/}
						{/*    <div*/}
						{/*        className={[*/}
						{/*            'themeItem_content_chart_lagends_item',*/}
						{/*            legendsFilter.includes('mentions') ?*/}
						{/*                'legend_off' : ''*/}
						{/*        ].join(' ')}*/}
						{/*        onClick={() => filterChart('mentions')}>*/}
						{/*        <div className='round' style={{background:'#4779d0'}}></div>*/}
						{/*        Позитив*/}
						{/*    </div>*/}
						{/*    <div*/}
						{/*        className={[*/}
						{/*            'themeItem_content_chart_lagends_item',*/}
						{/*            legendsFilter.includes('negative') ?*/}
						{/*                'legend_off' : ''*/}
						{/*        ].join(' ')}*/}
						{/*        onClick={() => filterChart('negative')}>*/}
						{/*        <div className='round' style={{background:'#cf6662'}}></div>*/}
						{/*        Негатив*/}
						{/*    </div>*/}
						{/*</div>*/}
					</div>
					{/*<div className='themeItem_right_bar'>*/}
					{/*</div>*/}
				</div>
			</div>
			<Footer />
		</div>
	)
}

function CommentComponent(props) {
	// const language = useStore((state) => state.language)
	//
	// const {
	// 	date,
	// 	author_fullname,
	// 	title,
	// 	id,
	// 	text,
	// 	hub,
	// 	url,
	// 	hubtype,
	// 	type,
	// 	author_url,
	// 	author_type,
	// 	author_sex,
	// 	author_age,
	// 	audienceCount,
	// 	commentsCount,
	// 	repostsCount,
	// 	likesCount,
	// 	er,
	// 	viewsCount,
	// 	review_rating,
	// 	duplicateCount,
	// 	toneMark,
	// 	role,
	// 	agression,
	// 	geo_country,
	// 	geo_region,
	// 	geo_city,
	// 	geo_address,
	// 	lang,
	// 	WOM,
	// 	processed,
	// } = props.data

	const social_media_img_dictionary = {
		facebook: facebook,
		vk: vk,
		ok: ok,
		dzen: dzen,
	}

	// return (
	// 	<div className="themeItem_comment">
	// 		<div className="themeItem_comment_header">
	// 			<Checkbox
	// 				onChange={onChange}
	// 				className="themeItem_comment_checkbox"
	// 				data-id={id}
	// 			></Checkbox>
	// 			<div className="themeItem_comment_user">
	// 				<img
	// 					src={avatar}
	// 					alt={'avatar'}
	// 					style={{ borderRadius: '100%', marginRight: '10px', height: '35px' }}
	// 				/>
	// 				<div className="themeItem_comment_user_info">
	// 					{/*<div style={{marginBottom: '5px', display: 'flex', alignItems:'center'}}>*/}
	// 					{/*    {*/}
	// 					{/*        favourite ?*/}
	// 					{/*            <StarFilled style={{color: 'gold', marginRight: '5px'}} onClick={() => toggleFavourite(id)}/>*/}
	// 					{/*            :*/}
	// 					{/*            <StarOutlined style={{ marginRight: '5px'}} onClick={() => toggleFavourite(id)}/>*/}
	// 					{/*    }*/}
	// 					{/*    {*/}
	// 					{/*        <div style={{fontSize: '14px'}}>{name}</div>*/}
	// 					{/*    }*/}
	// 					{/*    {*/}
	// 					{/*        author_audience > 0 ?*/}
	// 					{/*            <div className='themeItem_comment_audience'>*/}
	// 					{/*                <TeamOutlined />*/}
	// 					{/*                {*/}
	// 					{/*                    author_audience*/}
	// 					{/*                }*/}
	// 					{/*                <div className='action_button_tooltip'>*/}
	// 					{/*                    {*/}
	// 					{/*                        ru_kz_dict.author_auditory[language]*/}
	// 					{/*                    }*/}
	// 					{/*                </div>*/}
	// 					{/*            </div>*/}
	// 					{/*        :*/}
	// 					{/*            ''*/}
	// 					{/*    }*/}
	// 					{/*    {*/}
	// 					{/*        public_source.length > 0 ?*/}
	// 					{/*            <>*/}
	// 					{/*                <div style={{fontSize: '14px'}}>*/}
	// 					{/*                    {*/}
	// 					{/*                        ru_kz_dict.in[language]*/}
	// 					{/*                    }*/}
	// 					{/*                    <a style={{color:'#4870b7', textDecoration:'none', fontSize:'14px'}} href={public_source_link}>{' '+public_source}</a>*/}
	// 					{/*                </div>*/}
	// 					{/*                {*/}
	// 					{/*                    public_audience > 0 ?*/}
	// 					{/*                        <div className='themeItem_comment_audience'>*/}
	// 					{/*                            <TeamOutlined />*/}
	// 					{/*                            {*/}
	// 					{/*                                public_audience*/}
	// 					{/*                            }*/}
	// 					{/*                            <div className='action_button_tooltip'>*/}
	// 					{/*                                {*/}
	// 					{/*                                    ru_kz_dict.message_auditory[language]*/}
	// 					{/*                                }*/}
	// 					{/*                            </div>*/}
	// 					{/*                        </div>*/}
	// 					{/*                        :*/}
	// 					{/*                        ''*/}
	// 					{/*                }*/}
	// 					{/*            </>*/}
	// 					{/*        :*/}
	// 					{/*            ''*/}
	// 					{/*    }*/}
	// 					{/*</div>*/}
	// 					{/*<div style={{display: 'flex', alignItems: 'center'}}>*/}
	// 					{/*    <img src={social_media_img_dictionary[social_media.split('.')[0]]} style={{marginRight: '5px'}} alt={'social_media'}/>*/}
	// 					{/*    <a style={{fontSize: '12px', textDecoration: 'none', color: '#4870b7', marginRight: '10px'}} href={link} target={"_blank"} rel='noreferrer'>{social_media}</a>*/}
	// 					{/*    <div style={{color:'#b6b6b6', fontSize:'12px', marginRight: '10px'}}>{message_type === 'Коммент' ? ru_kz_dict.comment[language] : message_type}</div>*/}
	// 					{/*    <div style={{fontSize: '12px'}}>{date}</div>*/}
	// 					{/*</div>*/}
	// 				</div>
	// 			</div>
	// 			<div className="themeItem_comment_actions">
	// 				<div className="action_button" onClick={() => actionClick('worked', id)}>
	// 					<CheckOutlined />
	// 					<div className="action_button_tooltip">{ru_kz_dict.obrabotannoe_tooltip[language]}</div>
	// 				</div>
	// 				<div className="action_button" onClick={() => actionClick('favourite', id)}>
	// 					<BookOutlined />
	// 					<div className="action_button_tooltip">{ru_kz_dict.favorite_msg_tooltip[language]}</div>
	// 				</div>
	// 				<div className="action_button" onClick={() => actionClick('neutral', id)}>
	// 					<MehFilled />
	// 					<div className="action_button_tooltip">{ru_kz_dict.neutral_tooltip[language]}</div>
	// 				</div>
	// 				<div className="action_button_wrapper" onClick={() => actionClick('task', id)}>
	// 					<PushpinFilled />
	// 					<div className="action_button_tooltip">{ru_kz_dict.poruchenie_tooltip[language]}</div>
	// 				</div>
	// 				<div className="action_button_wrapper" onClick={() => actionClick('share', id)}>
	// 					<ShareAltOutlined />
	// 					<div className="action_button_tooltip">{ru_kz_dict.share_tooltip[language]}</div>
	// 				</div>
	// 				<div
	// 					className="action_button_wrapper delete_button"
	// 					onClick={() => actionClick('delete', id)}
	// 				>
	// 					<DeleteFilled />
	// 					<div className="action_button_tooltip">{ru_kz_dict.delete_tooltip[language]}</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 		<div className="themeItem_comment_body">
	// 			<div className="themeItem_comment_text_wrapper">
	// 				<div className="themeItem_comment_text">{text}</div>
	// 				{/*<a href={link} style={{color: '#4870b7', textDecoration:'none', display: 'block', marginTop: '10px'}}>{*/}
	// 				{/*    ru_kz_dict.show_full[language]*/}
	// 				{/*}</a>*/}
	// 				<div className="themeItem_comment_body_bottom_text"> {ru_kz_dict.edit[language]}</div>
	// 				<div className="themeItem_comment_body_bottom_text">
	// 					<PlusOutlined /> {ru_kz_dict.add_tags[language]}
	// 				</div>
	// 			</div>
	// 			<img src={picture} className="themeItem_comment_picture" alt="post_picture" />
	// 		</div>
	// 	</div>
	// )

	return <div>test</div>
}
