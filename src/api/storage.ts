import { storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'

export interface ImageType {
    id: string
    name: string
    url: string
}
export const createImage = async (file: File): Promise<string | null> => {
    try {
        // 파일 이름 생성
        const timestamp = Date.now()
        const fileName = `${timestamp}_${file.name}`

        // 스토리지 위치에 대한 참조 생성
        const storageRef = ref(storage, 'show/' + fileName)

        // 파일을 스토리지에 업로드
        await uploadBytes(storageRef, file)

        // 업로드된 파일의 다운로드 URL 가져오기
        const imageUrl = await getDownloadURL(storageRef)

        return imageUrl
    } catch (error) {
        console.error('이미지 업로드 에러', error)
        return null
    }
}
// url을 file로 변환
export async function fetchImageFile(imageUrl: string): Promise<File | null> {
    try {
        const response = await fetch(imageUrl)
        const blob = await response.blob() // 응답을 Blob으로 변환
        return new File([blob], 'image.jpg') // Blob에서 File 객체 생성
    } catch (error) {
        console.error('이미지를 가져오는 중에 오류가 발생했습니다.', error)
        return null
    }
}

export const deleteImage = async (imagePath: string | null): Promise<void> => {
    if (!imagePath) {
        console.error('이미지 경로가 유효하지 않습니다.')
        return
    }
    const imageRef = storage.refFromURL(imagePath)
    try {
        await imageRef.delete()
        console.log('이미지 삭제 완료:', imagePath)
    } catch (error) {
        console.error('이미지 삭제 실패:', error)
    }
}

export const getImageURL = async (imagePath: string): Promise<string> => {
    const storageRef = storage.ref().child('show').child(imagePath)
    const imageUrl = await storageRef.getDownloadURL()
    return imageUrl
}
