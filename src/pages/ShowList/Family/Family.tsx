import { useState } from 'react'
import { CategoryList } from '@/components/TotalList/CategoryList'
import { Container } from '@/pages/ShowList/Concert/Concert.styles'
import { TabButton } from '@/components/TabMenu/TabButton'
import { recommendedFilter } from '@/util/ShowFilterList'

export function Family() {
    const [activeTab, setActiveTab] = useState(1)

    const tabContent = () => {
        switch (activeTab) {
            case 1:
                return (
                    <CategoryList
                        category={4}
                        filterFn={recommendedFilter.recommendTickets}
                    />
                )
            case 2:
                return (
                    <div>
                        <CategoryList
                            category={4}
                            filterFn={recommendedFilter.ticketRanking}
                        />
                    </div>
                )
            case 3:
                return <CategoryList category={4} />
            default:
                return null
        }
    }

    return (
        <Container>
            <h2>가족</h2>
            <div>
                <TabButton
                    $isActive={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                >
                    추천공연
                </TabButton>
                <TabButton
                    $isActive={activeTab === 2}
                    onClick={() => setActiveTab(2)}
                >
                    예매랭킹
                </TabButton>
                <TabButton
                    $isActive={activeTab === 3}
                    onClick={() => setActiveTab(3)}
                >
                    전체리스트
                </TabButton>
            </div>

            <div>{tabContent()}</div>
        </Container>
    )
}
