import BannersList from '../bannersList/BannersList'

import '../../basicStyles.scss'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <BannersList />
      </div>
    </div>
  )
}

export default App
