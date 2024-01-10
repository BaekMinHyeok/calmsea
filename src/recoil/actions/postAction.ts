import { useRecoilState } from 'recoil'
import { PostState, postState } from '../atoms/postState'

export const usePostActions = () => {
    const [posts, setPosts] = useRecoilState<PostState[]>(postState)

    const createPost = (newPost: PostState) => {
        const updatedPosts = [...posts, newPost]
        setPosts(updatedPosts)
        localStorage.setItem('posts', JSON.stringify(updatedPosts))
    }
    return { createPost }
}
