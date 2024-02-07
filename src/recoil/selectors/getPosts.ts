import { selector } from 'recoil'
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../../firebase'
import { PostState } from '../atoms/postState'

async function fetchDataFromFirebase() {
    try {
        const querySnapshot: QuerySnapshot = await getDocs(
            collection(db, 'show'),
        )
        const data = querySnapshot.docs.map((doc) => {
            const postData = doc.data()
            const post: Partial<PostState> = {
                id: doc.id,
                ...postData,
            }
            return post as PostState
        })
        return data
    } catch (error) {
        console.error('error', error)
        return []
    }
}

export const getAllPostSelectors = selector<PostState[]>({
    key: 'getAllPostsSelector',
    get: async function fetchData() {
        const data = await fetchDataFromFirebase()

        // 정렬 옵션에 따라 데이터를 정렬
        const sortedData = data.slice().sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

        return sortedData
    },
})
