import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    text-align: center;
    & > h2 {
        margin-bottom: 10px;
    }
`
export const TabContainer = styled.div`
    padding: 0 20px;
`
export const PostWrap = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const PostContent = styled.li`
    width: 45%;
    border-radius: 5px;
    position: relative;

    & img,
    svg {
        width: 100%;
        border-radius: 15px;
    }
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
    bottom: 0;
    transform: translate(20%, -110%);
`
export const EditModal = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 10%;
    bottom: 0;
    transform: translate(10%, 5%);
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
