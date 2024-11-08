import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import styles from './tileCatalog.module.scss'
import 'swiper/css'
import 'swiper/css/pagination'

import { Product } from '../../services/service'

const TileCatalog = ({ catalogList }: { catalogList: Product[] }) => {
    const [tilesList, setTilesList] = useState<JSX.Element[]>([])

    useEffect(() => {
        renderTiles(catalogList)
    }, [])

    const renderTiles = (catalogList: Product[]) => {
        const renderedTiles = catalogList.map((model, i) => {
            return (
                <Swiper
                    className={styles.slider}
                    slidesPerView={2}
                    spaceBetween={10}
                    pagination
                    modules={[Pagination]}
                    key={i}
                >
                    {
                        model.urls.map((img, i) => {
                            return (
                                <SwiperSlide className={styles.swiperSlides} key={i}>
                                    <img src={img} alt="clothImage" />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper >
            )
        })
        console.log(renderedTiles)
        setTilesList(renderedTiles)
        // setLoading(false)
    }

    return (
        <div className={styles.tileCatalog}>
            {tilesList}
        </div>
    )
}

export default TileCatalog