import { atom } from 'recoil'
import { Address } from '../../components/Form/AddressInput'
// import { recoilPersist } from 'recoil-persist'
export interface PostState {
    id?: string
    title: string
    createdAt: number
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
// const { persistAtom } = recoilPersist()
// 게시글 상태
export const postState = atom<PostState[]>({
    key: 'postState',
    default: [],
})
// 게시글 input 상태
export const showInputState = atom<PostState>({
    key: 'showInputState',
    default: {
        title: '',
        createdAt: Date.now(),
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
})
