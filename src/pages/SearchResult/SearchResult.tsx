import { MutableRefObject, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { getAllShows } from '@/\bapi/show'
import { PostState } from '@/recoil/atoms/postState'
import { searchState } from '@/recoil/atoms/searchState'
import { MdImageNotSupported } from 'react-icons/md'
import * as S from './SearchResult.style'

export function SearchResult() {
    const [searchResults, setSearchResults] = useRecoilState(searchState)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const keyword = queryParams.get('keyword')
    const navigate = useNavigate()
    const prevKeyword: MutableRefObject<string | null> = useRef(null)

    // 검색결과 리스트
    useEffect(() => {
        if (keyword !== prevKeyword.current) {
            const fetchData = async () => {
                try {
                    if (keyword) {
                        const shows = await getAllShows()
                        const results = shows.filter((show) =>
                            show.title
                                .toLowerCase()
                                .includes(keyword.toLowerCase()),
                        )
                        setSearchResults((prev) => ({
                            ...prev,
                            results,
                        }))

                        if (results.length === 0) {
                            alert('없는 검색어입니다.')
                            navigate(-1)
                        }
                    }
                } catch (error) {
                    console.error('검색결과 에러', error)
                }
            }
            fetchData()

            prevKeyword.current = keyword
        }
    }, [keyword, navigate])
    return (
        <S.Container>
            <h2>{`검색어 : "${keyword}"`}</h2>
            <S.PostWrap>
                {Array.isArray(searchResults.results) ? (
                    searchResults.results.map((result: PostState) => (
                        <li key={result.id}>
                            <S.PostContent
                                to={`/showlist/${result.category}/${result.id}`}
                            >
                                <S.ImageWrap>
                                    {result.imageUrl !== null ? (
                                        <img
                                            src={result.imageUrl}
                                            alt={result.title}
                                        />
                                    ) : (
                                        <S.EmptyImage>
                                            <MdImageNotSupported />
                                        </S.EmptyImage>
                                    )}
                                </S.ImageWrap>
                                <S.TextWrap>
                                    <h2>{result.title}</h2>
                                    <p>{result.address.areaAddress}</p>
                                </S.TextWrap>
                            </S.PostContent>
                        </li>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </S.PostWrap>
        </S.Container>
    )
}
