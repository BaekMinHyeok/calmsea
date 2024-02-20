import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    text-align: center;
`

export const PostWrap = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const PostContent = styled.li`
    width: 100%;
    position: relative;
    border-bottom: 1px solid #000;
    padding: 20px;

    & svg {
        width: 100%;
    }
    & img {
        width: 100%;
        height: 220px;
        border-radius: 15px;
    }
`
export const ContentWrap = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 10px;
`

export const ImageWrap = styled.div`
    width: 40%;
`
export const TextWrap = styled.div`
    width: 60%;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const EmptyImage = styled.div`
    & svg {
        width: 100%;
        border-radius: 15px;
        color: #000;
    }
`

export const EditIcon = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-40%, 240%);
`
export const EditModal = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 10%;
    top: 0;
    transform: translate(30%, 90%);
    border-radius: 5px;
    background-color: #a7b3c9;
    border: 1px solid #a7b3c9;

    & button {
        border: none;
        background-color: inherit;
        padding: 5px 15px 5px 15px;
    }
    & button:hover {
        background-color: #fff;
    }
`
