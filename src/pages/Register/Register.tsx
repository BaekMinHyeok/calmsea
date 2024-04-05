import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { AdminBtn } from '@/components/Button/Button'
import { TextInput } from '@/components/Form/TextInput'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'

export function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const onClickRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            )

            console.log('회원가입 성공:', userCredential.user)
        } catch (error) {
            console.error('회원가입 실패:', error)
        }
    }

    return (
        <>
            <form>
                <h1>회원가입</h1>
                <div>
                    이메일 :
                    <TextInput
                        id="email-input"
                        type="text"
                        label="이메일"
                        placeholder="이메일을 입력해주세요."
                        value={email}
                        onChange={(e) => setEmail(email)}
                    />
                </div>
                <div>
                    비밀번호 :
                    <TextInput
                        id="password-input"
                        type="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요."
                        value={email}
                        onChange={(e) => setPassword(password)}
                    />
                </div>

                <div>
                    비밀번호 확인 :
                    <TextInput
                        id="password-confirm-input"
                        type="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(password)}
                    />
                </div>

                <AdminBtn text="회원가입 하기" onClick={onClickRegister} />
                <button type="submit" onClick={() => navigate('/')}>
                    로그인 하러 가기
                </button>
            </form>
        </>
    )
}
