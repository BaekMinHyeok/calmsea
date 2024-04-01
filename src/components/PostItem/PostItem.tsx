import { useCallback } from 'react'
import { useModal } from '@/hooks/useModal'
import { PostState } from '@/recoil/atoms/postState'
import { DayCounter } from '@/util/DayCounter'
import { Link, useNavigate } from 'react-router-dom'
import { MdImageNotSupported } from 'react-icons/md'
import { SlOptionsVertical } from 'react-icons/sl'
import { LikeButton } from '../LikeButton/LikeButton'
import { CategoryList } from '../CategoryList/CategoryList'
import { deleteImage } from '@/\bapi/storage'
import * as S from '@/components/CategoryList/TotalList.styles'
import { useDeleteShow } from '@/hooks/useShows'
interface PostItemProps {
    post: PostState
}
export const PostItem = ({ post }: PostItemProps) => {
    const navigate = useNavigate()
    const { isOpen, openModal, closeModal } = useModal(CategoryList)
    const { mutateAsync: deleteShowMutation } = useDeleteShow()
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
        if (!isConfirmed) {
            return // If the user cancels the deletion, return early
        }
        try {
            if (typeof post.selectedImage === 'string') {
                await deleteImage(post.selectedImage)
                console.log('이미지가 성공적으로 삭제되었습니다.')
            } else {
                console.error('이미지 경로가 유효하지 않습니다.')
            }
            if (!post.id) {
                console.error('게시글 ID가 없습니다.')
                return
            }
            await deleteShowMutation(post.id?.toString())
            console.log('게시글이 성공적으로 삭제되었습니다.')
            navigate(`/`, { replace: true })
            closeModal()
            // window.location.reload()
        } catch (error) {
            console.error('게시글 삭제 중 오류 발생:', error)
        }
    }

    return (
        <S.PostContent>
            {/* 작성일자 */}
            <div>{DayCounter(createdAtDate)}</div>
            <S.EditIcon onClick={handelEditClick}>
                <SlOptionsVertical />
            </S.EditIcon>
            {isOpen && (
                <S.EditModal>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </S.EditModal>
            )}
            <Link to={`/showlist/${post.category}/${post.id}`}>
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
            </Link>
        </S.PostContent>
    )
}
