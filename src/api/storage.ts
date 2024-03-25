import { storage } from '@/firebase'

export interface Image {
    id: string
    name: string
    url: string
}
export const createImage = async (file: File): Promise<string> => {
    const storageRef = storage.ref()
    const imageRef = storageRef.child(file.name)
    await imageRef.put(file)
    const imageUrl = await imageRef.getDownloadURL()
    return imageUrl
}

export const deleteImage = async (imageUrl: string): Promise<void> => {
    const imageRef = storage.refFromURL(imageUrl)
    await imageRef.delete()
}

export const getImageURL = async (imagePath: string): Promise<string> => {
    const imageRef = storage.refFromURL(imagePath)
    const imageUrl = await imageRef.getDownloadURL()
    return imageUrl
}
