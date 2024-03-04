import { selector } from 'recoil'
import { PostState } from '../atoms/postState'
import { getAllShows } from '@/\bapi'

export const getAllPostSelectors = selector<PostState[]>({
    key: 'getAllPostsSelector',
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
