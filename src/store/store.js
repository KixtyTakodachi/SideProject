import create from 'zustand'

export const useStore = create((set) => ({
    language: "Ru",
    changeLanguage: (lang) => set((state) => ({language: lang})),
    active_page: 'themes',
    changePage: (page) => set((state) => ({active_page: page})),
    dataSource: [
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
}))
