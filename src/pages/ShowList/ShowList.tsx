import { useRecoilState } from 'recoil'
import { postListState } from '../../recoil/atoms/postListState'
import { useEffect } from 'react'

export function ShowList() {
    const [postList, setPostList] = useRecoilState(postListState)
    useEffect(() => {
        const tempPost = localStorage.getItem('tempPost')
        if (tempPost) {
            try {
                const parsedPost = JSON.parse(tempPost)

                // 중복된 데이터를 확인 후 추가하지 않음
                const isDuplicate = postList.some(
                    (post) => post.id === parsedPost.id,
                )
                if (!isDuplicate) {
                    setPostList((prevList) => [...prevList, parsedPost])
                }
            } catch (error) {
                console.error('Error parsing tempPost:', error)
            }
        }
    }, [postList, setPostList])
    return (
        <>
            <h2>게시글 목록</h2>
            <ul>
                {Array.isArray(postList) ? (
                    postList.map((post, index) => (
                        <li key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                        </li>
                    ))
                ) : (
                    <p>게시글이 없습니다.</p>
                )}
            </ul>
        </>
    )
}
