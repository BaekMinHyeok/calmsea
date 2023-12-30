import React, { PropsWithChildren } from 'react'
import { Backdrop, ModalContainer, ModalWrap } from './MenuModal.styles'

interface MenuModalProps {
    onClickToggleModal: () => void
}
export function MenuModal({
    onClickToggleModal,
    children,
}: PropsWithChildren<MenuModalProps>) {
    return (
        <ModalContainer>
            <ModalWrap>{children}</ModalWrap>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    if (onClickToggleModal) {
                        onClickToggleModal()
                    }
                }}
            />
        </ModalContainer>
    )
}
