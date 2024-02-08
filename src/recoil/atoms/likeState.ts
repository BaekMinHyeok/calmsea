import { RecoilEnv, atom } from 'recoil'

// 좋아요 상태
export const likeState = (postId: string) =>
    atom<boolean>({
        key: `likeState_${postId}`,
        default: false,
    })
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
