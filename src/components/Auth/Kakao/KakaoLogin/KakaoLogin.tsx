import { useEffect, useState } from 'react'

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        Kakao: any
    }
}

export function KakaoLogin() {
    const [isInitialized, setIsInitialized] = useState(false)
    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY)
            setIsInitialized(true)
        }
    }, [])

    const handleKakaoSign = () => {
        if (!isInitialized) {
            console.error('Kakao SDK가 아직 초기화되지 않았습니다')
            return
        }
        const redirectUri = `${window.location.origin}/auth/kakao/callback`
        console.log(redirectUri)
        const scope = ['profile_nickname', 'openid'].join(',')
        window.Kakao.Auth.authorize({
            redirectUri,
            scope,
        })
    }

    return (
        <>
            <button onClick={handleKakaoSign}>카카오 로그인</button>
        </>
    )
}
