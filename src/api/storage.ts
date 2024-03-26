import { storage } from '@/firebase'

export interface ImageType {
    id: string
    name: string
    url: string
}
export const createImage = async (file: File): Promise<string | null> => {
    try {
        const timestamp = Date.now()
        const fileName = `${timestamp}_${file.name}`
        console.log(file)
        const storageRef = storage.ref().child('show').child(fileName)
        await storageRef.put(file)
        const imageUrl = await storageRef.getDownloadURL()

        return imageUrl
    } catch (error) {
        console.error('이미지 업로드 에러', error)
        return null
    }
}

export const deleteImage = async (imagePath: string): Promise<void> => {
    const imageRef = storage.refFromURL(imagePath)
    await imageRef.delete()
}

export const getImageURL = async (imagePath: string): Promise<string> => {
    const storageRef = storage.ref().child('show').child(imagePath)
    const imageUrl = await storageRef.getDownloadURL()
    return imageUrl
}
