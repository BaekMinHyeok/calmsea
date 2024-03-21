import { CategoryContent, CategoryLabel } from '@/components/Form/Form.styes'

interface CategoryCheckboxProps {
    id: string
    categoryId: number
    categoryName: string
    isSelected: boolean
    onClick: (categoryId: number) => void
}

export function CategoryCheckbox({
    id,
    categoryId,
    categoryName,
    isSelected,
    onClick,
}: CategoryCheckboxProps) {
    return (
        <CategoryContent>
            <CategoryLabel htmlFor={id}>{categoryName}</CategoryLabel>
            <input
                id={id}
                type="checkbox"
                value={categoryId}
                checked={isSelected}
                onChange={() => onClick(categoryId)}
            />
        </CategoryContent>
    )
}
