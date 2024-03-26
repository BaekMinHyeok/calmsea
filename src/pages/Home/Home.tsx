import { useRecoilValueLoadable } from 'recoil'
import { Slick } from '../../components/Slider/MainSlider'
import * as S from '@/pages/Home/Home.styles'
import { getAllPostSelectors } from '@/recoil/selectors/getPosts'
import { PostState } from '@/recoil/atoms/postState'
import { MdImageNotSupported } from 'react-icons/md'
import CenterMode from '@/components/Slider/CenterMod'
import { Link } from 'react-router-dom'

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
    const boardListLoadable = useRecoilValueLoadable(getAllPostSelectors)

    let boardList: PostState[] = []
    // 게시물
    if (boardListLoadable.state === 'hasValue') {
        boardList = boardListLoadable.contents
    }
    // 게시물 필터링
    const rankingItems = boardList
        .slice()
        .sort((a, b) => b.like - a.like)
        .slice(0, 4)
    const soldOutItems = boardList
        .slice()
        .sort((a, b) => a.quantity - b.quantity)
        .slice(0, 5)
    let number = 1

    console.log(soldOutItems)
    return (
        <S.Container>
            <Slick autoplay={true} speed={500}>
                {items.map((item, index) => (
                    <div key={index}>
                        <img src={item.item} alt={item.name} />
                    </div>
                ))}
            </Slick>
            <S.RankingContent>
                <h1>RANKING</h1>
                <S.RankingWrap>
                    {rankingItems.map((item) => (
                        <S.RankingBox key={item.id}>
                            <p>
                                <span>{number++}</span>
                            </p>
                            {item.imageUrl !== null ? (
                                <Link
                                    to={`/showlist/${item.category}/${item.id}`}
                                >
                                    <img src={item.imageUrl} alt={item.title} />
                                </Link>
                            ) : (
                                <div>
                                    <MdImageNotSupported />
                                </div>
                            )}
                        </S.RankingBox>
                    ))}
                </S.RankingWrap>
            </S.RankingContent>
            <S.SoldOutContent>
                <h1>Sold Out Soon</h1>
                <CenterMode autoplay={true} speed={500}>
                    {soldOutItems.map((item) => (
                        <div key={item.id}>
                            {item.imageUrl !== null ? (
                                <Link
                                    to={`/showlist/${item.category}/${item.id}`}
                                >
                                    <img src={item.imageUrl} alt={item.title} />
                                </Link>
                            ) : (
                                <div>
                                    <MdImageNotSupported />
                                </div>
                            )}
                        </div>
                    ))}
                </CenterMode>
            </S.SoldOutContent>
        </S.Container>
    )
}
