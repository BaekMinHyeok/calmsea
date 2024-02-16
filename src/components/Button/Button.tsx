import React from 'react'
import { AdminButton } from '@/components/Button/Button.styles'

interface AdminBtnProps {
    text: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export function AdminBtn({ text, onClick }: AdminBtnProps) {
    return <AdminButton onClick={onClick}>{text}</AdminButton>
}
