import { ReactNode, useMemo } from 'react'
import Slider, { Settings } from 'react-slick'

interface sliderProps {
    children: ReactNode
    autoplay: boolean | number
    speed: number
    loop?: boolean
}
function CenterMode({
    children,
    autoplay = true,
    speed = 500,
    loop = true,
}: sliderProps) {
    const settings = useMemo<Settings>(
        () => ({
            className: 'center',
            centerMode: true,
            dots: false,
            arrows: false,
            infinite: loop,
            speed,
            centerPadding: '20px',
            slidesToShow: 3,
            autoplay: Boolean(autoplay),
            autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
        }),
        [autoplay, loop, speed],
    )
    return (
        <div className="slider-container">
            <Slider {...settings}>{children}</Slider>
        </div>
    )
}

export default CenterMode
