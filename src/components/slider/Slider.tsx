import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow, Mousewheel } from 'swiper/modules'

import { getProducts } from '../../services/service'

import Spinner from '../spinner/Spinner'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import styles from './slider.module.scss'

import { Sections } from '../../services/service'

type SliderProps = {
    catalogList: (string[])[]
}

type CatalogList = (string[])[]

const Slider = ({ catalogList }: SliderProps) => {
    const [slides, setSlides] = useState<JSX.Element[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        renderInternalSliders(catalogList)
        // eslint-disable-next-line
    }, [])

    const renderInternalSliders = (catalogList: CatalogList) => {
        const internalSliders = catalogList.map((model, i) => {
            return (
                <SwiperSlide className={styles.mainSliderSlides} key={i}>
                    <Swiper
                        className={styles.innerSlider}
                        direction={"horizontal"}
                        slidesPerView={2}
                        spaceBetween={5}
                        key={i}
                    >
                        {model.map((img, i) => {
                            return (
                                <SwiperSlide className={styles.innerSliderSlides} key={i}>
                                    <img src={img} alt="clothImage" />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
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