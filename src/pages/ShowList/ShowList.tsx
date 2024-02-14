import { useRecoilValueLoadable } from 'recoil'
import * as S from './ShowList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { MdImageNotSupported } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { useCallback, useMemo, useState } from 'react'
import { Title } from '../../components/Text/Text'
import { useModal } from '../../hooks/useModal'
import { PostState } from '../../recoil/atoms/postState'
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc } from 'firebase/firestore/lite'
import { db } from '../../firebase'
// import { LikeButton } from '../../components/LikeButton/LikeButton'
interface PostItemProps {
    post: PostState
}
export function ShowList() {
    const [sortOption, setSortOption] = useState('latest')
    const boardList = useRecoilValueLoadable(getAllPostSelectors)

    // 게시물 상태
    const sortedRows = useMemo(() => {
        const sortedData =
            boardList?.state === 'hasValue' ? boardList?.contents : []

        // 게시물 필터링(최신순,오랜된순)
        if (sortOption === 'latest') {
            return sortedData
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
        } else if (sortOption === 'oldest') {
            return sortedData
                .slice()
                .sort(
                    (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                )
        }
        return sortedData
    }, [boardList, sortOption])
    return (
        <S.Container>
            <Title text={'전체보기'} size="h2" />
            <div>
                <button onClick={() => setSortOption('latest')}>최신순</button>
                <button onClick={() => setSortOption('oldest')}>
                    오래된순
                </button>
                {/* 다른 정렬 옵션을 추가할 수 있음 */}
            </div>
            <S.PostWrap>
                {sortedRows.map((post) => (
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
                navigate(`/showlist`, { replace: true })
                closeModal()
                // window.location.reload()
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
            {/* <LikeButton id={post.id} like={post.like} /> */}
        </S.PostContent>
    )
}
