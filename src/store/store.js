import create from 'zustand'

export const useStore = create((set) => ({
    language: "Ru",
    changeLanguage: (lang) => set((state) => ({language: lang})),
    active_page: 'themes',
    changePage: (page) => set((state) => ({active_page: page})),
}))
