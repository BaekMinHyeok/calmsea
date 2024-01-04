import { CategoryContent, CategoryLabel } from './Form.styes'

interface CategoryCheckboxProps {
    categoryId: number
    categoryName: string
    isSelected: boolean
    onClick: (categoryId: number) => void
}

export function CategoryCheckbox({
    categoryId,
    categoryName,
    isSelected,
    onClick,
}: CategoryCheckboxProps) {
    return (
        <CategoryContent>
            <CategoryLabel>{categoryName}</CategoryLabel>
            <input
                type="checkbox"
                value={categoryId}
                checked={isSelected}
                onChange={() => onClick(categoryId)}
            />
        </CategoryContent>
    )
}
