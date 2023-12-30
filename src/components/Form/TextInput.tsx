import React, { ChangeEvent } from 'react'
import { Container } from './Form.styes'

interface TextInputProps {
    label: string
    placeholder?: string
    detailPlaceholder?: string
    value: string
    detailValue?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
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
