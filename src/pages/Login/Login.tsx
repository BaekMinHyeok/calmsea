import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@/\bapi/user'
import { KakaoLogin } from '@/components/Auth/Kakao/KakaoLogin/KakaoLogin'
import { AdminBtn } from '@/components/Button/Button'
import { TextInput } from '@/components/Form/TextInput'
import Cookies from 'js-cookie'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const userCredential = await login(email, password)
            const accessToken = await userCredential.user.getIdToken(true)
            Cookies.set('accessToeken', accessToken)
            navigate('/')
            alert('로그인 성공')
        } catch (error) {
            console.error('로그인 실패:', error)
            alert('이메일 또는 비밀번호가 잘못되었습니다.')
        }
    }
    return (
        <>
            <TextInput
                id="email-input"
                type="text"
                label="이메일"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
                id="password-input"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <AdminBtn text="로그인" onClick={handleLogin} />
            <AdminBtn text="회원가입" onClick={() => navigate('/register')} />
            <KakaoLogin />
        </>
    )
}
