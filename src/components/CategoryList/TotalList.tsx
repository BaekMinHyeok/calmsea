import { useMemo, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import * as S from '@/components/CategoryList/TotalList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { sortFunction } from '@/util/ShowFilterList'
import { PostItem } from '@/components/PostItem/PostItem'

export function TotalList() {
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
    const handleSortOptionChange = (
        option: 'latest' | 'oldest' | 'priceHigh' | 'priceLow',
    ) => setSortOption(option)
    const totalPosts = sortedRows.length
    return (
        <S.Container>
            <div>
                <button onClick={() => handleSortOptionChange('latest')}>
                    최신순
                </button>
                <button onClick={() => handleSortOptionChange('oldest')}>
                    오래된순
                </button>
                <button onClick={() => handleSortOptionChange('priceHigh')}>
                    높은가격순
                </button>
                <button onClick={() => handleSortOptionChange('priceLow')}>
                    낮은가격순
                </button>
                <S.LineStyle />
            </div>
            <p>
                현재 예매 가능한 공연은 <b>총{totalPosts}개</b> 입니다.
            </p>
            <S.PostWrap>
                {sortedRows.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </S.PostWrap>
        </S.Container>
    )
}
