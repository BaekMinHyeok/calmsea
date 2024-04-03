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
                const response = await fetch(
                    'https://kauth.kakao.com/oauth/token',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_RESTAPI_KEY}&redirect_uri=${window.location.origin}/login/kakao&code=${code}`,
                    },
                )
                const data = await response.json()
                console.log('response', response)
                console.log('data', data)
                // OIDC 사용하는 경우 id_token으로 접근
                console.log('id_token', data.id_token)
                if (data.id_token) {
                    setIdToken(data.id_token)
                } else {
                    navigate('/')
                }

                if (data.access_token) {
                    setAccessToken(data.access_token)
                    window.Kakao.Auth.setAccessToken(data.access_token)
                    localStorage.setItem('accessToken', data.access_token)
                }

                if (data.refresh_token) {
                    Cookies.set('refreshToken', data.refresh_token, {
                        expires: 60 - 2,
                    }) // 유효기간 2개월
                }

                const nickname = data.profile.nickname
                console.log(nickname)
                return nickname
            } catch (error) {
                console.error('Kakao 토큰 가져오기 오류', error)
            }
        }
        console.log('code', code)
        if (code) {
            getKakaoToken(code)
        }
    }, [code, navigate])

    useEffect(() => {
        if (idToken && accessToken) {
            const credential = provider.credential({ idToken })
            signInWithCredential(auth, credential)
                .then((result) => {
                    console.log(
                        'Kakao를 사용하여 Firebase에 성공적으로 로그인했습니다:',
                        result,
                    )
                    const credentialFromResult =
                        OAuthProvider.credentialFromResult(result)
                    if (credentialFromResult) {
                        const acToken = credentialFromResult.accessToken
                        const idToken = credentialFromResult.idToken
                        const user = {
                            uid: result.user.uid,
                            displayName: nickname,
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
