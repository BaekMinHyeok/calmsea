import * as S from './ShowEditor.styles'
import * as T from '../../components/Text/Text'
import { DateInput, TextInput } from '../../components/Form/TextInput'
import { useCallback, useState } from 'react'
import { Address, AddressInput } from '../../components/Form/AddressInput'
import { CategoryCheckbox } from '../../components/Form/CategoryCheckbox'
import { CategoryItems } from '../../util/CategoryList'
import { TimeInput } from '../../components/Form/TimeInput'
import { PriceInput } from '../../components/Form/PriceInput'
import { ImageInput } from '../../components/Form/ImageInput'
import { Description } from '../../components/Form/Description'
import { AdminBtn } from '../../components/Button/Button'

export const getStringDate = (date: Date) => {
    return date.toISOString().slice(0, 10)
}

export function ShowEditor() {
    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState(getStringDate(new Date()))
    const [address, setAddress] = useState<Address>({
        areaAddress: '',
        townAddress: '',
    })
    const [selectedCategories, setSelectedCategories] = useState<number>(0)
    const [showTime, setShowTime] = useState<number>(0)
    const [performer, setPerformer] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [descriptionImage, setDescriptionImage] = useState<string | null>(
        null,
    )
    const [description, setDescription] = useState<string>('')

    // 카테고리
    const handleCategoryClick = useCallback((categoryId: number) => {
        setSelectedCategories(categoryId)
    }, [])
    // 관람시간
    const handleTimeChange = (minutes: number) => {
        setShowTime(minutes)
    }
    const handleAddressChange = useCallback((newAddress: Address) => {
        setAddress(newAddress)
    }, [])
    // 가격
    const handlePriceChange = (value: number) => {
        setPrice(value)
    }
    // 이미지
    const handleImageChange = (image: string | null) => {
        setSelectedImage(image)
    }
    // 상세설명 이미지
    const handleDescriptionImageChange = (image: string | null) => {
        setDescriptionImage(image)
    }
    // 상세설명 내용
    const handleDescriptionChange = (description: string) => {
        setDescription(description)
    }

    // 버튼
    const handleCreatePost = () => {
        console.log({
            title,
            date,
            address,
            selectedCategories,
            showTime,
            performer,
            price,
            selectedImage,
            descriptionImage,
            description,
        })
    }

    return (
        <S.Container>
            {/* 게시글 수정일때도 만들어야함 */}
            <T.Title text={'게시글 작성'} size="h2" />
            <S.Wrap>
                <TextInput
                    label="제목"
                    placeholder="제목을 입력해주세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <DateInput
                    label="일정"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <AddressInput
                    label="주소"
                    address={address}
                    onAddressChange={handleAddressChange}
                    placeholder="주소를 입력해주세요"
                    detailPlaceholder="상세주소를 입력해주세요"
                />
                <S.CategortContainer>
                    <T.Text text="카테고리" size="b" />
                    <S.CategortWrap>
                        {CategoryItems.map((item) => (
                            <CategoryCheckbox
                                key={item.categoryId}
                                {...item}
                                isSelected={
                                    item.categoryId === selectedCategories
                                }
                                onClick={handleCategoryClick}
                            />
                        ))}
                    </S.CategortWrap>
                </S.CategortContainer>
                <S.TimeContainer>
                    <TimeInput label="관람시간" onChange={handleTimeChange} />
                    <p>총 {showTime}분</p>
                </S.TimeContainer>
                <TextInput
                    label="출연자"
                    placeholder="출연자를 작성해주세요."
                    value={performer}
                    onChange={(e) => setPerformer(e.target.value)}
                />
                <PriceInput
                    label="가격"
                    value={price}
                    onChange={handlePriceChange}
                />
                <ImageInput
                    label="이미지"
                    selectedImage={selectedImage}
                    onImageChange={handleImageChange}
                />
                <Description
                    label="상세설명"
                    selectedImage={descriptionImage}
                    description={description}
                    onImageChange={handleDescriptionImageChange}
                    onDescriptionChange={handleDescriptionChange}
                />
                <AdminBtn text="게시글 작성" onClick={handleCreatePost} />
            </S.Wrap>
        </S.Container>
    )
}
