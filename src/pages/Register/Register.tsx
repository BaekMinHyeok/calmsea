import React, { useState } from 'react'
import { AuthError } from 'firebase/auth'
import { AdminBtn } from '@/components/Button/Button'
import { TextInput } from '@/components/Form/TextInput'
import { useNavigate } from 'react-router-dom'
import { signUp } from '@/\bapi/user'

export function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    console.log(email)

    const onClickRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // 이메일 확인
        if (!validateEmail(email)) {
            alert('유효한 이메일을 입력해주세요.')
            return
        }

        // 비밀번호 확인
        if (!validatePassword(password)) {
            alert(
                '비밀번호는 최소 8자 이상이어야 하며, 문자, 숫자, 특수문자를 포함해야 합니다.',
            )
            return
        }

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }

        try {
            const userCredential = await signUp(email, password)

            console.log('회원가입 성공:', userCredential.user)
            alert('회원가입이 완료되었습니다.')
            navigate('/login')
        } catch (error: unknown) {
            const authError = error as AuthError
            if (authError.code === 'auth/email-already-in-use') {
                alert('이미 가입된 계정입니다.')
            } else {
                console.error('회원가입 실패:', authError)
            }
        }
    }
    // 이메일 조건 함수
    const validateEmail = (email: string) => {
        // Regular expression for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    // 비밀번호 조건 함수
    const validatePassword = (password: string) => {
        // Regular expression for password validation
        const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        return regex.test(password)
    }
    return (
        <>
            <form>
                <h1>회원가입</h1>
                <div>
                    <TextInput
                        id="email-input"
                        type="text"
                        label="이메일"
                        placeholder="이메일을 입력해주세요."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <TextInput
                        id="password-input"
                        type="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <TextInput
                        id="password-confirm-input"
                        type="password"
                        label="비밀번호 확인"
                        placeholder="비밀번호를 입력해주세요."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <AdminBtn text="회원가입 하기" onClick={onClickRegister} />
                <AdminBtn
                    text="로그인 하러 가기"
                    onClick={() => navigate('/login')}
                ></AdminBtn>
            </form>
        </>
    )
}
