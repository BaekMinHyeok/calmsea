import { selector } from 'recoil'
import { PostState, postState } from '@/recoil/atoms/postState'

export const getAllPostSelectors = selector<PostState[]>({
    key: 'getAllPostsSelector',
    get: () => {
        const storedPosts = localStorage.getItem('post')
        return storedPosts ? JSON.parse(storedPosts) : []
    },

    set: ({ set }, newPosts) => {
        set(postState, newPosts)
        localStorage.setItem('post', JSON.stringify(newPosts))
    },
})
