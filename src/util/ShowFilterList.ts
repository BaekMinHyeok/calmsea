import { PostState } from '@/recoil/atoms/postState'

export const sortFunction: {
    [key: string]: (a: PostState, b: PostState) => number
} = {
    latest: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),

    oldest: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
}
