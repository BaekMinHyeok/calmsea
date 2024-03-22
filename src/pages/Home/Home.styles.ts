import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
`
export const RankingContent = styled.div`
    text-align: center;
    margin-top: 20px;
`
export const RankingWrap = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    & svg,
    img {
        width: 100%;
        height: 200px;
        background-color: #fff;
        border-radius: 15px;
    }
`
export const RankingBox = styled.li`
    width: 40%;
    position: relative;
    & > p {
        width: 55px;
        height: 55px;
        background: #103680;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(0, -1%);
        display: flex;
        align-items: center;
        justify-content: center;

        clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    }
    & span {
        width: 49px;
        height: 49px;
        display: flex;
        align-items: center;
        justify-content: center;

        color: #fff;
        font-size: 20px;
        font-weight: bold;
        margin: 3px;
        clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    }
`
export const SoldOutContent = styled.div`
    text-align: center;
    margin-top: 20px;
    & svg,
    img {
        width: 100%;
        height: 200px;
        background-color: #fff;
    }
`
