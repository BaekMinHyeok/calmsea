import React from 'react'
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
interface ModalState {
    isOpen: boolean
    selectedIndex: string | null
}

interface Post {
    id: string
    content: string
}

const { persistAtom } = recoilPersist()
export const partialModal = atom<ModalState>({
    key: 'modalState',
    default: {
        isOpen: false,
        selectedIndex: null,
    },
    effects_UNSTABLE: [persistAtom],
})

export const selectedPostState = atom<Post | null>({
    key: 'selectedPostState',
    default: null,
})

export const selectedModalState = atom<{ id: string; element: React.FC }[]>({
    key: 'selectedModalState',
    default: [],
})
