import { selector } from 'recoil'
import { likeState } from '../atoms/likeState'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../../firebase'

export const likeCountSelector = selector({
    key: 'likeCountSelector',
    get: async function likeCount({ get }) {
        const heart = get(likeState)
        let totalLikes = 0

        // Firebase에서 실제 좋아요 개수를 가져옴
        for (const postId in heart) {
            if (heart[postId]) {
                const likesRef = collection(db, 'show', postId, 'likes') // 각 postId에 대한 likes 컬렉션
                const likesSnapshot = await getDocs(likesRef)
                totalLikes += likesSnapshot.size
            }
        }

        return totalLikes
    },
})
