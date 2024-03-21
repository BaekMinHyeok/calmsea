import { ChangeEvent } from 'react'
import { Container } from '@/components/Form/Form.styes'

interface QuantityInputProps {
    id: string
    label: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
}

export function QuantityInput({
    id,
    label,
    value,
    onChange,
    min = 0,
    max = Infinity,
}: QuantityInputProps) {
    const formatQuantityWithCommas = (quantity: number): string => {
        if (isNaN(quantity)) {
            return ''
        }

        return quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const parseFormattedQuantity = (formattedQuantity: string): number => {
        const parsedQuantity =
            parseInt(formattedQuantity.replace(/,/g, ''), 10) || 0
        return Math.max(min, Math.min(parsedQuantity, max))
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const parsedValue = parseFormattedQuantity(rawValue)
        onChange(parsedValue)
    }

    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="text"
                value={formatQuantityWithCommas(value)}
                onChange={handleInputChange}
            />
        </Container>
    )
}
