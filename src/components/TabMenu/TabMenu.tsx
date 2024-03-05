import { useState } from 'react'
import { Container, TabButton } from './TabMenu.styles'
import { TotalList } from '@/components/TotalList/TotalList'

export function TabMenu({ category }: { category: number }) {
    const [activeTab, setActiveTab] = useState(1)

    const tabContent = () => {
        switch (activeTab) {
            case 1:
                return <div>탭1 내용</div>
            case 2:
                return <div>탭2 내용</div>
            case 3:
                return <TotalList />
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
