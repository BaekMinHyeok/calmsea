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
    width: 45%;
    border-radius: 5px;

    & img,
    svg {
        width: 100%;
        border-radius: 15px;
    }
`
