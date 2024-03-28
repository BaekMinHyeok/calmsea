import { ChangeEvent, useEffect, useState } from 'react'
import * as S from './Form.styes'

interface FireImageInputProps {
    id: string
    label: string
    selectedImage?: string
    onImageChange: (file: File | null) => void
}
const MAX_FILE_SIZE_MB = 5
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif']

export const FireImageInput = ({
    id,
    label,
    selectedImage,
    onImageChange,
}: FireImageInputProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(
        selectedImage ?? null,
    )
    useEffect(() => {
        // 수정 페이지에서 전달된 이미지 URL이 있을 경우 설정
        if (selectedImage) {
            setPreviewImage(selectedImage)
        }
    }, [selectedImage])
    // 파일이 이미지인지 확인하는 함수
    const isImageFile = (file: File): boolean => {
        const extension = file.name.split('.').pop()?.toLowerCase()
        return extension ? ALLOWED_EXTENSIONS.includes(extension) : false
    }
    // 파일 크기가 유효한지 확인하는 함수
    const isFileSizeValid = (file: File): boolean => {
        const fileSizeInMB = file.size / (1024 * 1024)
        return fileSizeInMB <= MAX_FILE_SIZE_MB
    }
    // 이미지 변경 이벤트 핸들러
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
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target) {
                    setPreviewImage(event.target.result as string)
                }
            }
            reader.readAsDataURL(file)

            onImageChange(file)
        } else {
            setPreviewImage(null)
            onImageChange(null)
        }
    }
    console.log('selectedImage:', previewImage)
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

            {previewImage && (
                <S.ImageUploadStyle src={previewImage} alt="Preview image" />
            )}
        </S.Container>
    )
}
