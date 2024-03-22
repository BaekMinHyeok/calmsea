import styled from 'styled-components'

export const LineStyle = styled.div`
    border: 1px solid #103680;
    margin: 50px 0 20px 0;
`
export const Container = styled.div`
    width: 100%;
    text-align: center;
    border-top: 2px solid #103680;
    margin-top: 40px;
    padding-top: 20px;
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
    padding: 20px 0 20px 0;

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
    transform: translate(50%, 100%);
    & > svg {
        color: #103680;
    }
`
export const EditModal = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 10%;
    top: 0;
    transform: translate(60%, 70%);
    border-radius: 5px;
    background-color: #103680;

    & button {
        border: none;
        background-color: inherit;
        padding: 5px 15px 5px 15px;
        color: #fff;
    }
    & button:hover {
        background-color: #fff;
        color: #000;
    }
`
export const TabBtnWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    align-items: center;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 12px;
    & button {
        border: none;
        background-color: inherit;
        padding: 0;
    }
    & svg {
        font-size: 18px;
    }
`

export const DropDownWrap = styled.ul`
    position: absolute;
    top: 0;
    right: 0%;
    transform: translate(0%, 20%);
    z-index: 9;
    & > li {
        cursor: pointer;
        padding: 5px 20px 5px 20px;
        background-color: #fff;
    }
    & li:hover {
        background-color: #103680;
        color: #fff;
    }
    & li:nth-child(1) {
        border-radius: 10px 10px 0 0;
    }
    & li:nth-child(4) {
        border-radius: 0 0 10px 10px;
    }
`

// export const DropDownContent = styled.li`
//     cursor: pointer;
// `
