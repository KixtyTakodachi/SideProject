import create from 'zustand'
import {ru_kz_dict} from "../dictionaries/ru_kz_dict";
import comment_avatar from "../img/comment_avatar.svg";
import comment_img from "../img/comment_img.png";

export const useStore = create((set) => ({
    language: "ru",
    changeLanguage: (lang) => set((state) => {
        if(state.comment_data.length > 0){
            return {
                comment_data: state.comment_data.map(item => {
                    return {
                        ...item,
                        text: ru_kz_dict[item.id][lang]
                    }
                }),
                language: lang
            }
        }
    }),
    active_page: 'themes',
    changePage: (page) => set((state) => ({active_page: page})),
    dataSource: [
        {
            id: 1,
            type: 'СМ',
            name: 'Телемедицина – DOCTOR 247 ',
            date_from: '2022-01-01',
            group_type: 'commercial'
        },
        {
            id: 2,
            type: 'СМИ',
            name: 'Строительный рынок Казахстана',
            date_from: '2022-01-02',
            group_type: 'demo'
        },
        {
            id: 3,
            type: 'СМ',
            name: 'Банки Казахстана ',
            date_from: '2022-01-03',
            group_type: 'commercial'
        },
        {
            id: 4,
            type: 'СМИ',
            name: 'Горнодобывающая промышленность Казахстана ',
            date_from: '2022-01-04',
            group_type: 'demo'
        },
        {
            id: 5,
            type: 'СМ',
            name: 'Образовательный сектор Казахстана',
            date_from: '2022-01-05',
            group_type: 'commercial'
        },
    ],
    active_theme: 'telemed',
    comment_data: [],
    changeActiveTheme: (id) => set((state) => {
        const tempCommentData = []
        const comments = Object.keys(ru_kz_dict).filter(item => item.includes(id))
        for(let i = 0; i < comments.length ; i++){
            tempCommentData.push({
                id: comments[i],
                name: 'Test test ' + i,
                avatar: comment_avatar,
                author_audience: 0,
                public_source: '',
                public_source_link: '',
                public_audience: 0,
                social_media: 'vk.com',
                link: 'https://vk.com',
                message_type: 'Коммент' ,
                date: '01.05.2022',
                text: ru_kz_dict[comments[i]][state.language],
                picture: comment_img,
                favourite: false,
            })
        }
        return {
            comment_data: tempCommentData,
            active_theme: id,
        }
    }),
    toggleFavorite: (id) => set((state) => {
        let comment = state.comment_data.find(item => item.id === id)
        let index = state.comment_data.findIndex(item => item.id === id)
        comment = {
            ...comment,
            favourite: !comment.favourite
        }
        return {
            comment_data: [...state.comment_data.slice(0, index), comment, ...state.comment_data.slice(index + 1)]
        }

    })
}))
