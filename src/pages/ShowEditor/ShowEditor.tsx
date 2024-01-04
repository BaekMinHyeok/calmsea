import * as S from './ShowEditor.styles'
import * as T from '../../components/Text/Text'
import { DateInput, TextInput } from '../../components/Form/TextInput'
import { useCallback, useState } from 'react'
import { AddressInput } from '../../components/Form/AddressInput'
import { CategoryCheckbox } from '../../components/Form/CategoryCheckbox'
import { CategoryItems } from '../../util/CategoryList'
import { TimeInput } from '../../components/Form/TimeInput'

export const getStringDate = (date: Date) => {
    return date.toISOString().slice(0, 10)
}

export function ShowEditor() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(getStringDate(new Date()))
    const [address, setAddress] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<number>(0)
    const [showTime, setShowTime] = useState<number>(0)

    const handleCategoryClick = useCallback((categoryId: number) => {
        setSelectedCategories(categoryId)
    }, [])

    const handleTimeChange = (minutes: number) => {
        setShowTime(minutes)
    }
    return (
        <S.Container>
            {/* 게시글 수정일때도 만들어야함 */}
            <T.Title level={1} text={'게시글 작성'} underline={true} />
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="주소를 입력해주세요"
                    detailPlaceholder="상세주소를 입력해주세요"
                />
                <S.CategortContainer>
                    <T.Text text="카테고리" size="16px" bold={true} />
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
                <TimeInput label="관람시간" onChange={handleTimeChange} />
                <p>총 {showTime}분</p>
            </S.Wrap>
        </S.Container>
    )
}
