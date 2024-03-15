import React, { useCallback, useState } from 'react'
import * as S from './Header.styles'
import { FaGithub, FaSearch } from 'react-icons/fa'
import { IoShareSocial } from 'react-icons/io5'
import { MenuModal } from '@/components/Modal/MenuModal'
import { Link } from 'react-router-dom'

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ''

export function Header() {
    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const onClickToggleModal = useCallback(
        () => setOpenModal(!isOpenModal),
        [isOpenModal],
    )

    return (
        <S.Container>
            <S.TopMenu>
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + `assets/logo.svg`}
                        alt="logo"
                    />
                </Link>
                <div onClick={onClickToggleModal}>
                    <img
                        src={process.env.PUBLIC_URL + `assets/menu.svg`}
                        alt="menu"
                    />
                </div>
                {isOpenModal && (
                    <MenuModal onClickToggleModal={onClickToggleModal}>
                        <S.ModalContent>
                            <S.ModalMenu>
                                <li>
                                    <Link
                                        to="/showlist/1"
                                        onClick={onClickToggleModal}
                                    >
                                        콘서트
                                    </Link>
                                    {/* 링크 이동시 모달창 닫기 추가 */}
                                </li>
                                <li>
                                    <Link
                                        to="/showlist/2"
                                        onClick={onClickToggleModal}
                                    >
                                        뮤지컬
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/showlist/3"
                                        onClick={onClickToggleModal}
                                    >
                                        연극
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/showlist/4"
                                        onClick={onClickToggleModal}
                                    >
                                        아동
                                    </Link>
                                </li>
                                <li>
                                    <S.SubMenu>
                                        <Link
                                            to="/concert"
                                            onClick={onClickToggleModal}
                                        >
                                            Ranking
                                        </Link>
                                        <div>|</div>
                                        <Link
                                            to="/concert"
                                            onClick={onClickToggleModal}
                                        >
                                            SALE
                                        </Link>
                                    </S.SubMenu>
                                </li>
                                <li>
                                    <S.SiteLink>
                                        <a
                                            href="https://github.com/BaekMinHyeok/calmsea"
                                            target="_blank"
                                            onClick={onClickToggleModal}
                                            rel="calmsea noreferrer"
                                        >
                                            <FaGithub />
                                        </a>
                                        <Link
                                            to="/concert"
                                            onClick={onClickToggleModal}
                                        >
                                            <IoShareSocial />
                                        </Link>
                                    </S.SiteLink>
                                </li>
                                <li>
                                    <Link to="/shownew">게시글 작성</Link>
                                </li>
                            </S.ModalMenu>
                        </S.ModalContent>
                    </MenuModal>
                )}
            </S.TopMenu>
            <S.BottomMenu>
                <S.SearchInput />
                <FaSearch />
            </S.BottomMenu>
        </S.Container>
    )
}
