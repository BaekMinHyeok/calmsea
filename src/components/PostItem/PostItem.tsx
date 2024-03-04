import { useModal } from '@/hooks/useModal'
import { ShowList } from '@/pages/ShowList/ShowList'
import { PostState } from '@/recoil/atoms/postState'
import { DayCounter } from '@/util/DayCounter'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from '@/pages/ShowList/ShowList.styles'
import { MdImageNotSupported } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { LikeButton } from '../LikeButton/LikeButton'
import { deleteShow } from '@/\bapi'

interface PostItemProps {
    post: PostState
}
export const PostItem = ({ post }: PostItemProps) => {
    const navigate = useNavigate()
    const { isOpen, openModal, closeModal } = useModal(ShowList)
    const createdAtDate = new Date(post.createdAt)

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
    async function handleDelete() {
        const isConfirmed = window.confirm('정말로 삭제하시겠습니까?')
        if (isConfirmed) {
            if (post.id === null || post.id === undefined) {
                console.error('게시글 ID가 없습니다.')
                return
            }
            try {
                await deleteShow(post.id?.toString())
                console.log('게시글이 성공적으로 삭제되었습니다.')
                navigate(`/showlist`, { replace: true })
                closeModal()
                window.location.reload()
            } catch (error) {
                console.error('게시글 삭제 중 오류 발생:', error)
            }
        }
    }

    return (
        <S.PostContent>
            {/* 작성일자 */}
            <div>{DayCounter(createdAtDate)}</div>
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
