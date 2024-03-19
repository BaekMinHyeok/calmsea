import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const LineStyle = styled.div`
    border: 1px solid #103680;
    margin: 50px 0 20px 0;
`
export const Container = styled.div`
    width: 100%;
    text-align: center;
`

export const PostWrap = styled.ul`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    & li {
        width: 40%;
    }
`

export const PostContent = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    & svg {
        width: 100%;
        height: 220px;
    }
    & img {
        width: 100%;
        height: 220px;
        border-radius: 15px;
    }
`

export const ImageWrap = styled.div`
    /* width: 40%; */
`
export const TextWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
export const EmptyImage = styled.div`
    & svg {
        width: 100%;
        border-radius: 15px;
        color: #000;
    }
`
