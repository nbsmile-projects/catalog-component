
import styles from './deliveryInfo.module.scss'

const DeliveryInfo = () => {
    return (
        <div className={styles.deliveryInfo}>
            <h2>Условия доставки</h2>
            <p className={styles.deliveryDescription}>Условия доставки. Здесь могут содержаться небольшие условия доставки, преимущества доставки, время доставки, стоимость. Компания доставки. </p>
            <div className={styles.buttons}>
                <button>Купить</button>
                <button>В корзину</button>
            </div>
            <p className={styles.note}>*Здесь может быть примечание к доставке.</p>
        </div>
    )
}

export default DeliveryInfo