import { selector } from 'recoil'
import { likeState } from '../atoms/likeState'

export const likeCountSelector = (postId: string) =>
    selector({
        key: `likeCount_${postId}`,
        get: async function likeCount({ get }) {
            const isLiked = get(likeState(postId))
            return isLiked ? 1 : 0
        },
    })
