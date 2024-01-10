import { atom } from 'recoil'
import { PostState } from './postState'

export const postListState = atom<PostState[]>({
    key: 'postListState',
    default: [],
})
