import { selector } from 'recoil'

export const getAllPostSelectors = selector({
    key: 'getAllPostsSelector',
    get: () => {
        const storedPosts = localStorage.getItem('posts')
        return storedPosts ? JSON.parse(storedPosts) : []
    },
})
