import { ChangeEvent } from 'react'
import {
    Container,
    FileInputWrap,
    FileLabel,
    DescriptionText,
} from './Form.styes'

interface DescriptionProps {
    label: string
    selectedImage: string | null
    description: string
    onImageChange: (image: string | null) => void
    onDescriptionChange: (description: string) => void
}

export function Description({
    label,
    selectedImage,
    description,
    onImageChange,
    onDescriptionChange,
}: DescriptionProps) {
    const isImageFile = (file: File): boolean => {
        const allowedExtesions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
        return allowedExtesions.test(file.name)
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target.files?.[0]
        if (file && isImageFile(file)) {
            const reader = new FileReader()
            reader.onloadend = () => {
                onImageChange(reader.result as string)
            }
            reader.readAsDataURL(file)
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
                    id="desciption-input"
                    onChange={handleImageChange}
                />

                <FileLabel htmlFor="desciption-input">파일찾기</FileLabel>
            </FileInputWrap>
            <DescriptionText
                placeholder="여기에 설명을 입력하세요."
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
            ></DescriptionText>
        </Container>
    )
}
