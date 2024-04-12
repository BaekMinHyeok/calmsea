import { auth } from '@/firebase'
import {
    createUserWithEmailAndPassword,
    UserCredential,
    signOut,
    signInWithEmailAndPassword,
    updatePassword,
} from 'firebase/auth'
// 회원가입
export const signUp = async (
    email: string,
    password: string,
): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password)
}
// 로그인
export const login = async (
    email: string,
    password: string,
): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password)
}
// 로그아웃
export const logout = async (): Promise<void> => {
    return signOut(auth)
}

// 비밀번호 변경
export const changePassword = async (newPassword: string): Promise<void> => {
    const user = auth.currentUser
    if (user) {
        await updatePassword(user, newPassword)
    } else {
        throw new Error('사용자가 로그인되어 있지 않습니다.')
    }
}
// 회원탈퇴
export const deleteUser = async (): Promise<void> => {
    const user = auth.currentUser
    if (user) {
        try {
            await deleteUser()
            console.log('사용자 삭제 성공')
        } catch (error) {
            throw new Error('사용자 삭제 실패:' + error)
        }
    } else {
        throw new Error('로그인된 사용자가 없습니다.')
    }
}
