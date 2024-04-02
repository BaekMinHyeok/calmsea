import React from 'react'
import { StyledButton } from './TabButton.styles'
export interface TabButtonProps {
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
}
export function TabButton({ isActive, onClick, children }: TabButtonProps) {
    return (
        <StyledButton isActive={isActive} onClick={onClick}>
            {children}
        </StyledButton>
    )
}
