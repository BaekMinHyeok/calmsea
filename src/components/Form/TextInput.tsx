import { ChangeEvent } from 'react'
import { Container, ShowDateStyle } from '@/components/Form/Form.styes'

interface TextInputProps {
    id: string
    label: string
    placeholder?: string
    detailPlaceholder?: string
    value: string
    detailValue?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

interface ShowDateInputProps {
    id: string
    label: string
    startValue: string
    endValue: string
    startOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    endOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({
    id,
    label,
    placeholder,
    value,
    onChange,
}: TextInputProps) {
    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </Container>
    )
}

export function DateInput({ label, value, onChange }: TextInputProps) {
    return (
        <Container>
            <label>{label}</label>
            <input type="date" value={value} onChange={onChange} />
        </Container>
    )
}

export function ShowDateInput({
    id,
    label,
    startValue,
    endValue,
    startOnChange,
    endOnChange,
}: ShowDateInputProps) {
    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <ShowDateStyle>
                <input
                    id={id}
                    type="date"
                    value={startValue}
                    onChange={startOnChange}
                />
                <p>~</p>
                <input type="date" value={endValue} onChange={endOnChange} />
            </ShowDateStyle>
        </Container>
    )
}
