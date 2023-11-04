import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import { dayInWeek } from '@/helpers/getDayInWeek'
import reverseDate from '@/helpers/reverseDate'
import IWaitingXosoMienNam from '@/Interfaces/IWaitingXosoMienNam'
import { provinces } from '@/mocks/provinces'
import styles from '@/styles/Components/WaitingTableMn/index.module.scss'
import Link from 'next/link'
import { NextPage } from 'next/types'
import { useEffect, useRef, useState } from 'react'
import NavbarZoomTable from '../NavbarZoomTable'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'

const WaitingMnTable: NextPage<IWaitingXosoMienNam> = (
    props: IWaitingXosoMienNam
) => {
    const [displayType, setDisplayType] = useState('full')
    const [showLoto, setShowLoto] = useState(false)
    const [lotoChosen, setLotoChosen] = useState<{
        number: number[]
        type: string
        region: number
    }>()
    const [isZoom, setIsZoom] = useState<boolean>(false)
    const [isLock, setIsLock] = useState<boolean>(false)
    const [showShare, setShowShare] = useState(false)

    const ref = useRef() as React.MutableRefObject<HTMLInputElement>

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
    }, [])

    // useEffect(()=>{
    //     window.onresize = (event) => {
    //         console.log(ref.current)
    //         if(ref.current?.style) ref.current.style.transform = `scale(${window.outerHeight / screen.height})`
    //         if (ref.current?.style) ref.current.style.transformOrigin = 'top'
    //     }
    // },[isZoom])

    return (
        <div className={styles.xsmnTable} style={{ marginBottom: '10px' }}>
            {isZoom && (
                <div className={styles.xsmnTableZoom}>
                    <div className={styles.xsmnTableZoomWrapper} ref={ref}>
                        <div className={styles.xsmnTableZoomHeader}>
                            <div className={styles.navbarZoomTable}>
                                <NavbarZoomTable />
                            </div>
                            <div className={styles.xsmnTableZoomHeaderLogo}>
                                <img
                                    width={160}
                                    height={'auto'}
                                    style={{ margin: '3px 0px 0px 10px' }}
                                    src="/images/logo.webp"
                                />
                            </div>
                            <div className={styles.xsmnTableZoomHeaderOption}>
                                <div
                                    className={
                                        styles.xsmnTableZoomHeaderOptionTitle
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
                                            styles.xsmnTableZoomHeaderOptionLock
                                        }
                                    >
                                        {isLock ? (
                                            <img
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    handleUnLockTable()
                                                }
                                                src="/images/lock.png"
                                            />
                                        ) : (
                                            <img
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    handleLockTable()
                                                }
                                                src="/images/unlock.png"
                                            />
                                        )}
                                    </div>
                                )}
                                <div
                                    className={
                                        styles.xsmnTableZoomHeaderOptionMinimize
                                    }
                                >
                                    <img
                                        onClick={() => setIsZoom(false)}
                                        src="/images/minimize.gif"
                                        width={'30'}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.xsmnTableZoomContentTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            {
                                                dayInWeek[
                                                    new Date(
                                                        reverseDate(props.date)
                                                    ).getDay()
                                                ]
                                            }
                                        </th>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <th key={index}>
                                                    <Link href={'#'}>
                                                        {provinces[item]}
                                                    </Link>
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {addingZeroToMonth(new Date(), '/')}
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt=".club"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Giải 8
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Giải 7
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                            rowSpan={3}
                                        >
                                            Giải 6
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Giải 5
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>

                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                            rowSpan={6}
                                        >
                                            Giải 4
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                            rowSpan={2}
                                        >
                                            Giải 3
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Giải 2
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Giải 1
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 700,
                                            }}
                                        >
                                            Đặc biệt
                                        </td>
                                        {props.listProvince.map(
                                            (item, index) => (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.xosoMnTableZoomFooter}>
                            <p>Chúc Quý Khách May Mắn !</p>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.xsmnTableHeader}>
                <p>
                    <img src="/images/old.gif" />
                    <span style={{ marginLeft: '8px' }}>
                        Kết quả xổ số {props.regionName} ngày {props.date}
                    </span>
                </p>
            </div>
            <div className={styles.xsmnTableContent}>
                <table>
                    <thead>
                        <tr>
                            <th>
                                {
                                    dayInWeek[
                                        new Date(
                                            reverseDate(props.date)
                                        ).getDay()
                                    ]
                                }
                            </th>
                            {props.listProvince.map((item, index) => (
                                <th key={index}>
                                    <Link href={'#'}>{provinces[item]}</Link>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    fontWeight: 700,
                                }}
                            >
                                {addingZeroToMonth(new Date(), '/')}
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 8
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 7
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                                rowSpan={3}
                            >
                                Giải 6
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 5
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>

                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                                rowSpan={6}
                            >
                                Giải 4
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                                rowSpan={2}
                            >
                                Giải 3
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 2
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Giải 1
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                Đặc biệt
                            </td>
                            {props.listProvince.map((item, index) => (
                                <td key={index}>
                                    <img
                                        src="/images/loading.gif"
                                        alt=".club"
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.xsmnTableFooterWrapper}>
                <div className={styles.xsmnTableFooter}>
                    <div className={styles.xsmnTableFooterDisplayType}>
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
                    <div className={styles.xsmnTableFooterFilterLoto}>
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
                    <div className={styles.xsmnTableFooterDisplayLoto}>
                        <span onClick={() => setShowLoto(!showLoto)}>
                            {' '}
                            {!showLoto ? 'Xem loto' : 'X'}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.xsmnTableOption}>
                {/* <div className={styles.xsmnTableOptionShare}>
                    <button onClick={() => setShowShare(!showShare)}>
                        <img src="/images/icon_share.gif" />
                        Chia sẻ
                    </button>
                </div> */}
                <div className={styles.xsmnTableOptionZoom}>
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
                                alt="xo so aladin"
                            />
                        </Link>
                        <Link href={'#'}>
                            <img
                                src="/images/instagram.png"
                                width={'35px'}
                                style={{ marginLeft: '10px' }}
                                alt="xo so aladin"
                            />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WaitingMnTable
