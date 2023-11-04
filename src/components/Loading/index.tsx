import { NextPage } from 'next/types'
import styles from '@/styles/Components/Loading/index.module.scss'

const Loading: NextPage = () => {
    return (
        <div className={styles.loading}>
            <div className="kg-loading">
                <span></span>
                <span></span>
                <span></span>
                <div>LOADING</div>
            </div>
            {/* <img src="/images/loading-page.gif" width={300} /> */}
        </div>
    )
}

export default Loading
