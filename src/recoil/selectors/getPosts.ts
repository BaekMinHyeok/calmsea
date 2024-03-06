import { selector } from 'recoil'
import { PostState, categoryState } from '../atoms/postState'
import { getAllShows, getShowByCategory } from '@/\bapi'

// 모든 게시물
export const getAllPostSelectors = selector<PostState[]>({
    key: 'getAllPostSelectors',
    get: async function fetchData() {
        const data = await getAllShows()

        // 정렬 옵션에 따라 데이터를 정렬
        const sortedData = data.slice().sort((a, b) => {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
        })

        return sortedData
    },
})

// 카테고리별 게시물
export const getCategoryPostSelectors = selector<PostState[]>({
    key: 'getCategoryPostSelectors',
    get: async function fetchData({ get }) {
        const currentCategory = get(categoryState)

        const data = await getShowByCategory(currentCategory)

        return data
    },
})
