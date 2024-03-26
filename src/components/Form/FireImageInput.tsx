import { ChangeEvent } from 'react'
import * as S from './Form.styes'

interface FireImageInputProps {
    id: string
    label: string
    selectedImage: File | null
    onImageChange: (imageUrl: string | null) => void
}
const MAX_FILE_SIZE_MB = 5
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif']

export const FireImageInput = ({
    id,
    label,
    selectedImage,
    onImageChange,
}: FireImageInputProps) => {
    const isImageFile = (file: File): boolean => {
        const extension = file.name.split('.').pop()?.toLowerCase()
        return extension ? ALLOWED_EXTENSIONS.includes(extension) : false
    }

    const isFileSizeValid = (file: File): boolean => {
        const fileSizeInMB = file.size / (1024 * 1024)
        return fileSizeInMB <= MAX_FILE_SIZE_MB
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log(file)
        if (file) {
            if (!isImageFile(file)) {
                alert('올바른 이미지 파일 형식이 아닙니다.')
                return
            }
            if (!isFileSizeValid(file)) {
                alert(
                    '이미지 파일 크기가 너무 큽니다. 5MB 이하만 업로드 가능합니다.',
                )
                return
            }
            const imageUrl = URL.createObjectURL(file)
            onImageChange(imageUrl)
        } else {
            onImageChange(null)
        }
    }
    console.log(selectedImage)
    return (
        <S.Container>
            <label htmlFor={id}>{label}</label>
            <S.FileInputWrap>
                <input
                    id={id}
                    type="file"
                    onChange={handleImageChange}
                    accept="image/ "
                />
                <S.FileLabel htmlFor={id}>파일찾기</S.FileLabel>
            </S.FileInputWrap>

            {selectedImage && (
                <S.ImageUploadStyle
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview image"
                />
            )}
        </S.Container>
    )
}
