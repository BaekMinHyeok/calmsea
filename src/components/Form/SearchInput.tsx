import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { BottomMenu, SearchInputStyle } from '../Header/Header.styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { searchState } from '@/recoil/atoms/searchState'
import { FaSearch } from 'react-icons/fa'
import { getAllShows } from '@/\bapi'
interface Suggestions {
    id: number
    title: string
}
export function SearchInput() {
    const [keyword, setKeyword] = useState('')
    const [searchStateAtom, setSearchState] = useRecoilState(searchState)
    const [suggestions, setSuggestions] = useState<Suggestions[]>([])
    const { search } = useLocation()
    const navigate = useNavigate()

    // 컴포넌트 마운트 시 URL에서 검색어 추출
    useEffect(() => {
        const keywordFromUrl = new URLSearchParams(search).get('keyword')
        if (keywordFromUrl) {
            setKeyword(keywordFromUrl)
        }
    }, [])
    // 검색어 변경 이벤트 처리
    const handleChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            const inputKeyword = e.target.value.trim() // 입력 값에서 양쪽 공백을 제거합니다.
            setKeyword(inputKeyword)
            // 1글자 이상 입력했을 때에만 검색을 수행합니다.
            if (inputKeyword.length >= 1) {
                // 모든 공연을 가져옵니다.
                const allShows = await getAllShows()
                // 입력 값에 기반하여 공연을 필터링합니다.
                const filteredResults = allShows
                    .filter((show) => show.title.includes(inputKeyword))
                    .map((show) => ({
                        id: Number(show.id),
                        title: show.title,
                    })) // PostState 객체를 Suggestions 객체로 변환합니다.
                // 추천 목록을 설정합니다.
                setSuggestions(filteredResults)
            } else {
                setSuggestions([]) // 입력이 없으면 추천 목록을 초기화합니다.
            }
        },
        [],
    )
    // 검색 실행 함수
    const handleSearch = useCallback(async () => {
        if (keyword.length >= 1) {
            try {
                const results = await getAllShows().then((shows) =>
                    shows.filter((show) => show.title.includes(keyword)),
                )
                setSearchState({ ...searchStateAtom, keyword, results })
                navigate(`/search?keyword=${keyword}`)
            } catch (error) {
                console.error('검색 에러', error)
            }
        } else {
            alert('검색어를 입력해주세요.')
        }
    }, [keyword, navigate, searchStateAtom, setSearchState])
    return (
        <BottomMenu>
            <SearchInputStyle>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    placeholder="검색어를 입력해주세요."
                />
            </SearchInputStyle>
            <ul>
                {suggestions.map((suggestion) => (
                    <li key={suggestion.id}>{suggestion.title}</li>
                ))}
            </ul>
            <button onClick={handleSearch}>
                <FaSearch />
            </button>
        </BottomMenu>
    )
}
