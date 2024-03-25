import { showInputState } from '@/recoil/atoms/postState'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import * as S from './Form.styes'
import { createImage } from '@/\bapi/storage'

interface FireImageInputProps {
    id: string
    label: string
    selectedImage: string | null
    onImageChange: (imageUrl: string | null) => void
}
const MAX_FILE_SIZE_MB = 5
export const FireImageInput = ({
    id,
    label,
    selectedImage,
    onImageChange,
}: FireImageInputProps) => {
    const setShowInput = useSetRecoilState(showInputState)
    const [uploading, setUploading] = useState(false)
    useEffect(() => {
        if (selectedImage) {
            setShowInput((prevInputState) => ({
                ...prevInputState,
                selectedImage,
            }))
        }
    }, [selectedImage, setShowInput])
    const isImageFile = (file: File): boolean => {
        const allowedExtesions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
        return allowedExtesions.test(file.name)
    }

    const isFileSizeValid = (file: File): boolean => {
        const fileSizeInMB = file.size / (1024 * 1024)
        return fileSizeInMB <= MAX_FILE_SIZE_MB
    }
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target.files?.[0]
        if (file && isImageFile(file)) {
            if (isFileSizeValid(file)) {
                setUploading(true)
                try {
                    const imageUrl = await createImage(file)
                    onImageChange(imageUrl)
                    setShowInput((prev) => ({
                        ...prev,
                        selectedImage: imageUrl,
                    }))
                } catch (error) {
                    console.error('이미지 업로드 에러', error)
                    onImageChange(null)
                    alert('이미지 업로드 중 오류가 발생했습니다.')
                } finally {
                    setUploading(false)
                }
            }
        }
    }
    return (
        <S.Container>
            <label htmlFor={id}>{label}</label>
            <S.FileInputWrap>
                <input
                    id={id}
                    type="file"
                    onChange={handleImageChange}
                    disabled={uploading}
                />
                <S.FileLabel htmlFor={id}>파일찾기</S.FileLabel>
            </S.FileInputWrap>

            {uploading && <p>이미지 업로드 중...</p>}
            {selectedImage && (
                <S.ImageUploadStyle src={selectedImage} alt="이미지 미리보기" />
            )}
        </S.Container>
    )
}
