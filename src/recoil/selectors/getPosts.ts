import { selector } from 'recoil'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../../firebase'
import { PostState } from '../atoms/postState'

export const getAllPostSelectors = selector({
    key: 'getAllPostsSelector',
    get: async function firebaseDataSelector({ get }) {
        try {
            const querySnapshot = await getDocs(collection(db, 'show'))
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
        }
    },
})
