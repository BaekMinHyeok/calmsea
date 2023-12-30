import { Title } from '../../components/Text/Text'
import { Container } from './Concert.styles'

export function Concert() {
    return (
        <Container>
            <Title level={1} text={'콘서트'} underline={true} />
        </Container>
    )
}
