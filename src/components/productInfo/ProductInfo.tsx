
import styles from './productInfo.module.scss'

const ProductInfo = () => {
    return (
        <div className={styles.productInfo}>
            <h2>Название товара</h2>
            <p>Небольшое описание текущего товара. Может содержать в себе, состав материала, преимущества над другими моделями, слоганы, данные о производителе. Также краткую историю о создании и выпуске модели.</p>
        </div>
    )
}

export default ProductInfo