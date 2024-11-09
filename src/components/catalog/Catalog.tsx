import { forwardRef, useImperativeHandle, MutableRefObject, ForwardedRef, useState, useRef } from 'react'

import ProductInfo from '../productInfo/ProductInfo'
import DeliveryInfo from '../deliveryInfo/DeliveryInfo'
import TileCatalog from '../tileCatalog/TileCatalog'
import Slider from '../slider/Slider'

import styles from './catalog.module.scss'
import tiles from '../../assets/anotherIcons/tiles.svg'

import { ShowCatalogFunction } from '../bannersList/BannersList'
import { Product } from '../../services/service'

type CatalogProps = {
    catalogList: Product[],
    catalogsRefs: MutableRefObject<HTMLDivElement[]>,
    catalogKey: number
}

const Catalog = ({ catalogList, catalogsRefs, catalogKey }: CatalogProps, ref: ForwardedRef<ShowCatalogFunction>) => {
    const [catalogView, setCatalogView] = useState('carousel')

    const changeMenuButtonRef = useRef<HTMLImageElement>(null)

    const showCatalog = (currentCatalogKey: number) => {
        catalogsRefs.current.forEach((banner) => {
            if (banner.classList.contains(styles.active)) {
                banner.classList.remove(styles.active)
            }
        })
        catalogsRefs.current[currentCatalogKey].classList.add(styles.active)
    }

    useImperativeHandle(ref, () => ({ showCatalog }))

    const onChangeMenu = () => {
        switch (catalogView) {
            case 'carousel':
                setCatalogView('tiles')
                if (changeMenuButtonRef.current) {
                    changeMenuButtonRef.current.classList.add(styles.active)
                }
                break
            case 'tiles':
                setCatalogView('carousel')
                if (changeMenuButtonRef.current) {
                    changeMenuButtonRef.current.classList.remove(styles.active)
                }
                break
        }
    }

    return (
        <div className={styles.catalog} ref={el => el ? catalogsRefs.current[catalogKey] = el : null}>
            <img className={styles.changeMenuButton} onClick={onChangeMenu} ref={changeMenuButtonRef} src={tiles} alt='changeMenu' />
            {catalogView === 'carousel' ? (
                <div className={styles.carousel}>
                    <ProductInfo />
                    <Slider catalogList={catalogList} />
                    <DeliveryInfo />
                </div>

            ) :
                (
                    <div className={styles.tiles}>
                        <TileCatalog catalogList={catalogList} />
                    </div>
                )}
        </div>
    )
}

export default forwardRef(Catalog)