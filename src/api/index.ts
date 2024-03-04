import { db } from '@/firebase'
import { PostState } from '@/recoil/atoms/postState'
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
} from 'firebase/firestore/lite'

// 게시글 생성
export async function createShow(data: PostState): Promise<string | null> {
    try {
        const addedDoc = await addDoc(collection(db, 'show'), data)
        return addedDoc.id
    } catch (error) {
        console.error('게시글 생성 에러', error)
        return null
    }
}

// 게시글 전체조회
export async function getAllShows(): Promise<PostState[]> {
    try {
        const querySnapshot = await getDocs(collection(db, 'show'))
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        return data as PostState[]
    } catch (error) {
        console.error('게시글 조회 에러', error)
        return []
    }
}

// id를 이용한 게시글 조회
export async function getShowById(id: string): Promise<PostState | null> {
    try {
        const docRef = doc(db, 'show', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data() as PostState
        } else {
            return null
        }
    } catch (error) {
        console.error('id 게시글 조회 에러', error)
        return null
    }
}

// 게시글 수정
export async function updateShow(
    id: string,
    data: Partial<PostState>,
): Promise<void> {
    try {
        const docRef = doc(db, 'show', id)
        await updateDoc(docRef, data)
    } catch (error) {
        console.error('게시글 수정 에러', error)
    }
}

// 게시글 삭제
export async function deleteShow(id: string): Promise<void> {
    try {
        const docRef = doc(db, 'show', id)
        await deleteDoc(docRef)
    } catch (error) {
        console.error('게시글 삭제 에러', error)
    }
}
