import React, { useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { selectedModalState } from '../recoil/atoms/partialModal'
import { collection, doc } from 'firebase/firestore/lite'
import { db } from '../firebase'

export function useModal(component: React.FC) {
    // modalStack
    const [modalStack, setModalStack] = useRecoilState(selectedModalState)
    // 컴포넌트가 열려있는지 여부
    const [isOpen, setIsOpen] = useState(false)
    // 컴포넌트 id부여
    const id = doc(collection(db, 'show')).id

    const modalComponent = useMemo(() => component, [])

    const openModal = useCallback(() => {
        setIsOpen(true)
        // 중복된 모달이 있는지 확인하고 중복되지 않은 경우에만 추가
        if (!modalStack.some((c) => c.id === id)) {
            setModalStack((prev) => [...prev, { id, element: modalComponent }])
        }
    }, [id, modalComponent, modalStack, setModalStack])

    const closeModal = useCallback(() => {
        setIsOpen(false)

        // 해당 ID에 해당하는 모달만 제거
        setModalStack((prev) => {
            const newModalStack = [...prev]
            newModalStack.pop()
            return newModalStack
        })
    }, [id, setModalStack])
    return { isOpen, openModal, closeModal }
}
