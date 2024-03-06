import React from 'react'
import { StyledButton } from './TabButton.styles'

export function TabButton({
    $isActive,
    onClick,
    children,
}: {
    $isActive: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <StyledButton $isActive={$isActive} onClick={onClick}>
            {children}
        </StyledButton>
    )
}
