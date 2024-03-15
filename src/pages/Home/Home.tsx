import { Slick } from '../../components/Slider/MainSlider'
import { Container } from '@/pages/Home/Home.styles'

const env = process.env
env.PUBLIC_URL = env.PUBLIC_URL || ''
interface itemsProps {
    item: string
    name: string
}

const items: itemsProps[] = [
    {
        item: process.env.PUBLIC_URL + `assets/main01.png`,
        name: 'slide01',
    },
    {
        item: process.env.PUBLIC_URL + `assets/main02.png`,
        name: 'slide02',
    },
    {
        item: process.env.PUBLIC_URL + `assets/main03.png`,
        name: 'slide03',
    },
]

export function Home() {
    return (
        <Container>
            <Slick autoplay={true} speed={500}>
                {items.map((item, index) => (
                    <div key={index}>
                        <img src={item.item} alt={item.name} />
                    </div>
                ))}
            </Slick>
            <h1>RANKING</h1>
            <h1>Sold Out Soon</h1>
        </Container>
    )
}
