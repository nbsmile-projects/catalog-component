import { forwardRef, useImperativeHandle, MutableRefObject, ForwardedRef } from 'react';

import { ShowCatalogFunction } from '../bannersList/BannersList';
import ProductInfo from '../productInfo/ProductInfo';
import Slider from '../slider/Slider';

import styles from './catalog.module.scss';

import { Product } from '../../services/service';
import DeliveryInfo from '../deliveryInfo/DeliveryInfo';

type CatalogProps = {
    catalogList: Product[],
    catalogsRefs: MutableRefObject<HTMLDivElement[]>,
    catalogKey: number
}

const Catalog = ({ catalogList, catalogsRefs, catalogKey }: CatalogProps, ref: ForwardedRef<ShowCatalogFunction>) => {
    const showCatalog = (currentCatalogKey: number) => {
        catalogsRefs.current.forEach((banner) => {
            if (banner.classList.contains(styles.active)) {
                banner.classList.remove(styles.active)
            }
        })
        catalogsRefs.current[currentCatalogKey].classList.add(styles.active)
    }

    useImperativeHandle(ref, () => ({ showCatalog }))

    return (
        <div className={styles.catalog} ref={el => el ? catalogsRefs.current[catalogKey] = el : null}>
            <ProductInfo />
            <Slider catalogList={catalogList} />
            <DeliveryInfo />
        </div>
    );
};

export default forwardRef(Catalog);