import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate, useParams } from 'react-router-dom'
import * as S from './ShowList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { MdImageNotSupported } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { useCallback } from 'react'
import { partialModal } from '../../recoil/atoms/partialModal'
import { Title } from '../../components/Text/Text'

export function AdminShowList() {
    const { id } = useParams()
    const navigate = useNavigate()
    const posts = useRecoilValue(getAllPostSelectors)
    const [isOpenModal, setOpenModal] = useRecoilState(partialModal)

    const onEditButtonClick = useCallback(
        (id: number) => {
            // 수정 버튼 클릭 시 수정 페이지로 이동
            navigate(`/showedit/${id}`)
            setOpenModal((prev) => ({
                ...prev,
                isOpen: false,
                selectedIndex: null,
            }))
        },
        [navigate, id],
    )
    const onClickToggleModal = useCallback(
        (index: number) => {
            // 클릭한 게시물에 대한 모달 상태만 토글
            setOpenModal((prev) => ({
                ...prev,
                isOpen: prev.selectedIndex !== index ? true : !prev.isOpen,
                selectedIndex: prev.selectedIndex !== index ? index : null,
            }))

            // 모달이 열릴 때 해당 게시물의 ID를 전달
            const selectedPost = posts[index]
            if (index !== null && selectedPost) {
                // 수정 버튼 클릭 시 네비게이션으로 이동
                const shouldNavigate =
                    isOpenModal.isOpen && isOpenModal.selectedIndex === index
                if (shouldNavigate) {
                    setOpenModal((prev) => ({
                        ...prev,
                        isOpen: false,
                        selectedIndex: null,
                    }))
                    // onEditButtonClick(selectedPost.id)
                }
            }
        },

        [setOpenModal, onEditButtonClick, posts, isOpenModal],
    )
    // 삭제
    const onDeleteButtonClick = useCallback(
        (postId: number) => {
            const isConfirmed = window.confirm('정말로 삭제하시겠습니까?')

            if (isConfirmed) {
                // 사용자가 확인하면 삭제 진행
                const updatedPosts = posts.filter((post) => post.id !== postId)
                localStorage.setItem('posts', JSON.stringify(updatedPosts))
                window.location.reload()
            }
        },
        [posts],
    )
    return (
        <S.Container>
            <Title text={'전체보기'} size="h2" />
            <S.PostWrap>
                {posts.map((post, index) => (
                    <S.PostContent key={post.id}>
                        {post.selectedImage !== null ? (
                            <img src={post.selectedImage} alt={post.title} />
                        ) : (
                            <S.EmptyImage>
                                <MdImageNotSupported />
                            </S.EmptyImage>
                        )}
                        <S.EditIcon onClick={() => onClickToggleModal(index)}>
                            <SlOptionsVertical />
                        </S.EditIcon>
                        {isOpenModal.isOpen &&
                            isOpenModal.selectedIndex === index && (
                                <S.EditModal>
                                    <button
                                        onClick={() =>
                                            onEditButtonClick(post.id)
                                        }
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() =>
                                            onDeleteButtonClick(post.id)
                                        }
                                    >
                                        삭제
                                    </button>
                                </S.EditModal>
                            )}
                        <h2>{post.title}</h2>
                        <div>{post.date}</div>
                    </S.PostContent>
                ))}
            </S.PostWrap>
        </S.Container>
    )
}
