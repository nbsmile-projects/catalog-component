import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow, Mousewheel } from 'swiper/modules'

import { Swiper as SwiperClass } from 'swiper'

import Spinner from '../spinner/Spinner'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import styles from './slider.module.scss'

import rightArrow from "../../assets/arrows/rightArrow.svg";
import leftArrow from "../../assets/arrows/leftArrow.svg";

type SliderProps = {
    catalogList: (string[])[]
}

type CatalogList = (string[])[]

const Slider = ({ catalogList }: SliderProps) => {
    const [slides, setSlides] = useState<JSX.Element[]>([])
    const [loading, setLoading] = useState(false)

    const prevRef = useRef<HTMLElement[]>([])
    const nextRef = useRef<HTMLElement[]>([])

    useEffect(() => {
        setLoading(true)
        renderInternalSliders(catalogList)
        // eslint-disable-next-line
    }, [])

    const renderInternalSliders = (catalogList: CatalogList) => {
        const internalSliders = catalogList.map((model, i) => {
            return (
                <SwiperSlide className={styles.mainSliderSlides} key={i}>
                    {({ isActive }) => (
                        <>
                            <img style={{ opacity: 0 }} ref={el => el ? prevRef.current[i] = el : ''} className={`${styles.arrow} ${isActive ? styles.active : null}`} src={leftArrow} alt="leftArrow" />
                            <Swiper
                                className={styles.innerSlider}
                                direction={"horizontal"}
                                slidesPerView={2}
                                spaceBetween={5}
                                key={i}
                                navigation={{
                                    nextEl: nextRef.current[i],
                                    prevEl: prevRef.current[i]
                                }}
                                onBeforeInit={(swiper: SwiperClass) => {
                                    if (typeof swiper.params.navigation === 'object') {
                                        swiper.params.navigation.prevEl = prevRef.current[i]
                                        swiper.params.navigation.nextEl = nextRef.current[i]
                                    }
                                    swiper.navigation.init()
                                    swiper.navigation.update()
                                }}
                                onSlideChange={(swiper: SwiperClass) => {
                                    if (swiper.isBeginning && prevRef.current[i].style.opacity === '1') {
                                        prevRef.current[i].style.opacity = '0'
                                    }
                                    if (!swiper.isBeginning && prevRef.current[i].style.opacity === '0') {
                                        prevRef.current[i].style.opacity = '1'
                                    }
                                    if (swiper.isEnd && nextRef.current[i].style.opacity === '1') {
                                        nextRef.current[i].style.opacity = '0'
                                    }
                                    if (!swiper.isEnd && nextRef.current[i].style.opacity === '0') {
                                        nextRef.current[i].style.opacity = '1'
                                    }
                                }}
                                modules={[Navigation]}
                            >
                                {model.map((img, i) => {
                                    return (
                                        <SwiperSlide className={styles.innerSliderSlides} key={i}>
                                            <img src={img} alt="clothImage" />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            <img style={{ opacity: 1 }} ref={el => el ? nextRef.current[i] = el : ''} className={`${styles.arrow} ${isActive ? styles.active : null}`} src={rightArrow} alt="rightArrow" />
                        </>
                    )}
                </SwiperSlide>
            )
        })

        setSlides(internalSliders);
        setLoading(false)
    }

    return (
        <div className={styles.slider}>
            {loading
                ?
                <Spinner />
                :
                <Swiper
                    className={styles.mainSlider}
                    direction={'vertical'}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    loop={true}
                    mousewheel={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 20,
                        modifier: 20,
                        slideShadows: false
                    }}
                    modules={[EffectCoverflow, Mousewheel]}
                >
                    {slides}
                </Swiper>
            }
        </div>
    )
}

export default Slider