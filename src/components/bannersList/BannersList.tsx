import React, { useEffect, useState, useRef, MouseEvent } from "react"

import { getProducts, Sections } from "../../services/service"

import styles from "./bannersList.module.scss"
import Spinner from "../spinner/Spinner"

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

    const renderBanners = (data: Sections) => {
        const bannersList = data.map((banner, i) => {
            return (
                <div
                    className={styles.banner}
                    ref={(el) => el ? bannersRefs.current[i] = el : null}
                    onClick={onClickBanner}
                    key={i}>
                    <h2>{banner.category}</h2>
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
        event.currentTarget.focus()
    }

    return (
        <>
            {loading ? <Spinner /> : null}
            {bannersList}
        </>
    )
}

export default BannersList