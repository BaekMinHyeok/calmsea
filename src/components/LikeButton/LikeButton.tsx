import { useRecoilState } from 'recoil'
import { likeCountState } from '../../recoil/atoms/likeState'

import {
    DocumentData,
    DocumentReference,
    doc,
    updateDoc,
} from 'firebase/firestore/lite'
import { db } from '@/firebase'

// import { useCallback } from 'react'

interface LikeButtonProps {
    id: string
    like: number
}

export const LikeButton = ({ id, like }: LikeButtonProps) => {
    const [likeCount, setLikeCount] = useRecoilState(likeCountState(id))
    console.log(likeCount)

    // 좋아요 처리
    async function increaseLikeCount() {
        try {
            const docRef: DocumentReference<DocumentData> = doc(db, 'show', id)
            console.log(likeCount)
            // db에 like 속성 추가
            await updateDoc(docRef, { like: like + 1 })
            if (id === docRef.id) {
                console.log(id)
                console.log(docRef.id)
                setLikeCount((prevLikeCount) => prevLikeCount + 1)
            }
        } catch (error) {
            console.error('error', error)
        }
    }
    const handleLike = () => {
        // 파이어베이스 update로직 호출
        increaseLikeCount()
        console.log('클릭')
    }

    return (
        <div>
            <h2>Like Count</h2>
            <p>{likeCount}</p>
            <button onClick={handleLike}>Like</button>
        </div>
    )
}
