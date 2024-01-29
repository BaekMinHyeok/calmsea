import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import * as S from './ShowList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { MdImageNotSupported } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { useCallback } from 'react'
import { partialModal } from '../../recoil/atoms/partialModal'
import { Title } from '../../components/Text/Text'
import { deleteDoc, doc } from 'firebase/firestore/lite'
import { db } from '../../firebase'

export function AdminShowList() {
    // const { id } = useParams()
    const navigate = useNavigate()
    const posts = useRecoilValue(getAllPostSelectors)
    const [isOpenModal, setOpenModal] = useRecoilState(partialModal)
    console.log(isOpenModal)
    console.log(posts)

    const onEditButtonClick = useCallback(
        (id: string | undefined) => {
            // 수정 버튼 클릭 시 수정 페이지로 이동
            navigate(`/showedit/${id}`)
            setOpenModal((prev) => ({
                ...prev,
                isOpen: false,
                selectedIndex: null,
            }))
        },
        [navigate, setOpenModal],
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
            const selectedPost =
                isOpenModal.isOpen && posts ? posts[index] : null
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

        [setOpenModal],
    )
    // 삭제
    async function onDeleteButtonClick(id: string | undefined) {
        const isConfirmed = window.confirm('정말로 삭제하시겠습니까?')
        if (isConfirmed) {
            try {
                const postDocRef = doc(db, 'show', id || '')
                await deleteDoc(postDocRef)

                setOpenModal((prev) => ({
                    ...prev,
                    isOpen: false,
                    selectedIndex: null,
                }))
                // window.location.reload()
                window.location.replace('/showlist')
            } catch (error) {
                console.error(error)
            }
        }
    }
    return (
        <S.Container>
            <Title text={'전체보기'} size="h2" />
            <S.PostWrap>
                {posts ? (
                    posts.map((post, index) => (
                        <S.PostContent key={post.id}>
                            {post.selectedImage !== null ? (
                                <img
                                    src={post.selectedImage}
                                    alt={post.title}
                                />
                            ) : (
                                <S.EmptyImage>
                                    <MdImageNotSupported />
                                </S.EmptyImage>
                            )}
                            <S.EditIcon
                                onClick={() => onClickToggleModal(index)}
                            >
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
                                                onDeleteButtonClick(
                                                    post.id || '',
                                                )
                                            }
                                        >
                                            삭제
                                        </button>
                                    </S.EditModal>
                                )}
                            <h2>{post.title}</h2>
                            <div>{post.date}</div>
                        </S.PostContent>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </S.PostWrap>
        </S.Container>
    )
}
