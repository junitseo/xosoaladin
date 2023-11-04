import styles from '@/styles/Components/WaitingLottery/index.module.scss'

const WaitingLoterry = (props: { time: string; region: string }) => {
    return (
        <div className={styles.waitingLottery}>
            <img src="/images/xshome.gif" width={'100%'} alt="xosoaladin.com" />
            <p className={styles.waitingLotteryContent}>
                Đang chờ Xổ Số {props.region} lúc {props.time}', Chúc các bạn
                may mắn !...
            </p>
        </div>
    )
}

export default WaitingLoterry
