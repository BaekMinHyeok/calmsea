import * as S from './ShowEditor.styles'
import * as T from '../../components/Text/Text'
import { DateInput, TextInput } from '../../components/Form/TextInput'
import { useState } from 'react'
import { AdressInput } from '../../components/Form/Adress\bInput'

export const getStringDate = (date: Date) => {
    return date.toISOString().slice(0, 10)
}

export function ShowEditor() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(getStringDate(new Date()))

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
                <AdressInput
                    label="주소"
                    onChange={() => {}}
                    placeholder={'주소를 입력해주세요'}
                    detailPlaceholder={'상세주소를 입력해주세요'}
                />
            </S.Wrap>
        </S.Container>
    )
}
