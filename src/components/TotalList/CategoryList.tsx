import { useRecoilValueLoadable } from 'recoil'
import * as S from '@/components/TotalList/TotalList.styles'
import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
import { useMemo, useState } from 'react'
import { sortFunction } from '@/util/ShowFilterList'
import { PostItem } from '@/components/PostItem/PostItem'
import { PostState } from '@/recoil/atoms/postState'

export function CategoryList({
    category,
    filterFn,
}: {
    category?: number
    filterFn?: (a: PostState, b: PostState) => number
}) {
    const [sortOption, setSortOption] = useState('latest')
    const boardList = useRecoilValueLoadable(getAllPostSelectors)
    const { contents, state } = boardList

    // 게시물의 카테고리와 필터, 정렬을 적용한 데이터
    const filteredAndSortedRows = useMemo(() => {
        if (state === 'hasValue' && contents) {
            const filteredRows = contents.filter(
                (post) => post.category === category,
            )
            return filterFn
                ? filteredRows.sort(filterFn)
                : filteredRows.sort(sortFunction[sortOption])
        }
        return []
    }, [contents, category, sortOption, state])
    // 조건부로 정렬 탭 표시
    const showSortButtons = !filterFn

    // 게시물 정렬
    const handleSortOptionChange = (
        option: 'latest' | 'oldest' | 'priceHigh' | 'priceLow',
    ) => {
        if (showSortButtons) {
            setSortOption(option)
        }
    }
    const totalPosts = filteredAndSortedRows.length
    return (
        <S.Container>
            {showSortButtons && (
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
                </div>
            )}
            <S.LineStyle />

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
