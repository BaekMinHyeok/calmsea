import { useRecoilValueLoadable } from 'recoil'
import * as S from '@/pages/ShowList/ShowList.styles'
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
import { sortFunction } from '@/util/ShowFilterList'

import { LikeButton } from '../../components/LikeButton/LikeButton'
import { DayCounter } from '@/util/DayCounter'
interface PostItemProps {
    post: PostState
}
export function ShowList() {
    const [sortOption, setSortOption] = useState('latest')
    const boardList = useRecoilValueLoadable(getAllPostSelectors)

    // // 날짜 계산
    // const calculateDate = (createdAt: number): string => {
    //     if (createdAt === 0) {
    //         return '오늘'
    //     } else {
    //         return `${createdAt}일 전`
    //     }
    // }

    // 게시물 상태
    const sortedRows = useMemo(() => {
        const sortedData =
            boardList?.state === 'hasValue' ? boardList?.contents : []
        const sortFunctionToUse = sortFunction[sortOption]
        return sortedData ? [...sortedData].sort(sortFunctionToUse) : []
    }, [boardList, sortOption])
    // 게시물 정렬
    const handleSortOptionChange = (option: 'latest' | 'oldest') =>
        setSortOption(option)
    return (
        <S.Container>
            <Title text={'전체보기'} size="h2" />
            <div>
                <button onClick={() => handleSortOptionChange('latest')}>
                    최신순
                </button>
                <button onClick={() => handleSortOptionChange('oldest')}>
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
    // 옵션모달
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
    console.log(post.id)
    console.log('리스트createdAt', post.createdAt)
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
            {/* 작성일자 */}
            <div>{DayCounter(post.createdAt)}</div>
            <S.ContentWrap>
                {/* 이미지 */}
                <S.ImageWrap>
                    {post.selectedImage !== null ? (
                        <img src={post.selectedImage} alt={post.title} />
                    ) : (
                        <S.EmptyImage>
                            <MdImageNotSupported />
                        </S.EmptyImage>
                    )}
                </S.ImageWrap>
                {/* 옵션 아이콘 */}
                <S.TextWrap>
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
                    <div>
                        {post.showStartDate} ~ {post.showEndDate}
                    </div>
                    <LikeButton
                        id={post.id ? post.id.toString() : ''}
                        like={post.like}
                    />
                </S.TextWrap>
            </S.ContentWrap>
        </S.PostContent>
    )
}
