import { ChangeEvent } from 'react'
import { Container } from '@/components/Form/Form.styes'

interface PriceInputProps {
    id: string
    label: string
    value: number
    onChange: (value: number) => void
}

export function PriceInput({ id, label, value, onChange }: PriceInputProps) {
    const formatPriceWithCommas = (price: number): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const parseFormattedPrice = (formattedPrice: string): number => {
        return parseInt(formattedPrice.replace(/,/g, ''), 10) || 0
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const parsedValue = parseFormattedPrice(rawValue)
        onChange(parsedValue)
    }

    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="text"
                value={formatPriceWithCommas(value)}
                onChange={handleInputChange}
            />
        </Container>
    )
}
