import * as S from './ShowEditor.styles'
import * as T from '../../components/Text/Text'
import { DateInput, TextInput } from '../../components/Form/TextInput'
import { useCallback, useEffect, useState } from 'react'
import { Address, AddressInput } from '../../components/Form/AddressInput'
import { CategoryCheckbox } from '../../components/Form/CategoryCheckbox'
import { CategoryItems } from '../../util/CategoryList'
import { TimeInput } from '../../components/Form/TimeInput'
import { PriceInput } from '../../components/Form/PriceInput'
import { ImageInput } from '../../components/Form/ImageInput'
import { Description } from '../../components/Form/Description'
import { AdminBtn } from '../../components/Button/Button'
import { useSetRecoilState } from 'recoil'
import { postState } from '../../recoil/atoms/postState'

export const getStringDate = (date: Date) => {
    return date.toISOString().slice(0, 10)
}

export function ShowEditor02() {
    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState(getStringDate(new Date()))
    const [address, setAddress] = useState<Address>({
        areaAddress: '',
        townAddress: '',
    })
    const [selectedCategories, setSelectedCategories] = useState<number>(1)
    const [showTime, setShowTime] = useState<number>(0)
    const [performer, setPerformer] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [descriptionImage, setDescriptionImage] = useState<string | null>(
        null,
    )
    const [description, setDescription] = useState<string>('')
    // 게시글 상태관리
    const setPost = useSetRecoilState(postState)
    // post 상태유지
    useEffect(() => {
        const storedPost = JSON.parse(localStorage.getItem('post') || '[]')
        setPost(storedPost)
    }, [])

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
        setPost((prevPost) => {
            const newPost = [
                ...prevPost,
                {
                    id: prevPost.length + 1,
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
                },
            ]
            localStorage.setItem('post', JSON.stringify(newPost))
            return newPost
        })
        resetForm()
        alert('게시글이 작성되었습니다.')
    }

    const resetForm = () => {
        setTitle('')
        setDate(getStringDate(new Date()))
        setAddress({
            areaAddress: '',
            townAddress: '',
        })
        setSelectedCategories(1)
        setShowTime(0)
        setPerformer('')
        setPrice(0)
        setSelectedImage(null)
        setDescriptionImage(null)
        setDescription('')
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
