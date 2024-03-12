import { useState } from 'react'
// import { Title } from '@/components/Text/Text'
import { CategoryList } from '@/components/TotalList/CategoryList'
import { Container } from '@/pages/CategoryPage/Concert/Concert.styles'
import { TabButton } from '@/components/TabMenu/TabButton'

export function Concert() {
    const [activeTab, setActiveTab] = useState(1)

    const tabContent = () => {
        switch (activeTab) {
            case 1:
                return <CategoryList category={1} />
            case 2:
                return <CategoryList category={1} />
            case 3:
                return <CategoryList category={1} />
            default:
                return null
        }
    }

    return (
        <Container>
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
