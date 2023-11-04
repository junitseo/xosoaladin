import IResultBall from '@/src/Interfaces/IResultBall'
import styles from '@/styles/Components/ResultBall/ResultBall.module.scss'
import { NextPage } from 'next'

const ResultBall: NextPage<IResultBall> = (props: IResultBall) => {
    return (
        <div
            style={{ background: props.backgroundColor }}
            className={styles.resultBall}
        >
            <p>{props.number}</p>
        </div>
    )
}

export default ResultBall
