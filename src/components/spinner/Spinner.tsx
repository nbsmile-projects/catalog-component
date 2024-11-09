import loadingDots from '../../assets/spinner/loadingDots.gif'
import styles from './spinner.module.scss'

const Spinner = () => {
    return (
        <div className={styles.spinnerWrapper}>
            <img src={loadingDots} alt='spinner' />
        </div>
    )
}

export default Spinner