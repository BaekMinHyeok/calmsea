import React, { ReactNode } from 'react'
import { AdminButton } from '@/components/Button/Button.styles'

interface AdminBtnProps {
    text: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
interface ButtonProps {
    children: ReactNode
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export function AdminBtn({ text, onClick }: AdminBtnProps) {
    return <AdminButton onClick={onClick}>{text}</AdminButton>
}
export function Button({ children, onClick }: ButtonProps) {
    return <button onClick={onClick}>{children}</button>
}
