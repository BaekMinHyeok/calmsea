import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedModalState } from '../../../recoil/atoms/partialModal'

export const ModalProvider = () => {
    const [state] = useRecoilState(selectedModalState)
    const latestModal = state.length > 0 ? state[state.length - 1] : null

    return (
        <>
            {latestModal && (
                <Component
                    key={latestModal.id}
                    component={latestModal.element}
                />
            )}
        </>
    )
}

const Component = ({ component, ...rest }: { component: React.FC }) => {
    return component({ ...rest })
}
