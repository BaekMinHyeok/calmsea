import React, { useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { selectedModalState } from '../recoil/atoms/partialModal'
import { collection, doc } from 'firebase/firestore/lite'
import { db } from '../firebase'

// const isArrEmpty = (arr: unknown[]) => arr.length === 0
export function useModal(component: React.FC) {
    // 모달 element상태
    const [modalElements, setModal] = useRecoilState(selectedModalState)
    // 컴포넌트가 열려있는지 여부
    const [isOpen, setIsOpen] = useState(false)
    // 컴포넌트 id부여
    const id = doc(collection(db, 'show')).id

    const modalComponent = useMemo(() => component, [])

    const openModal = useCallback(() => {
        setIsOpen(true)
        // 중복된 모달이 있는지 확인하고 중복되지 않은 경우에만 추가
        if (!modalElements.some((c) => c.id === id)) {
            setModal((prev) => [...prev, { id, element: modalComponent }])
        }
        // // modal이 열리면 스크롤 방지
        // document.body.style.overflow = 'hidden' // 스타일 검토 필요
    }, [])

    const closeModal = useCallback(() => {
        setIsOpen(false)
        // 해당 ID에 해당하는 모달만 제거
        setModal((prev) => prev.filter((c) => c.id !== id))
        // if (isArrEmpty(modalElements)) {
        //     document.body.style.overflow = 'unset'
        // }
    }, [])
    return { isOpen, openModal, closeModal }
}
