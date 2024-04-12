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
    query,
    where,
    QueryDocumentSnapshot,
    DocumentData,
} from 'firebase/firestore/lite'

// 게시글 생성
export async function createShow(data: PostState): Promise<string | null> {
    const addedDoc = await addDoc(collection(db, 'show'), data)
    return addedDoc.id
}

// 게시글 전체조회
export async function getAllShows(pageParam: number): Promise<PostState[]> {
    const querySnapshot = await getDocs(collection(db, 'show'))
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
    return data as PostState[]
}

// id를 이용한 게시글 조회
export async function getShowById(id: string): Promise<PostState | null> {
    const docRef = doc(db, 'show', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data() as PostState
    } else {
        return null
    }
}
// 카테고리별 게시글 조회
export async function getShowByCategory(
    category: number,
): Promise<PostState[]> {
    const q = query(collection(db, 'show'), where('category', '==', category))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            ...doc.data(),
        }),
    )
    return data as PostState[]
}
// 게시글 수정
export async function updateShow(
    id: string,
    data: Partial<PostState>,
): Promise<void> {
    const docRef = doc(db, 'show', id)
    await updateDoc(docRef, data)
}

// 게시글 삭제
export async function deleteShow(id: string): Promise<void> {
    const docRef = doc(db, 'show', id)
    await deleteDoc(docRef)
}
