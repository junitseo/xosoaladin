import styles from '@/styles/Components/RunningXoso/index.module.scss'
import { useEffect, useState } from 'react'

const RunningXoso = (props: { numberLength: number }) => {
    const [rerender, setRerender] = useState(false)
    const [random, setRandom] = useState('000000')
    function rolldice() {
        var ranNum = Math.floor(1 + Math.random() * 9)
        return ranNum
    }

    const randomNumber = () => {
        let s = ''
        for (let i = 0; i < props.numberLength; i++) {
            s += `${rolldice()}`
        }
        setRandom(s)
    }

    useEffect(() => {
        const runXoso = setInterval(() => {
            randomNumber()
        }, 100)

        return () => {
            clearInterval(runXoso)
        }
    }, [])
    return (
        <div className={styles.runningXoso}>
            <span>{random}</span>
        </div>
    )
}

export default RunningXoso
