import { atom } from 'recoil'
import { Address } from '../../components/Form/AddressInput'
import { recoilPersist } from 'recoil-persist'

export interface PostState {
    id?: string
    title: string
    createdAt: Date
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
    like: number
}
const { persistAtom } = recoilPersist()
// 게시글 상태
export const postState = atom<PostState[]>({
    key: 'postState',
    default: [],
    effects_UNSTABLE: [persistAtom],
})
// 게시글 input 상태
export const currentTime = new Date()
export const showInputState = atom<PostState>({
    key: 'showInputState',
    default: {
        title: '',
        // date: new Date().toISOString().slice(0, 10),
        createdAt: currentTime,
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
        like: 0,
    },
    effects_UNSTABLE: [persistAtom],
})
