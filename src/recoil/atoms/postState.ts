import { atom } from 'recoil'
import { Address } from '../../components/Form/AddressInput'
import { recoilPersist } from 'recoil-persist'

export interface PostState {
    id?: string
    title: string
    date: string
    showStartDate: string
    showEndDate: string
    address: Address
    selectedCategories: number
    showTime: number
    performer: string
    price: number
    selectedImage: string | null
    descriptionImage: string | null
    description: string
}
const { persistAtom } = recoilPersist()
// 게시글 상태
export const postState = atom<PostState[]>({
    key: 'postState',
    default: [],
    effects_UNSTABLE: [persistAtom],
})
// 게시글 input 상태
export const showInputState = atom<PostState>({
    key: 'showInputState',
    default: {
        title: '',
        date: new Date().toISOString().slice(0, 10),
        showStartDate: new Date().toISOString().slice(0, 10),
        showEndDate: new Date().toISOString().slice(0, 10),
        address: {
            areaAddress: '',
            townAddress: '',
        },
        selectedCategories: 1,
        showTime: 0,
        performer: '',
        price: 0,
        selectedImage: null,
        descriptionImage: null,
        description: '',
    },
    effects_UNSTABLE: [persistAtom],
})

// 좋아요 상태
export const likeState = atom<{ [postId: string]: number }>({
    key: 'likeState',
    default: {},
})
