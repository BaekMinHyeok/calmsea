import React, { ChangeEvent } from 'react'
import { Container, ShowDateStyle } from '@/components/Form/Form.styes'

interface TextInputProps {
    label: string
    placeholder?: string
    detailPlaceholder?: string
    value: string
    detailValue?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

interface ShowDateInputProps {
    label: string
    startValue: string
    endValue: string
    startOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    endOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({
    label,
    placeholder,
    value,
    onChange,
}: TextInputProps) {
    return (
        <Container>
            <label>{label}</label>
            <input
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
    label,
    startValue,
    endValue,
    startOnChange,
    endOnChange,
}: ShowDateInputProps) {
    return (
        <Container>
            <label>{label}</label>
            <ShowDateStyle>
                <input
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
