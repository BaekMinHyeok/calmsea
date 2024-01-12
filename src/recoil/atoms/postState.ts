import { atom } from 'recoil'
import { Address } from '../../components/Form/AddressInput'

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
