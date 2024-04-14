import React, { useCallback, useEffect, useState } from 'react'
import * as S from './Header.styles'
import { FaGithub } from 'react-icons/fa'
import { IoShareSocial } from 'react-icons/io5'
import { MenuModal } from '@/components/Modal/MenuModal'
import { Link } from 'react-router-dom'
import { SearchInput } from '../Form/SearchInput'
import { auth } from '@/firebase'
import { logout } from '@/\bapi/user'
import Cookies from 'js-cookie'
import LogoIcon from '@/assets/LogoIcon'

// const env = process.env
// env.PUBLIC_URL = env.PUBLIC_URL || ''

export function Header() {
    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                auth.onAuthStateChanged((user) => {
                    setIsLoggedIn(!!user)
                })
            } catch (error) {
                console.error('로그인 상태 확인 오류:', error)
            }
        }
        checkLoginStatus()
    }, [])
    // 모달창
    const onClickToggleModal = useCallback(
        () => setOpenModal(!isOpenModal),
        [isOpenModal],
    )
    // 로그아웃
    const handleLogout = async () => {
        try {
            await logout()
            Cookies.remove('accessToeken')
            setIsLoggedIn(false)
            alert('로그아웃에 성공하였습니다.')
        } catch (error) {
            // 에러 메시지를 표시합니다.
            console.error(error)
            alert('로그아웃에 실패하였습니다.')
        }
    }
    return (
        <S.Container>
            <S.TopMenu>
                <Link to="/">
                    {/* <img src={'assets/logo.svg'} alt="logo" /> */}
                    <LogoIcon fill="#103680" />
                </Link>

                <div onClick={onClickToggleModal}>
                    <img src={'assets/menu.svg'} alt="menu" />
                </div>
                {isOpenModal && (
                    <MenuModal onClickToggleModal={onClickToggleModal}>
                        <S.ModalContent>
                            <S.ModalMenu>
                                {isLoggedIn ? (
                                    <li onClick={handleLogout}>
                                        <Link
                                            to="/"
                                            onClick={onClickToggleModal}
                                        >
                                            로그아웃
                                        </Link>
                                    </li>
                                ) : (
                                    <li>
                                        <Link
                                            to="/login"
                                            onClick={onClickToggleModal}
                                        >
                                            로그인
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link
                                        to="/showlist/1"
                                        onClick={onClickToggleModal}
                                    >
                                        콘서트
                                    </Link>
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
                                        가족
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
            <SearchInput />
        </S.Container>
    )
}
