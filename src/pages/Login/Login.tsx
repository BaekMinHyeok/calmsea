import { KakaoLogin } from '@/components/Auth/Kakao/KakaoLogin/KakaoLogin'

export function Login() {
    KakaoLogin()
    return (
        <>
            <h1>로그인</h1>
            <KakaoLogin />
        </>
    )
}
