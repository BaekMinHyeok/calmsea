import { useRecoilValueLoadable } from 'recoil'
import * as S from '@/pages/ShowList/ShowList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { useMemo, useState } from 'react'
import { Title } from '../../components/Text/Text'
import { sortFunction } from '@/util/ShowFilterList'
import { PostItem } from '@/components/PostItem/PostItem'

export function ShowList() {
    const [sortOption, setSortOption] = useState('latest')
    const boardList = useRecoilValueLoadable(getAllPostSelectors)
    // 게시물 상태
    const sortedRows = useMemo(() => {
        const sortedData =
            boardList?.state === 'hasValue' ? boardList?.contents : []
        const sortFunctionToUse = sortFunction[sortOption]
        return sortedData ? [...sortedData].sort(sortFunctionToUse) : []
    }, [boardList, sortOption])
    // 게시물 정렬
    const handleSortOptionChange = (option: 'latest' | 'oldest') =>
        setSortOption(option)
    return (
        <S.Container>
            <Title text={'전체보기'} size="h2" />
            <div>
                <button onClick={() => handleSortOptionChange('latest')}>
                    최신순
                </button>
                <button onClick={() => handleSortOptionChange('oldest')}>
                    오래된순
                </button>
                {/* 다른 정렬 옵션을 추가할 수 있음 */}
            </div>
            <S.PostWrap>
                {sortedRows.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </S.PostWrap>
        </S.Container>
    )
}
