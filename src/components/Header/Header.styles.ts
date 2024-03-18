import styled from 'styled-components'

export const Container = styled.div`
    padding: 20px 20px 0 20px;
    margin-bottom: 30px;
    & img {
        width: 40px;
    }
`

export const TopMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
`

export const ModalContent = styled.div`
    background: rgba(167, 179, 201, 0.8);
    width: 220px;
    height: 100vh;
`

export const ModalMenu = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: #fff;
    text-align: right;
    padding: 20px 20px 0 0;
`

export const SubMenu = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 20px;
`

export const SiteLink = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    font-size: 30px;
`

export const BottomMenu = styled.div`
    text-align: center;
    position: relative;
    & button {
        position: absolute;
        transform: translate(0, 0);
        top: 50%;
        left: 80%;
        background: inherit;
        border: none;
        cursor: pointer;
    }
    & svg {
        font-size: 20px;
        color: #a7b3c9;
    }
`

export const SearchInputStyle = styled.div`
    border: none;
    & > input {
        width: 300px;
        height: 30px;
        border-radius: 30px;
        border: none;
        margin-top: 20px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        padding: 20px;
        box-sizing: border-box;
        font-size: 14px;
    }
`
