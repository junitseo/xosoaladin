import styles from '@/styles/Components/LiveResult/index.module.scss'
import Link from 'next/link'
import { AiFillCaretRight } from 'react-icons/ai'

const LiveResult = () => {
    let imgMb = ''
    let imgMn = ''
    let imgMt = ''

    if (
        new Date().getHours() == 16 &&
        new Date().getMinutes() > 15 &&
        new Date().getMinutes() < 45
    ) {
        imgMn = '/images/loading.gif'
    } else if (
        (new Date().getHours() == 16 && new Date().getMinutes() >= 45) ||
        new Date().getHours() > 16
    ) {
        imgMn = '/images/new.png'
    } else {
        imgMn = '/images/load.png'
    }

    if (
        new Date().getHours() == 17 &&
        new Date().getMinutes() > 15 &&
        new Date().getMinutes() < 45
    ) {
        imgMt = '/images/loading.gif'
    } else if (
        (new Date().getHours() == 17 && new Date().getMinutes() >= 45) ||
        new Date().getHours() > 17
    ) {
        imgMt = '/images/new.png'
    } else {
        imgMt = '/images/load.png'
    }

    if (
        new Date().getHours() == 18 &&
        new Date().getMinutes() > 18 &&
        new Date().getMinutes() < 45
    ) {
        imgMb = '/images/loading.gif'
    } else if (
        (new Date().getHours() == 18 && new Date().getMinutes() >= 45) ||
        new Date().getHours() > 18
    ) {
        imgMb = '/images/new.png'
    } else {
        imgMb = '/images/load.png'
    }

    return (
        <div className={styles.liveResult}>
            <div className={styles.liveResultHeader}>
                <p style={{ fontSize: '12px', textAlign: 'center' }}>
                    Tường Thuật Trực Tiếp Xổ Số
                </p>
            </div>
            <div className={styles.liveResultContent}>
                <p>
                    <Link href={'/truc-tiep/xo-so-mien-nam'}>
                        <AiFillCaretRight />
                        <span>Trực tiếp xổ số miền Nam</span>
                        <img
                            style={{ marginLeft: '3px' }}
                            src={imgMn}
                            alt="xo so aladin"
                        />
                    </Link>
                </p>
                <p>
                    <Link href={'/truc-tiep/xo-so-mien-bac'}>
                        <AiFillCaretRight />
                        <span>Trực tiếp xổ số miền Bắc</span>
                        <img
                            style={{ marginLeft: '3px' }}
                            src={imgMb}
                            alt="xo so aladin"
                        />
                    </Link>
                </p>
                <p>
                    <Link href={'/truc-tiep/xo-so-mien-trung'}>
                        <AiFillCaretRight />
                        <span>Trực tiếp xổ số miền Trung</span>
                        <img
                            style={{ marginLeft: '3px' }}
                            src={imgMt}
                            alt="xo so aladin"
                        />
                    </Link>
                </p>
                <p>
                    <Link href={'/lich-quay-so-mo-thuong'}>
                        <AiFillCaretRight />
                        <span>Lịch mở thưởng</span>
                    </Link>
                </p>
            </div>
            <div className={styles.liveResultNote}>
                <img
                    style={{ marginLeft: '10px' }}
                    src="/images/load.png"
                    alt="xo so aladin"
                />
                <span>chờ</span>
                <img
                    style={{ marginLeft: '10px' }}
                    src="/images/loading.gif"
                    alt="xo so aladin"
                />
                <span>đang xổ</span>
                <img
                    style={{ marginLeft: '10px' }}
                    src="/images/new.png"
                    alt="xo so aladin"
                />
                <span>mới</span>
            </div>
        </div>
    )
}

export default LiveResult
