import { useRecoilState, useRecoilValue } from 'recoil'
import { likeState } from '../../recoil/atoms/likeState'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useCallback } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { db } from '../../firebase'
import { likeCountSelector } from '../../recoil/selectors/likeSelectors'

interface LikeButtonProps {
    post: { id: string }
}

export function LikeButton({ post }: LikeButtonProps) {
    const [likes, setLikes] = useRecoilState(likeState)
    const likeCount = useRecoilValue(likeCountSelector)
    const postId = post.id
    const handleLike = useCallback(
        async function heart() {
            try {
                const postRef = doc(db, 'show', postId)
                console.log(postId)
                const postSnapshot = await getDoc(postRef)
                // 'likes' 속성이 있는지 확인
                if (postSnapshot.exists() && 'likes' in postSnapshot.data()) {
                    const post = postSnapshot.data()
                    // 좋아요 토글
                    const updatedLikes = {
                        ...post.likes,
                        [postId]: !post.likes[postId],
                    }

                    // Firebase에 업데이트된 좋아요 상태 반영
                    await updateDoc(postRef, { likes: updatedLikes })

                    // Recoil 상태 업데이트
                    setLikes((prevLikes) => ({
                        ...prevLikes,
                        [postId]: updatedLikes[postId], // 토글된 좋아요 상태 반영
                    }))
                }
            } catch (error) {
                console.error('좋아요 업데이트 오류:', error)
            }
        },
        [likes, setLikes, postId],
    )
    return (
        <>
            <button onClick={handleLike}>
                {likes[postId] ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
            <div>{likeCount}</div>
        </>
    )
}
