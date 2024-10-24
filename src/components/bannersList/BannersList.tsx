import { useEffect, useState, useRef, MouseEvent } from "react"

import { getProducts, Sections } from "../../services/service"

import styles from "./bannersList.module.scss"
import Spinner from "../spinner/Spinner"
import Catalog from "../catalog/Catalog"

export type ShowCatalogFunction = {
    showCatalog: (currentCatalogKey: number) => void
}

const BannersList = () => {
    const [bannersList, setBannersList] = useState<JSX.Element[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProducts()
            .then((data) => {
                setLoading(false)
                renderBanners(data)
            })
        // eslint-disable-next-line
    }, [])

    const bannersRefs = useRef<HTMLDivElement[]>([])
    const catalogsRefs = useRef<HTMLDivElement[]>([])
    const showCatalogFunctionRef = useRef<null | ShowCatalogFunction>(null)

    const renderBanners = (data: Sections) => {
        const bannersList = data.map((banner, i) => {
            return (
                <div
                    className={styles.banner}
                    ref={(el) => el ? bannersRefs.current[i] = el : null}
                    onClick={onClickBanner}
                    key={i}
                    data-key={i}>
                    <h2>{banner.category}</h2>
                    <Catalog catalogsRefs={catalogsRefs} catalogKey={i} ref={showCatalogFunctionRef} />
                </div >
            )
        })
        setBannersList(bannersList)
    }

    const onClickBanner = (event: MouseEvent<HTMLDivElement>) => {
        bannersRefs.current.forEach((banner) => {
            if (banner.classList.contains(styles.active)) {
                banner.classList.remove(styles.active)
            }
        })
        event.currentTarget.classList.add(styles.active)
        const currentCatalogKey = Number(event.currentTarget.getAttribute('data-key'))
        if (showCatalogFunctionRef.current) {
            showCatalogFunctionRef.current.showCatalog(currentCatalogKey)
        }
    }

    return (
        <>
            {loading ? <Spinner /> : null}
            {bannersList}
        </>
    )
}

export default BannersList