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
        color: #000;
        padding: 0 10px;
        margin-top: 10px;
    }
    & input[type='date'] {
        color: #000;
    }
`
// 주소
export const AdressStyle = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-end;
    justify-content: space-between;

    & input {
        width: 60%;
        color: #000;
    }
`
// 주소 모달 배경
export const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.2);
`

// 카테고리 체크박스
export const CategoryContent = styled.div`
    display: flex;
    align-items: flex-end;
`
export const CategoryLabel = styled.label`
    font-size: 14px;
    font-weight: bold;
`
// 관람시간

export const TimeInputWrap = styled.div`
    background-color: #f3f3f3;
    box-shadow:
        5px 5px 20px 1px rgba(221, 221, 221, 0.25),
        5px 5px 28px 0px rgba(255, 255, 255, 0.25) inset;
    border-radius: 5px;
    & input {
        height: 25px;
        border: none;
        color: #000;
        padding: 0 10px;
    }
`
export const TimeLabel = styled.label`
    display: inline-block;
    width: 100%;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
`
export const TimeInputStyle = styled.input`
    border: none;
    background-color: inherit;
`
