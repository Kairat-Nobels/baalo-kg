import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Review from '../Review/Review'
import './swipperSlider.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';

function SwipperSlider({ items = [] }) {
    const [slidesPerView, setSlidesPerView] = useState(
        window.innerWidth >= 900 ? 2 : 1
    )

    useEffect(() => {
        const handleResize = () => {
            setSlidesPerView(window.innerWidth >= 900 ? 2 : 1)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if (!items.length) return null

    return (
        <div className="slider">
            <Swiper
                className="swiper_container"
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={slidesPerView}
                loop={items.length > slidesPerView}
                pagination={{ clickable: true }}
                navigation
            >
                {items.map(item => (
                    <SwiperSlide key={item.id}>
                        <Review data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SwipperSlider
