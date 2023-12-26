import React, { useCallback, useState } from 'react'
import {
    BottomMenu,
    Container,
    ModalContent,
    ModalMenu,
    SearchInput,
    SiteLink,
    SubMenu,
    TopMenu,
} from './Header.styles'
import { FaGithub, FaSearch } from 'react-icons/fa'
import { IoShareSocial } from 'react-icons/io5'
import { MenuModal } from '../Modal/MenuModal'
import { Link } from 'react-router-dom'

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ''

export const Header = () => {
    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const onClickToggleModal = useCallback(
        () => setOpenModal(!isOpenModal),
        [isOpenModal],
    )

    return (
        <Container>
            <TopMenu>
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + `assets/logo.svg`}
                        alt=""
                    />
                </Link>
                <div onClick={onClickToggleModal}>
                    <img
                        src={process.env.PUBLIC_URL + `assets/menu.svg`}
                        alt=""
                    />
                </div>
                {isOpenModal && (
                    <MenuModal onClickToggleModal={onClickToggleModal}>
                        <ModalContent>
                            <ModalMenu>
                                <li>
                                    <Link
                                        to="/concert"
                                        onClick={onClickToggleModal}
                                    >
                                        콘서트
                                    </Link>
                                    {/* 링크 이동시 모달창 닫기 추가 */}
                                </li>
                                <li>
                                    <Link
                                        to="/concert"
                                        onClick={onClickToggleModal}
                                    >
                                        연극
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/concert"
                                        onClick={onClickToggleModal}
                                    >
                                        아동
                                    </Link>
                                </li>
                                <li>
                                    <SubMenu>
                                        <Link
                                            to="/concert"
                                            onClick={onClickToggleModal}
                                        >
                                            Ranking
                                        </Link>
                                        <Link
                                            to="/concert"
                                            onClick={onClickToggleModal}
                                        >
                                            SALE
                                        </Link>
                                    </SubMenu>
                                </li>
                                <li>
                                    <SiteLink>
                                        <Link
                                            to="/concert"
                                            onClick={onClickToggleModal}
                                        >
                                            <FaGithub />
                                        </Link>
                                        <Link
                                            to="/concert"
                                            onClick={onClickToggleModal}
                                        >
                                            <IoShareSocial />
                                        </Link>
                                    </SiteLink>
                                </li>
                            </ModalMenu>
                        </ModalContent>
                    </MenuModal>
                )}
            </TopMenu>
            <BottomMenu>
                <SearchInput />
                <FaSearch />
            </BottomMenu>
        </Container>
    )
}
