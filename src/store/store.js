import create from 'zustand'
import { ru_kz_dict } from '../dictionaries/ru_kz_dict'
import comment_avatar from '../img/comment_avatar.svg'
import comment_img from '../img/comment_img.png'
import dayjs from 'dayjs'
import { callThemeData, callThemes } from '../api/api-themes'

export const useStore = create((set) => ({
	language: 'ru',
	changeLanguage: (lang) =>
		set((state) => {
			if (state.comment_data.length > 0) {
				return {
					comment_data: state.comment_data.map((item, index) => {
						return {
							...item,
							text: ru_kz_dict[`${item.id}`][index][lang],
						}
					}),
					language: lang,
				}
			} else {
				return {
					language: lang,
				}
			}
		}),
	active_page: 'themes',
	changePage: (page) => set((state) => ({ active_page: page })),
	dataSource: [],
	active_theme: '',
	comment_data: [
		{
			id: 'comment_telemed_12_2022',
			name: 'Test test ' + 1,
			avatar: comment_avatar,
			author_audience: 0,
			public_source: '',
			public_source_link: '',
			public_audience: 0,
			social_media: 'vk.com',
			link: 'https://vk.com',
			message_type: 'Коммент',
			date: '01.05.2022',
			text: ru_kz_dict.comment_telemed_12_2022[0].ru,
			picture: comment_img,
			favourite: false,
		},
		{
			id: 'comment_telemed_12_2022',
			name: 'Test test ' + 2,
			avatar: comment_avatar,
			author_audience: 0,
			public_source: '',
			public_source_link: '',
			public_audience: 0,
			social_media: 'vk.com',
			link: 'https://vk.com',
			message_type: 'Коммент',
			date: '01.05.2022',
			text: ru_kz_dict.comment_telemed_12_2022[1].ru,
			picture: comment_img,
			favourite: false,
		},
	],
	changeActiveTheme: (id) =>
		set((state) => {
			// const comments = ru_kz_dict[`comment_${id}_${state.active_month_year}`].map((item, index) => {
			// 	return {
			// 		id: `comment_${id}_${state.active_month_year}`,
			// 		name: 'Test test ' + index,
			// 		avatar: comment_avatar,
			// 		author_audience: 0,
			// 		public_source: '',
			// 		public_source_link: '',
			// 		public_audience: 0,
			// 		social_media: 'vk.com',
			// 		link: 'https://vk.com',
			// 		message_type: 'Коммент',
			// 		date: '01.05.2022',
			// 		text: item[state.language],
			// 		picture: comment_img,
			// 		favourite: false,
			// 	}
			// })
			return {
				// comment_data: comments,
				active_theme: id,
			}
		}),
	toggleFavorite: (id) =>
		set((state) => {
			let comment = state.comment_data.find((item) => item.id === id)
			let index = state.comment_data.findIndex((item) => item.id === id)
			comment = {
				...comment,
				favourite: !comment.favourite,
			}
			return {
				comment_data: [
					...state.comment_data.slice(0, index),
					comment,
					...state.comment_data.slice(index + 1),
				],
			}
		}),
	active_month_year: `${dayjs(new Date()).get('month') + 1}_${dayjs(new Date()).get('year')}`,
	changeMonthYear: (date) =>
		set((state) => {
			return {
				active_month_year: date,
				// comment_data: state.comment_data.map((item, index) => {
				// 	return {
				// 		...item,
				// 		id: `comment_${state.active_theme}_${date}`,
				// 		text: ru_kz_dict[`comment_${state.active_theme}_${date}`][index][state.language],
				// 	}
				// }),
			}
		}),
	leftBarTab: '0',
	changeLeftBarTab: (id) =>
		set((state) => {
			return {
				leftBarTab: id,
			}
		}),
	getThemes: async () => {
		const data = await callThemes()
		set({ dataSource: data })
	},
	themeData: {},
	getThemeData: async (alias, date) => {
		set({ loader: true })
		const data = await callThemeData(alias, date)
		set({ themeData: data, loader: false })
	},

	loader: true,
	changeLoader: (payload) => {
		set({ loader: payload })
	},
}))

// dataSource: [
//     {
//         id: 1,
//         type: 'СМ',
//         name: 'Телемедицина – DOCTOR 247 ',
//         date_from: '2022-01-01',
//         group_type: 'commercial'
//     },
//     {
//         id: 2,
//         type: 'СМИ',
//         name: 'Строительный рынок Казахстана',
//         date_from: '2022-01-02',
//         group_type: 'demo'
//     },
//     {
//         id: 3,
//         type: 'СМ',
//         name: 'Банки Казахстана ',
//         date_from: '2022-01-03',
//         group_type: 'commercial'
//     },
//     {
//         id: 4,
//         type: 'СМИ',
//         name: 'Горнодобывающая промышленность Казахстана ',
//         date_from: '2022-01-04',
//         group_type: 'demo'
//     },
//     {
//         id: 5,
//         type: 'СМ',
//         name: 'Образовательный сектор Казахстана',
//         date_from: '2022-01-05',
//         group_type: 'commercial'
//     },
// ],
