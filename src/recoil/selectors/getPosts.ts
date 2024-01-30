import { selector } from 'recoil'
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../../firebase'
import { PostState } from '../atoms/postState'

export const getAllPostSelectors = selector<PostState[]>({
    key: 'getAllPostsSelector',
    get: async function firebaseDataSelector({ get }) {
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
    },
})
