import { atom } from 'recoil'

// 좋아요 상태
export const likeState = atom<{ [postId: string]: number }>({
    key: 'likeState',
    default: {},
})
