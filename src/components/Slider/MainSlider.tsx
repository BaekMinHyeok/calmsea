import React, { useMemo } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Container } from '@/components/Slider/Mainslider.styles'
// import { FaSearch } from 'react-icons/fa'

interface sliderProps {
    children: React.ReactNode
    autoplay: boolean | number
    speed: number
    loop?: boolean
}

export function Slick({
    children,
    autoplay = true,
    speed = 500,
    loop = true,
}: sliderProps) {
    const settings = useMemo<Settings>(
        () => ({
            dots: false,
            arrows: false,
            infinite: loop,
            speed,
            slidesToShow: 1,
            autoplay: Boolean(autoplay),
            autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
        }),
        [autoplay, loop, speed],
    )
    return (
        <Container>
            <Slider {...settings}>{children}</Slider>
        </Container>
    )
}
