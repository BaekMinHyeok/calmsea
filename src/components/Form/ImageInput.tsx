import { ChangeEvent, useEffect } from 'react'
import {
    Container,
    FileInputWrap,
    FileLabel,
    ImageUploadStyle,
} from '@/components/Form/Form.styes'
import { useSetRecoilState } from 'recoil'
import { showInputState } from '../../recoil/atoms/postState'

interface ImageInputProps {
    label: string
    selectedImage: string | null
    onImageChange: (image: string | null) => void
}
const MAX_FILE_SIZE_MB = 5

export function ImageInput({
    label,
    selectedImage,
    onImageChange,
}: ImageInputProps) {
    // const [showInput, setShowInput] = useRecoilState(showInputState)
    const setShowInput = useSetRecoilState(showInputState)

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
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target.files?.[0]
        if (file && isImageFile(file)) {
            if (isFileSizeValid(file)) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    onImageChange(reader.result as string)
                    setShowInput((prev) => ({
                        ...prev,
                        selectedImage: reader.result as string,
                    }))
                }
                reader.readAsDataURL(file)
            } else {
                onImageChange(null)
                alert(`파일 크기가 ${MAX_FILE_SIZE_MB}MB를 초과했습니다.`)
            }
        } else {
            onImageChange(null)
            alert('유효하지 않은 파일 형식입니다.')
            console.log(onImageChange)
        }
    }

    return (
        <Container>
            <label>{label}</label>
            <FileInputWrap>
                <input
                    type="file"
                    id="file-input"
                    onChange={handleImageChange}
                />
                <FileLabel htmlFor="file-input">파일찾기</FileLabel>
            </FileInputWrap>

            {selectedImage && (
                <ImageUploadStyle src={selectedImage} alt="이미지 미리보기" />
            )}
        </Container>
    )
}
