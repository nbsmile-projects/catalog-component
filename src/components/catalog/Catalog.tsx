import { forwardRef, useImperativeHandle, MutableRefObject, ForwardedRef } from 'react';

import styles from './catalog.module.scss';

import { ShowCatalogFunction } from '../bannersList/BannersList';

type CatalogProps = {
    catalogsRefs: MutableRefObject<HTMLDivElement[]>,
    catalogKey: number
}

const Catalog = ({ catalogsRefs, catalogKey }: CatalogProps, ref: ForwardedRef<ShowCatalogFunction>) => {
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
            {catalogKey}
        </div>
    );
};

export default forwardRef(Catalog);