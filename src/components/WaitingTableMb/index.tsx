import displayNumber from '@/helpers/displayNumber'
import { isNumeric } from '@/helpers/IsNumeric'
import IWaitingXosoMienNam from '@/Interfaces/IWaitingXosoMienNam'
import IXsmnTable from '@/Interfaces/IXsmnmtTable'
import styles from '@/styles/Components/WaitingTableMb/index.module.scss'
import Link from 'next/link'
import { NextPage } from 'next/types'
import { useEffect, useRef, useState } from 'react'
import LotoMbTable from '../LotoMbTable'
import NavbarZoomTable from '../NavbarZoomTable'
import RunningXoso from '../RunningXoso'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'

const WaitingMbTable: NextPage<IWaitingXosoMienNam> = (
    props: IWaitingXosoMienNam
) => {
    const [displayType, setDisplayType] = useState('full')
    const [showLoto, setShowLoto] = useState(false)
    const [isZoom, setIsZoom] = useState<boolean>(false)
    const [isLock, setIsLock] = useState<boolean>(false)
    const [showShare, setShowShare] = useState(false)
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>
    const [lotoChosen, setLotoChosen] = useState<{
        number: number[]
        type: string
        region: number
    }>()
    const onMouseOverLoto = (
        number: number[],
        type: string,
        region: number
    ) => {
        setLotoChosen({ number, type, region })
    }

    const onMouseOutLoto = (number: number[], type: string, region: number) => {
        setLotoChosen({ number: [-1], type: '-1', region: 0 })
    }

    const handleLockTable = () => {
        setIsLock(true)
        localStorage.setItem('isLock', 'true')
    }

    const handleUnLockTable = () => {
        setIsLock(false)
        localStorage.removeItem('isLock')
    }

    useEffect(() => {
        if (localStorage.getItem('isLock') && props.haveLock) {
            setIsZoom(true)
            setIsLock(true)
        } else {
            setIsZoom(false)
            setIsLock(false)
        }

        // window.onresize = (event) => {
        //     if(ref.current?.style) ref.current.style.transform = `scale(${window.outerHeight / screen.height})`
        //     if (ref.current?.style) ref.current.style.transformOrigin = 'top'
        // }
    }, [ref.current])

    return (
        <div className={styles.xsmbTable} style={{ marginBottom: '10px' }}>
            {isZoom && (
                <div className={styles.xsmbTableZoom}>
                    <div className={styles.xsmbTableZoomWrapper} ref={ref}>
                        <div className={styles.xsmbTableZoomHeader}>
                            <div className={styles.navbarZoomTable}>
                                <NavbarZoomTable />
                            </div>
                            <div className={styles.xsmbTableZoomHeaderLogo}>
                                <img
                                    height={'auto'}
                                    style={{ margin: '3px 0px 0px 10px' }}
                                    src="/images/logo.webp"
                                    alt="xosoaladin.com"
                                />
                            </div>
                            <div className={styles.xsmbTableZoomHeaderOption}>
                                <div
                                    className={
                                        styles.xsmbTableZoomHeaderOptionTitle
                                    }
                                >
                                    <p>
                                        Kết quả xổ số {props.regionName} ngày{' '}
                                        {replaceDashFromDate(props.date)}
                                    </p>
                                </div>
                                {props.haveLock && (
                                    <div
                                        className={
                                            styles.xsmbTableZoomHeaderOptionLock
                                        }
                                    >
                                        {isLock ? (
                                            <img
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    handleUnLockTable()
                                                }
                                                src="/images/lock.png"
                                                alt="xosoaladin.com"
                                            />
                                        ) : (
                                            <img
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    handleLockTable()
                                                }
                                                src="/images/unlock.png"
                                                alt="xosoaladin.com"
                                            />
                                        )}
                                    </div>
                                )}
                                <div
                                    className={
                                        styles.xsmbTableZoomHeaderOptionMinimize
                                    }
                                >
                                    <img
                                        onClick={() => setIsZoom(false)}
                                        src="/images/minimize.gif"
                                        width={'30%'}
                                        style={{ cursor: 'pointer' }}
                                        alt="xosoaladin.com"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.xsmbTableZoomContent}>
                            <div className={styles.xsmbTableZoomContent}>
                                <div
                                    className={styles.xsmbTableZoomContentTable}
                                >
                                    <table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {props.date}
                                                </td>

                                                <td>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <img
                                                            src="/images/loading.gif"
                                                            alt="xosoaladin.com"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Đặc biệt
                                                </td>

                                                <td>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <img
                                                            src="/images/loading.gif"
                                                            alt="xosoaladin.com"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải nhất
                                                </td>

                                                <td>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <img
                                                            src="/images/loading.gif"
                                                            alt="xosoaladin.com"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải nhì
                                                </td>
                                                <td width={'80%'}>
                                                    <div
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 3
                                                </td>
                                                <td width={'80%'}>
                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 4
                                                </td>
                                                <td width={'80%'}>
                                                    <div
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 5
                                                </td>
                                                <td width={'80%'}>
                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>

                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 6
                                                </td>
                                                <td width={'80%'}>
                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '33.3%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 7
                                                </td>
                                                <td width={'80%'}>
                                                    <div
                                                        style={{
                                                            width: '25%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '25%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '25%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '25%',
                                                        }}
                                                    >
                                                        <img src="/images/loading.gif" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.xosoMbTableZoomFooter}>
                                    <p>Chúc Quý Khách May Mắn !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.xsmbTableHeader}>
                <p>
                    <img src="/images/old.gif" />
                    <span style={{ marginLeft: '8px' }}>
                        Kết quả xổ số Miền Bắc ngày{' '}
                        {replaceDashFromDate(props.date)}
                    </span>
                </p>
            </div>
            <div className={styles.xsmbTableContent}>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                {props.date}
                            </td>

                            <td>
                                <div
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Đặc biệt
                            </td>

                            <td>
                                <div
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải nhất
                            </td>

                            <td>
                                <div
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải nhì
                            </td>
                            <td width={'80%'}>
                                <div
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 3
                            </td>
                            <td width={'80%'}>
                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 4
                            </td>
                            <td width={'80%'}>
                                <div
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 5
                            </td>
                            <td width={'80%'}>
                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>

                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 6
                            </td>
                            <td width={'80%'}>
                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '33.3%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 7
                            </td>
                            <td width={'80%'}>
                                <div
                                    style={{
                                        width: '25%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '25%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '25%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                                <div
                                    style={{
                                        width: '25%',
                                    }}
                                >
                                    <img src="/images/loading.gif" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.xsmbTableFooterWrapper}>
                <div className={styles.xsmbTableFooter}>
                    <div className={styles.xsmbTableFooterDisplayType}>
                        <ul>
                            <li
                                style={
                                    displayType == 'full'
                                        ? { backgroundColor: '#FFEAA5' }
                                        : {}
                                }
                                onClick={() => setDisplayType('full')}
                            >
                                Normal
                            </li>
                            <li
                                style={
                                    displayType == '2'
                                        ? { backgroundColor: '#FFEAA5' }
                                        : {}
                                }
                                onClick={() => setDisplayType('2')}
                            >
                                2 Số
                            </li>
                            <li
                                style={
                                    displayType == '3'
                                        ? { backgroundColor: '#FFEAA5' }
                                        : {}
                                }
                                onClick={() => setDisplayType('3')}
                            >
                                3 Số
                            </li>
                        </ul>
                    </div>
                    <div className={styles.xsmbTableFooterFilterLoto}>
                        <div
                            onMouseOut={() => onMouseOutLoto([0], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([0], 'all', 0)}
                        >
                            0
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([1], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([1], 'all', 0)}
                        >
                            1
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([2], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([2], 'all', 0)}
                        >
                            2
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([3], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([3], 'all', 0)}
                        >
                            3
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([4], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([4], 'all', 0)}
                        >
                            4
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([5], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([5], 'all', 0)}
                        >
                            5
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([6], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([6], 'all', 0)}
                        >
                            6
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([7], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([7], 'all', 0)}
                        >
                            7
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([8], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([8], 'all', 0)}
                        >
                            8
                        </div>
                        <div
                            onMouseOut={() => onMouseOutLoto([9], 'all', 0)}
                            onMouseOver={() => onMouseOverLoto([9], 'all', 0)}
                        >
                            9
                        </div>
                    </div>
                    <div className={styles.xsmbTableFooterDisplayLoto}>
                        <span onClick={() => setShowLoto(!showLoto)}>
                            {' '}
                            {!showLoto ? 'Xem loto' : 'X'}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.xsmbTableOption}>
                {/* <div className={styles.xsmbTableOptionShare}>
                    <button onClick={() => setShowShare(!showShare)}>
                        <img src="/images/icon_share.gif" />
                        Chia sẻ
                    </button>
                </div> */}
                <div className={styles.xsmbTableOptionZoom}>
                    <button onClick={() => setIsZoom(true)}>
                        <img src="/images/icon_zoom.gif" />
                        Phóng to
                    </button>
                </div>
            </div>
            {showShare && (
                <div
                    className={styles.xsmbTableShareOption}
                    style={{ marginTop: '10px' }}
                >
                    <div
                        className={styles.xsmbTableShareOptionWrapper}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #ccc',
                            background: '#FFC',
                            padding: '5px',
                        }}
                    >
                        <p>Chia sẻ: </p>
                        <Link href={'#'}>
                            <img
                                src="/images/facebook.png"
                                width={'35px'}
                                style={{ marginLeft: '10px' }}
                            />
                        </Link>
                        <Link href={'#'}>
                            <img
                                src="/images/instagram.png"
                                width={'35px'}
                                style={{ marginLeft: '10px' }}
                            />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WaitingMbTable
