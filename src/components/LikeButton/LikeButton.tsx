import { useRecoilState } from 'recoil'
import { likeCountState } from '../../recoil/atoms/likeState'
import {
    DocumentData,
    DocumentReference,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore/lite'
import { db } from '@/firebase'
import { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { Container, RedHeartIcon } from './LikeButton.styles'
interface LikeButtonProps {
    id: string
    like: number
}

export const LikeButton = ({ id, like }: LikeButtonProps) => {
    const [likeCount, setLikeCount] = useRecoilState(likeCountState(id))
    const [isLiked, setIsLiked] = useState(false)
    // 초기 좋아요 수
    useEffect(() => {
        async function fetchInitialLikeCount() {
            try {
                const docRef: DocumentReference<DocumentData> = doc(
                    db,
                    'show',
                    id,
                )
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setLikeCount(docSnap.data()?.like || 0)
                }
            } catch (error) {
                console.error('초기 좋아요 수 에러', error)
            }
        }

        fetchInitialLikeCount()
    }, [id, setLikeCount])

    // 더블클릭 좋아요 처리
    async function handleDoubleClick() {
        try {
            const docRef: DocumentReference<DocumentData> = doc(db, 'show', id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const currentLikeCount = docSnap.data()?.like || 0

                // 더블 클릭 이벤트에 대한 로직
                await updateDoc(docRef, {
                    like: currentLikeCount + 1,
                    isLiked: true,
                })
                setLikeCount(currentLikeCount + 1)

                // 토글 좋아요 상태
                setIsLiked(true)
            }
        } catch (error) {
            console.error('더블클릭 좋아요 에러', error)
        }
    }
    // 싱글클릭 좋아요 처리
    async function handleClick() {
        try {
            const docRef: DocumentReference<DocumentData> = doc(db, 'show', id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists() && !isLiked) {
                const currentLikeCount = docSnap.data()?.like || 0

                // 싱글 클릭 이벤트에 대한 로직
                await updateDoc(docRef, {
                    like: currentLikeCount + 1,
                    isLiked: true,
                })
                setLikeCount(currentLikeCount + 1)

                // 토글 좋아요 상태
                setIsLiked(true)
            } else if (docSnap.exists() && isLiked) {
                const currentLikeCount = docSnap.data()?.like || 0

                // 좋아요 취소 로직
                await updateDoc(docRef, {
                    like: currentLikeCount - 1,
                    isLiked: false,
                })
                setLikeCount(currentLikeCount - 1)

                // 토글 좋아요 상태
                setIsLiked(false)
            }
        } catch (error) {
            console.error('싱글클릭 좋아요 에러', error)
        }
    }

    return (
        <Container>
            <button onDoubleClick={handleDoubleClick} onClick={handleClick}>
                {isLiked ? <RedHeartIcon /> : <FaRegHeart />}
            </button>
            <p>{likeCount}</p>
        </Container>
    )
}
