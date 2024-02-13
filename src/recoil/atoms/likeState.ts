import { atom } from 'recoil'

// 좋아요 상태
export const likeCountState = atom<number>({
    key: 'likeCountState',
    default: 0,
})
// RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
