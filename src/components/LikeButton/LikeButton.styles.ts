import { FaHeart } from 'react-icons/fa6'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    & button {
        border: none;
    }
`

export const RedHeartIcon = styled(FaHeart)`
    color: red;
`
