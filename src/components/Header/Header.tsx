import { BottomMenu, Container, SearchInput, TopMenu } from './Header.styles'
import { FaSearch } from 'react-icons/fa'

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ''

export const Header = () => {
  return (
    <Container>
      <TopMenu>
        <img src={process.env.PUBLIC_URL + `assets/logo.svg`} alt="" />
        <img src={process.env.PUBLIC_URL + `assets/menu.svg`} alt="" />
      </TopMenu>
      <BottomMenu>
        <SearchInput />
        <FaSearch />
      </BottomMenu>
    </Container>
  )
}
