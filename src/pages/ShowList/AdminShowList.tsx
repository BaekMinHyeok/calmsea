import { useRecoilState, useRecoilValue } from 'recoil'

import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import {
    Container,
    EditIcon,
    EditModal,
    EmptyImage,
    PostContent,
    PostWrap,
} from './ShowList.styles'

import { MdImageNotSupported } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { useCallback } from 'react'
import { partialModal } from '../../recoil/atoms/partialModal'
import { useNavigate, useParams } from 'react-router-dom'

export function AdminShowList() {
    const { id } = useParams()
    const navigate = useNavigate()
    const posts = useRecoilValue(getAllPostSelectors)
    const [isOpenModal, setOpenModal] = useRecoilState(partialModal)
    const onEditButtonClick = useCallback(
        (id: number) => {
            // 수정 버튼 클릭 시 수정 페이지로 이동
            navigate(`/showedit/${id}`)
        },
        [navigate, id],
    )
    const onClickToggleModal = useCallback(
        (index: number) => {
            // 클릭한 게시물에 대한 모달 상태만 토글
            setOpenModal((prev) => ({
                ...prev,
                isOpen: !prev.isOpen,
                selectedIndex: prev.selectedIndex === index ? null : index,
            }))

            // 모달이 열릴 때 해당 게시물의 ID를 전달
            const selectedPost = posts[index]
            if (index !== null && selectedPost) {
                // 수정 버튼 클릭 시 네비게이션으로 이동
                const shouldNavigate =
                    isOpenModal.isOpen && isOpenModal.selectedIndex === index
                if (shouldNavigate) {
                    onEditButtonClick(selectedPost.id)
                }
            }
        },

        [setOpenModal, onEditButtonClick, posts],
    )

    return (
        <Container>
            <h2>게시글</h2>
            <PostWrap>
                {posts.map((post, index) => (
                    <PostContent key={post.id}>
                        {post.selectedImage !== null ? (
                            <img src={post.selectedImage} alt={post.title} />
                        ) : (
                            <EmptyImage>
                                <MdImageNotSupported />
                            </EmptyImage>
                        )}
                        <EditIcon onClick={() => onClickToggleModal(index)}>
                            <SlOptionsVertical />
                        </EditIcon>
                        {isOpenModal.isOpen &&
                            isOpenModal.selectedIndex === index && (
                                <EditModal>
                                    <button
                                        onClick={() =>
                                            onEditButtonClick(post.id)
                                        }
                                    >
                                        수정
                                    </button>
                                    <button>삭제</button>
                                </EditModal>
                            )}
                        <h2>{post.title}</h2>
                        <div>{post.date}</div>
                    </PostContent>
                ))}
            </PostWrap>
        </Container>
    )
}
