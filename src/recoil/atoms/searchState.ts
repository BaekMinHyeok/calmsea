import { atom } from 'recoil'
import { PostState } from './postState'
interface SearchState {
    keyword: string
    results: Promise<PostState[]> | PostState[]
}
export const searchState = atom<SearchState>({
    key: 'searchState',
    default: {
        keyword: '',
        results: [],
    },
})
