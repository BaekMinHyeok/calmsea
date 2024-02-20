import { FaHeart } from 'react-icons/fa6'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;

    & button {
        border: none;
        padding: 0;
        padding-right: 5px;
    }
`

export const RedHeartIcon = styled(FaHeart)`
    color: red;
`
