import { useRecoilValueLoadable } from 'recoil'
import * as S from '@/components/TotalList/TotalList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { useMemo, useState } from 'react'
import { sortFunction } from '@/util/ShowFilterList'
import { PostItem } from '@/components/PostItem/PostItem'

export function CategoryList({ category }: { category: number }) {
    const [sortOption, setSortOption] = useState('latest')
    const boardList = useRecoilValueLoadable(getAllPostSelectors)
    const { contents, state } = boardList
    // 게시물 상태
    const filteredAndSortedRows = useMemo(() => {
        if (state === 'hasValue' && contents) {
            return contents
                .filter((post) => post.category === category)
                .sort(sortFunction[sortOption])
        }
        return []
    }, [contents, category, sortOption, state])
    // 게시물 정렬
    const handleSortOptionChange = (
        option: 'latest' | 'oldest' | 'priceHigh' | 'priceLow',
    ) => {
        setSortOption(option)
    }
    const totalPosts = filteredAndSortedRows.length
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
            {/* Display loading/error messages as needed */}
            {state === 'loading' && <p>로딩 중...</p>}
            {!contents && <p>로드에 실패했습니다.</p>}

            {/* Display total posts and list */}
            <p>
                현재 예매 가능한 공연은 <b>총 {totalPosts}개</b> 입니다.
            </p>
            <S.PostWrap>
                {filteredAndSortedRows.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </S.PostWrap>
        </S.Container>
    )
}
