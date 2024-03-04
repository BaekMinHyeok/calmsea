import { atomFamily } from 'recoil'

// 좋아요 상태
export const likeCountState = atomFamily<number, string>({
    key: 'likeCountState',
    default: 0,
})
