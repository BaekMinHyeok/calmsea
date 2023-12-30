import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    & label {
        font-weight: bold;
    }
    & input {
        height: 35px;
        border: none;
        border-radius: 5px;
        background: #f3f3f3;
        box-shadow:
            5px 5px 20px 1px rgba(221, 221, 221, 0.25),
            5px 5px 28px 0px rgba(255, 255, 255, 0.25) inset;
        color: #b9b9b9;
        padding: 0 20px;
        margin-top: 10px;
    }
    & input[type='date'] {
        color: #000;
    }
`

export const AdressStyle = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-end;
    justify-content: space-between;

    & input {
        width: 60%;
    }
`

export const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.2);
`
