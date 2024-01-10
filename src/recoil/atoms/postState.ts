import { atom } from 'recoil'
import { Address } from '../../components/Form/AddressInput'
import { getStringDate } from '../../pages/\bShowEditor/ShowEditor'

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
    default: [
        {
            id: 0,
            title: '',
            date: getStringDate(new Date()),
            address: {
                areaAddress: '',
                townAddress: '',
            },
            selectedCategories: 0,
            showTime: 0,
            performer: '',
            price: 0,
            selectedImage: null,
            descriptionImage: null,
            description: '',
        },
    ],
})
