import { useRecoilValue } from 'recoil'

import { getAllPostSelectors } from '../../recoil/selectors/getPosts'

export function ShowList() {
    const posts = useRecoilValue(getAllPostSelectors)

    return (
        <div>
            <h2>게시글</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <div>{post.description}</div>
                </div>
            ))}
        </div>
    )
}
