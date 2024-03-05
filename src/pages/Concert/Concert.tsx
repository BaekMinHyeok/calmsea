import { TabMenu } from '@/components/TabMenu/TabMenu'
import { Title } from '@/components/Text/Text'
import { Container } from '@/pages/Concert/Concert.styles'
export function Concert() {
    return (
        <Container>
            <Title text={'콘서트'} size="h2" />
            <TabMenu category={1} />
        </Container>
    )
}
