import { useEffect, useState } from 'react'
import { auth } from '@/firebase'
import { OAuthProvider, signInWithCredential } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export function Kakao() {
    const params = new URL(document.location.toString()).searchParams
    const code = params.get('code')
    const [idToken, setIdToken] = useState<string | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const navigate = useNavigate()
    const provider = new OAuthProvider('oidc.kakao')

    // 토큰 생성
    useEffect(() => {
        const getKakaoToken = async (code: string) => {
            try {
                // Kakao OAuth 서버에 인가 코드로 토큰 요청
                const response = await fetch(
                    'https://kauth.kakao.com/oauth/token',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_RESTAPI_KEY}&redirect_uri=${window.location.origin}/auth/kakao/callback&code=${code}`,
                    },
                )
                const data = await response.json()
                console.log('response', response)
                console.log('data', data)

                // 받은 데이터에서 access_token이 있는지 확인하여 상태 변수에 설정
                if (data.access_token) {
                    setAccessToken(data.access_token)
                    // window.Kakao.Auth.setAccessToken(data.access_token)
                    const credential = provider.credential({
                        accessToken: data.access_token,
                    })
                    await signInWithCredential(auth, credential)
                    setIdToken(data.id_token)
                    // access_token을 쿠키에 저장 (2시간 만료)
                    Cookies.set('accessToken', data.access_token, {
                        expires: 0.08333,
                    })
                    navigate('/')
                } else {
                    navigate('/login')
                }
            } catch (error) {
                console.error('카카오 인증 중 오류 발생:', error)
            }
        }
        console.log('code', code)
        if (code) {
            getKakaoToken(code)
        }
    }, [code, navigate, provider, auth])

    useEffect(() => {
        if (idToken && accessToken) {
            const credential = provider.credential({ idToken })
            signInWithCredential(auth, credential)
                .then((result) => {
                    console.log(
                        'Kakao를 사용하여 Firebase에 성공적으로 로그인했습니다:',
                        result,
                    )
                    // Firebase에서 반환된 결과를 확인하여 필요한 작업 수행
                    const credentialFromResult =
                        OAuthProvider.credentialFromResult(result)
                    if (credentialFromResult) {
                        const acToken = credentialFromResult.accessToken
                        const idToken = credentialFromResult.idToken
                        const user = {
                            uid: result.user.uid,
                        }
                    }
                })
                .catch((error) => {
                    console.log(
                        'Kakao를 사용하여 Firebase에 로그인하는 동안 오류가 발생했습니다:',
                        error,
                    )
                })
        }
    }, [idToken, auth])

    return <>카카오</>
}
