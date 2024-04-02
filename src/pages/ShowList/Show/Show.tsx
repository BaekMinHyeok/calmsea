import { useMemo, useState } from 'react'
import { CategoryList } from '@/components/CategoryList/CategoryList'
import { Container, TabContainer } from '@/pages/ShowList/Show/Show.styles'
import { TabButton } from '@/components/TabMenu/TabButton'
import { recommendedFilter } from '@/util/ShowFilterList'

export function Show({ category }: { category: number }) {
    const [activeTab, setActiveTab] = useState(1)
    const title = useMemo(() => {
        switch (category) {
            case 1:
                return '콘서트'
            case 2:
                return '뮤지컬'
            case 3:
                return '연극'
            case 4:
                return '가족'
            default:
                return '콘서트'
        }
    }, [category])

    const tabContent = () => {
        switch (activeTab) {
            case 1:
                return (
                    <CategoryList
                        category={category}
                        filterFn={recommendedFilter.recommendTickets}
                    />
                )
            case 2:
                return (
                    <div>
                        <CategoryList
                            category={category}
                            filterFn={recommendedFilter.ticketRanking}
                        />
                    </div>
                )
            case 3:
                return <CategoryList category={category} />
            default:
                return null
        }
    }

    return (
        <Container>
            <h2>{title}</h2>
            <div>
                <TabButton
                    isActive={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                >
                    추천공연
                </TabButton>
                <TabButton
                    isActive={activeTab === 2}
                    onClick={() => setActiveTab(2)}
                >
                    예매랭킹
                </TabButton>
                <TabButton
                    isActive={activeTab === 3}
                    onClick={() => setActiveTab(3)}
                >
                    전체리스트
                </TabButton>
            </div>

            <TabContainer>{tabContent()}</TabContainer>
        </Container>
    )
}
