import { useRecoilValueLoadable } from 'recoil'
import * as S from './ShowList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { MdImageNotSupported } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { useCallback, useMemo } from 'react'
import { Title } from '../../components/Text/Text'
import { useModal } from '../../hooks/useModal'
import { PostState } from '../../recoil/atoms/postState'
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc } from 'firebase/firestore/lite'
import { db } from '../../firebase'
interface PostItemProps {
    post: PostState
}
export function ShowList() {
    const boardList = useRecoilValueLoadable(getAllPostSelectors)

    const rows = useMemo(() => {
        return boardList?.state === 'hasValue' ? boardList?.contents : []
    }, [boardList])
    console.log(boardList)
    return (
        <S.Container>
            <Title text={'전체보기'} size="h2" />
            <S.PostWrap>
                {rows.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </S.PostWrap>
        </S.Container>
    )
}

const PostItem = ({ post }: PostItemProps) => {
    const navigate = useNavigate()
    const { isOpen, openModal, closeModal } = useModal(ShowList)

    const handelEditClick = useCallback(() => {
        if (isOpen) {
            closeModal()
        } else {
            openModal()
        }
    }, [isOpen, openModal, closeModal])
    const handleEdit = () => {
        navigate(`/showedit/${post.id}`)
    }

    async function handleDelete() {
        const isConfirmed = window.confirm('정말로 삭제하시겠습니까?')
        if (isConfirmed) {
            const postRef = doc(collection(db, 'show'), post.id)
            try {
                await deleteDoc(postRef)
                console.log('게시글이 성공적으로 삭제되었습니다.')
                navigate(`/showlist`)
                closeModal()
                window.location.reload()
            } catch (error) {
                console.error('게시글 삭제 중 오류 발생:', error)
            }
        }
    }

    return (
        <S.PostContent>
            {post.selectedImage !== null ? (
                <img src={post.selectedImage} alt={post.title} />
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
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </S.EditModal>
            )}
            <h2>{post.title}</h2>
            <div>{post.date}</div>
        </S.PostContent>
    )
}
