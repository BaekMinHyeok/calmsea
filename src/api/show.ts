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
// 카테고리별 게시글 조회
export async function getShowByCategory(
    category: number,
): Promise<PostState[]> {
    try {
        const q = query(
            collection(db, 'show'),
            where('category', '==', category),
        )
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(
            (doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data(),
            }),
        )
        return data as PostState[]
    } catch (error) {
        console.error('카테고리 게시글 조회 에러', error)
        return []
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

// ㅁㅇㅁㅇㅁ

// import { storage } from '@/firebase'
// import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'

// export interface ImageType {
//     id: string
//     name: string
//     url: string
// }
// export const createImage = async (file: File): Promise<string | null> => {
//     try {
//         // 파일 이름 생성
//         const timestamp = Date.now()
//         const fileName = `${timestamp}_${file.name}`

//         // 스토리지 위치에 대한 참조 생성
//         const storageRef = ref(storage, 'show/' + fileName)

//         // 파일을 스토리지에 업로드
//         await uploadBytes(storageRef, file)

//         // 업로드된 파일의 다운로드 URL 가져오기
//         const imageUrl = await getDownloadURL(storageRef)

//         return imageUrl
//     } catch (error) {
//         console.error('이미지 업로드 에러', error)
//         return null
//     }
// }
// // url을 filef로 변환
// export async function fetchImageFile(imageUrl: string): Promise<File | null> {
//     try {
//         const response = await fetch(imageUrl)
//         const blob = await response.blob() // 응답을 Blob으로 변환
//         return new File([blob], 'image.jpg') // Blob에서 File 객체 생성
//     } catch (error) {
//         console.error('이미지를 가져오는 중에 오류가 발생했습니다.', error)
//         return null
//     }
// }

// export const deleteImage = async (imagePath: string | null): Promise<void> => {
//     if (!imagePath) {
//         console.error('이미지 경로가 유효하지 않습니다.')
//         return
//     }
//     const imageRef = storage.refFromURL(imagePath)
//     try {
//         await imageRef.delete()
//         console.log('이미지 삭제 완료:', imagePath)
//     } catch (error) {
//         console.error('이미지 삭제 실패:', error)
//     }
// }

// export const getImageURL = async (imagePath: string): Promise<string> => {
//     const storageRef = storage.ref().child('show').child(imagePath)
//     const imageUrl = await storageRef.getDownloadURL()
//     return imageUrl
// }
