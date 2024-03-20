import styled from 'styled-components'

export const Container = styled.div`
    padding: 0 20px;
`

export const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const TitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 2px solid #333;
    padding: 10px 0;
    box-sizing: border-box;
`

export const ImageWrap = styled.div`
    display: flex;
    gap: 20px;

    & img {
        width: 100%;
        border-radius: 15px;
    }
`

export const ImageBox = styled.div`
    width: 30%;
`
export const ImageTextWrap = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    & b {
        width: 25%;
        margin-right: 10px;
    }
`
export const PerFomer = styled.div`
    display: flex;
`
