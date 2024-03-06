import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
`
export const StyledButton = styled.button`
    padding: 10px;
    border: none;
    cursor: pointer;
    background-color: ${(props: { $isActive: boolean }) =>
        props.$isActive ? '#ddd' : '#fff'};

    &:hover {
        background-color: #ddd;
    }
`
