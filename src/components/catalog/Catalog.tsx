import { forwardRef, useImperativeHandle, MutableRefObject, ForwardedRef } from 'react';

import { ShowCatalogFunction } from '../bannersList/BannersList';
import Slider from '../slider/Slider';

import styles from './catalog.module.scss';

type CatalogProps = {
    catalogList: (string[])[],
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
            <h2>first</h2>
            <Slider catalogList={catalogList} />
            <h2>third</h2>
        </div>
    );
};

export default forwardRef(Catalog);