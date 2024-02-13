// import { useRecoilState, useRecoilValue } from 'recoil'
// import { likeState } from '../../recoil/atoms/likeState'
// import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
// import { useCallback } from 'react'
// import { doc, getDoc, updateDoc } from 'firebase/firestore/lite'
// import { db } from '../../firebase'
// import { likeCountSelector } from '../../recoil/selectors/likeSelectors'

interface LikeButtonProps {
    postId: string
}

export function LikeButton02({ postId }: LikeButtonProps) {
    // const [likes, setLikes] = useRecoilState(likeState(postId))
    // const likeCount = useRecoilValue(likeCountSelector(postId))
    // console.log('카운트', likeCount)
    // const handleLike = useCallback(
    //     async function heart() {
    //         try {
    //             // 게시물 참조
    //             const postRef = doc(db, 'show', postId)
    //             // 게시물 정보
    //             const postSnapshot = await getDoc(postRef)
    //             if (postSnapshot.exists() && 'likes' in postSnapshot.data()) {
    //                 const post = postSnapshot.data()
    //                 const updatedLikes = {
    //                     ...post.likes,
    //                     [postId]: !likes,
    //                 }
    //                 await updateDoc(postRef, { likes: updatedLikes })
    //                 setLikes(!likes)
    //             }
    //         } catch (error) {
    //             console.error('error', error)
    //         }
    //     },
    //     [postId, likes, setLikes],
    // )
    // return (
    //     <>
    //         <button onClick={handleLike}>
    //             {likes ? <MdFavorite /> : <MdFavoriteBorder />}
    //         </button>
    //         <div>{likeCount}</div>
    //         <div>likes</div>
    //     </>
    // )
}
