import { useRecoilValue } from 'recoil'
// import { useNavigate } from 'react-router-dom'
import * as S from './ShowList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { MdImageNotSupported } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { useCallback } from 'react'
// import { partialModal } from '../../recoil/atoms/partialModal'
import { Title } from '../../components/Text/Text'
// import { deleteDoc, doc } from 'firebase/firestore/lite'
// import { db } from '../../firebase'
import { useModal } from '../../hooks/useModal'

export function ShowList() {
    // const { id } = useParams()
    // const navigate = useNavigate()
    const posts = useRecoilValue(getAllPostSelectors)
    const { isOpen, openModal, closeModal } = useModal(ShowList)
    const handelEditClick = useCallback(() => {
        if (isOpen) {
            closeModal()
        } else {
            openModal()
        }
    }, [openModal])
    return (
        <S.Container>
            <Title text={'전체보기'} size="h2" />
            <S.PostWrap>
                {posts ? (
                    posts.map((post) => (
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
                            <S.EditIcon onClick={handelEditClick}>
                                <SlOptionsVertical />
                            </S.EditIcon>
                            {isOpen && (
                                <S.EditModal>
                                    <button onClick={() => {}}>수정</button>
                                    <button onClick={() => {}}>삭제</button>
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
