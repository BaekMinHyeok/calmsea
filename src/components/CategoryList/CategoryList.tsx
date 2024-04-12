import { useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { PostState } from '@/recoil/atoms/postState'
import { dropDown } from '@/recoil/atoms/dropDown'
import { sortFunction } from '@/util/ShowFilterList'
import { Button } from '../Button/Button'
import { PostItem } from '@/components/PostItem/PostItem'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import * as S from '@/components/CategoryList/TotalList.styles'
import { useAllShow } from '@/hooks/useShows'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function CategoryList({
    category,
    filterFn,
}: {
    category?: number
    filterFn?: (a: PostState, b: PostState) => number
}) {
    const [sortOption, setSortOption] = useState('latest')
    const { data, isLoading, error, hasNextPage, fetchNextPage } = useAllShow()
    const [dropDownOpen, setDropDownOpen] = useRecoilState(dropDown)

    // 게시물의 카테고리와 필터, 정렬을 적용한 데이터
    const filteredAndSortedRows = useMemo(() => {
        if (data && data.pages) {
            const allPosts = data.pages.flatMap((page) => page)
            const filteredRows = allPosts.filter(
                (post) => post.category === category,
            )
            return filterFn
                ? filteredRows.sort(filterFn)
                : filteredRows.sort(sortFunction[sortOption])
        }
        return []
    }, [data, category, sortOption])
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

    // 무한 스크롤을 위한 Intersection Observer 설정
    const { setTarget } = useIntersectionObserver({
        hasNextPage,
        fetchNextPage,
    })

    return (
        <S.Container>
            {showSortButtons && (
                <S.TabBtnWrap>
                    <span>
                        {sortOption === 'latest'
                            ? '최신순'
                            : sortOption === 'oldest'
                              ? '오래된순'
                              : sortOption === 'priceHigh'
                                ? '높은가격순'
                                : '낮은가격순'}
                    </span>
                    <Button onClick={() => setDropDownOpen(!dropDownOpen)}>
                        {dropDownOpen ? (
                            <TiArrowSortedUp />
                        ) : (
                            <TiArrowSortedDown />
                        )}
                    </Button>
                    {dropDownOpen && (
                        <S.DropDownWrap>
                            <li
                                onClick={() => {
                                    handleSortOptionChange('latest')
                                    setDropDownOpen(false)
                                }}
                            >
                                최신순
                            </li>
                            <li
                                onClick={() => {
                                    handleSortOptionChange('oldest')
                                    setDropDownOpen(false)
                                }}
                            >
                                오래된순
                            </li>
                            <li
                                onClick={() => {
                                    handleSortOptionChange('priceHigh')
                                    setDropDownOpen(false)
                                }}
                            >
                                높은가격순
                            </li>
                            <li
                                onClick={() => {
                                    handleSortOptionChange('priceLow')
                                    setDropDownOpen(false)
                                }}
                            >
                                낮은가격순
                            </li>
                        </S.DropDownWrap>
                    )}
                </S.TabBtnWrap>
            )}
            {isLoading && <p>로딩 중...</p>}
            {error && <p>로드에 실패했습니다.</p>}
            <p>
                현재 예매 가능한 공연은 <b>총 {totalPosts}개</b> 입니다.
            </p>
            <S.PostWrap>
                {filteredAndSortedRows.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
                {/* Intersection Observer 타겟 */}
                <div
                    ref={setTarget}
                    style={{ height: '10px', background: 'transparent' }}
                ></div>
            </S.PostWrap>
        </S.Container>
    )
}
