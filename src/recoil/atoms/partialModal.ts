import { atom } from 'recoil'
interface ModalState {
    isOpen: boolean
    selectedIndex: number | null
}
export const partialModal = atom<ModalState>({
    key: 'modalState',
    default: {
        isOpen: false,
        selectedIndex: null,
    },
})
