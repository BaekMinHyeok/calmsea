import { useRecoilValue } from 'recoil'

import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { Container, PostContent, PostWrap } from './ShowList.styles'

import { MdImageNotSupported } from 'react-icons/md'

export function ShowList() {
    const posts = useRecoilValue(getAllPostSelectors)

    return (
        <Container>
            <h2>게시글</h2>
            <PostWrap>
                {posts.map((post) => (
                    <PostContent key={post.id}>
                        {post.selectedImage !== null ? (
                            <img src={post.selectedImage} alt={post.title} />
                        ) : (
                            <MdImageNotSupported />
                        )}
                        <h2>{post.title}</h2>
                        <div>{post.date}</div>
                    </PostContent>
                ))}
            </PostWrap>
        </Container>
    )
}
