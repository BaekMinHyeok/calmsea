import { ChangeEvent } from 'react'
import { Container } from './Form.styes'

interface PriceInputProps {
    label: string
    placeholder?: string
    value: number | string | null
    onChange: (value: number | string | null) => void
}

export function PriceInput({
    label,
    placeholder,
    value,
    onChange,
}: PriceInputProps) {
    // 가격이 변경될 때 호출되는 함수
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const formattedValue = parseInt(
            (rawValue as string).replace(/[^0-9]/g, ''),
            10,
        )

        // isNaN을 사용하여 NaN 체크 후, null 또는 숫자 값을 전달
        onChange(isNaN(formattedValue) ? null : formattedValue)
    }

    const formatPriceWithWon = (price: number | string | null): string => {
        if (price === null) {
            return ''
        }

        const numberWithCommas = price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return `${numberWithCommas}원`
    }
    // 수정 방향: 문자,숫자 합쳐서 받지말고 태그 안에 가격인풋 그리고 원 이걸 합쳐서 보이게
    console.log(value)
    return (
        <Container>
            <label>{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                value={value === null ? '' : formatPriceWithWon(value)}
                onChange={handlePriceChange}
            />
        </Container>
    )
}
