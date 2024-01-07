import { ChangeEvent } from 'react'
import { ImageUploadStyle } from './Form.styes'

interface ImageInputProps {
    selectedImage: string | null
    onImageChange: (image: string | null) => void
}

export function ImageInput({ selectedImage, onImageChange }: ImageInputProps) {
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                onImageChange(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            onImageChange(null)
        }
    }
    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            {selectedImage && (
                <ImageUploadStyle src={selectedImage} alt="미리보기" />
            )}
        </div>
    )
}
