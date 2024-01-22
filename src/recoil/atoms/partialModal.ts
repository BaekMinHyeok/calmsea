import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
interface ModalState {
    isOpen: boolean
    selectedIndex: number | null
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
