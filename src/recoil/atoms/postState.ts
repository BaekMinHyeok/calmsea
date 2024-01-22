import { atom } from 'recoil'
import { Address } from '../../components/Form/AddressInput'
import { recoilPersist } from 'recoil-persist'

export interface PostState {
    id: number
    title: string
    date: string
    address: Address
    selectedCategories: number
    showTime: number
    performer: string
    price: number
    selectedImage: string | null
    descriptionImage: string | null
    description: string
}

export const postState = atom<PostState[]>({
    key: 'postState',
    default: [],
})
const { persistAtom } = recoilPersist()
export const showInputState = atom<PostState>({
    key: 'showInputState',
    default: {
        id: 0,
        title: '',
        date: new Date().toISOString().slice(0, 10),
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
