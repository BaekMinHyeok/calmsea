import * as S from './ShowEditor.styles'
import * as T from '../../components/Text/Text'
import { DateInput, TextInput } from '../../components/Form/TextInput'
// import { useCallback, useState } from 'react'
import { Address, AddressInput } from '../../components/Form/AddressInput'
import { CategoryCheckbox } from '../../components/Form/CategoryCheckbox'
import { CategoryItems } from '../../util/CategoryList'
import { TimeInput } from '../../components/Form/TimeInput'
import { PriceInput } from '../../components/Form/PriceInput'
import { ImageInput } from '../../components/Form/ImageInput'
import { Description } from '../../components/Form/Description'
import { AdminBtn } from '../../components/Button/Button'
import { useRecoilState } from 'recoil'
import { postState } from '../../recoil/atoms/postState'
import { useEffect } from 'react'

export const getStringDate = (date: Date) => {
    return date.toISOString().slice(0, 10)
}

export function ShowEditorRecoil() {
    const [post, setPost] = useRecoilState(postState)

    // post의 첫 번째 요소는 현재 작성 중인 게시글
    const currentPost = post[0]

    // 새로운 id 생성
    const generateNewId = () => {
        return post.length > 0 ? post[post.length - 1].id + 1 : 0
    }

    // 제목
    const updateTitle = (newTitle: string) => {
        setPost([{ ...currentPost, title: newTitle }, ...post.slice(1)])
    }
    // 일정
    const updateDate = (newDate: string) => {
        setPost([{ ...currentPost, date: newDate }, ...post.slice(1)])
    }
    // 주소
    const updateAddress = (newAddress: Address) => {
        setPost([{ ...currentPost, address: newAddress }, ...post.slice(1)])
    }
    // 카테고리
    const handleCategoryClick = (categoryId: number) => {
        setPost([
            {
                ...currentPost,

                selectedCategories: categoryId,
            },
            ...post.slice(1),
        ])
    }
    // 관람시간
    const handleTimeChange = (minutes: number) => {
        setPost([{ ...currentPost, showTime: minutes }, ...post.slice(1)])
    }
    // 출연자
    const updatePerformer = (newPerformer: string) => {
        setPost([{ ...currentPost, performer: newPerformer }, ...post.slice(1)])
    }
    // 가격
    const handlePriceChange = (value: number) => {
        setPost([{ ...currentPost, price: value }, ...post.slice(1)])
    }
    // 이미지
    const handleImageChange = (image: string | null) => {
        setPost([{ ...currentPost, selectedImage: image }, ...post.slice(1)])
    }
    // 상세 이미지
    const handleDescriptionImageChange = (image: string | null) => {
        setPost([{ ...currentPost, descriptionImage: image }, ...post.slice(1)])
    }
    // 상세 설명
    const handleDescriptionChange = (description: string) => {
        setPost([{ ...currentPost, description }, ...post.slice(1)])
    }

    const handleCreatePost = () => {
        console.log(currentPost) // 현재 상태 확인
        const newPost = {
            ...currentPost,
            id: generateNewId(),
        }
        setPost([newPost, ...post])
        localStorage.setItem('tempPost', JSON.stringify(newPost))
    }

    useEffect(() => {
        const tempPost = localStorage.getItem('tempPost')
        if (tempPost) {
            const parsedTempPost = JSON.parse(tempPost)

            // 만약 parsedTempPost가 배열 형태가 아니라면 기본값으로 설정
            setPost(
                Array.isArray(parsedTempPost)
                    ? parsedTempPost
                    : [parsedTempPost],
            )
        }
    }, [setPost])

    return (
        <S.Container>
            {/* 게시글 수정일때도 만들어야함 */}
            <T.Title text={'게시글 작성'} size="h2" />
            <S.Wrap>
                <TextInput
                    label="제목"
                    placeholder="제목을 입력해주세요."
                    value={currentPost.title}
                    onChange={(e) => updateTitle(e.target.value)}
                />
                <DateInput
                    label="일정"
                    value={currentPost.date}
                    onChange={(e) => updateDate(e.target.value)}
                />
                <AddressInput
                    label="주소"
                    address={currentPost.address}
                    onAddressChange={updateAddress}
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
                                    item.categoryId ===
                                    currentPost.selectedCategories
                                }
                                onClick={handleCategoryClick}
                            />
                        ))}
                    </S.CategortWrap>
                </S.CategortContainer>
                <S.TimeContainer>
                    <TimeInput label="관람시간" onChange={handleTimeChange} />
                    <p>총 {currentPost.showTime}분</p>
                </S.TimeContainer>
                <TextInput
                    label="출연자"
                    placeholder="출연자를 작성해주세요."
                    value={currentPost.performer}
                    onChange={(e) => updatePerformer(e.target.value)}
                />
                <PriceInput
                    label="가격"
                    value={currentPost.price}
                    onChange={handlePriceChange}
                />
                <ImageInput
                    label="이미지"
                    selectedImage={currentPost.selectedImage}
                    onImageChange={handleImageChange}
                />
                <Description
                    label="상세설명"
                    selectedImage={currentPost.descriptionImage}
                    description={currentPost.description}
                    onImageChange={handleDescriptionImageChange}
                    onDescriptionChange={handleDescriptionChange}
                />
                <AdminBtn text="게시글 작성" onClick={handleCreatePost} />
            </S.Wrap>
        </S.Container>
    )
}
