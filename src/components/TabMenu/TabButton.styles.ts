import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
`
export const StyledButton = styled.button`
    padding: 10px 20px 10px 20px;
    border: none;
    cursor: pointer;
    background-color: ${(props: { $isActive: boolean }) =>
        props.$isActive ? '#103680' : '#fff'};
    color: ${(props: { $isActive: boolean }) =>
        props.$isActive ? '#fff' : '#000'};

    &:hover {
        background-color: #103680;
        color: #fff;
    }
    &:nth-child(1) {
        border-radius: 5px 0 0 5px;
    }
    &:nth-child(3) {
        border-radius: 0 5px 5px 0;
    }
`
