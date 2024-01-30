import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedModalState } from '../../../recoil/atoms/partialModal'

export const ModalProvider = () => {
    const [state] = useRecoilState(selectedModalState)
    return (
        <>
            {state.map(({ id, element }) => {
                return <Component key={id} component={element} />
            })}
        </>
    )
}

const Component = ({ component, ...rest }: { component: React.FC }) => {
    return component({ ...rest })
}
