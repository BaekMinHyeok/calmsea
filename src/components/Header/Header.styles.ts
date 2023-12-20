import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 20px;
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

export const BottomMenu = styled.div`
  text-align: center;
  position: relative;

  & > svg {
    position: absolute;
    font-size: 20px;
    transform: translate(0, 0);
    top: 50%;
    left: 80%;
    color: #a7b3c9;
  }
`

export const SearchInput = styled.input`
  width: 300px;
  height: 30px;
  font-size: 18px;
  border-radius: 30px;
  border: none;
  margin-top: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`
