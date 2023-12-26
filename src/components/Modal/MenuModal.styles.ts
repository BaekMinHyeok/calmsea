import styled from 'styled-components'

export const ModalContainer = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
`

export const ModalWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    left: 150px;
    transform: translate(50%, 0);
    z-index: 99;
    width: 100%;
    height: 100vh;
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
