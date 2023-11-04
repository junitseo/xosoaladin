import displayNumber from '@/helpers/displayNumber'
import { isNumeric } from '@/helpers/IsNumeric'
import IXsmnTable from '@/Interfaces/IXsmnmtTable'
import styles from '@/styles/Components/XsmbTable/index.module.scss'
import Link from 'next/link'
import { NextPage } from 'next/types'
import { useEffect, useRef, useState } from 'react'
import LotoMbTable from '../LotoMbTable'
import NavbarZoomTable from '../NavbarZoomTable'
import RunningXoso from '../RunningXoso'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'

const XsmbTable: NextPage<IXsmnTable> = (props: IXsmnTable) => {
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
    }, [])

    return (
        <div className={styles.xsmbTable}>
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
                                                    style={{
                                                        backgroundColor: 'red',
                                                        color: 'yellow',
                                                        fontSize: '1.5vh',
                                                    }}
                                                    width={'20%'}
                                                >
                                                    {replaceDashFromDate(
                                                        props.date
                                                    )}
                                                </td>
                                                <td
                                                    style={{
                                                        fontSize: '1.5vh',
                                                        background: '#FDD891',
                                                    }}
                                                >
                                                    {props.dataXoso?.resultObj?.map(
                                                        (item) =>
                                                            item.listXSTT?.[0]
                                                                ?.code
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '25px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Đặc biệt
                                                </td>
                                                {props.dataXoso?.resultObj?.map(
                                                    (item, index) => {
                                                        return item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    1
                                                            )
                                                            ?.map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <td
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    width: '100%',
                                                                                }}
                                                                            >
                                                                                <RunningXoso
                                                                                    numberLength={
                                                                                        5
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                    )
                                                                }
                                                                if (
                                                                    !result.number
                                                                ) {
                                                                    return (
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
                                                                    )
                                                                }
                                                                if (
                                                                    isNumeric(
                                                                        result.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <td
                                                                            width={
                                                                                '80%'
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    styles.xosoDacbiet
                                                                                }
                                                                                style={{
                                                                                    width: '100%',
                                                                                    fontSize:
                                                                                        '44px',
                                                                                    color: '#D60000',
                                                                                }}
                                                                            >
                                                                                <span>
                                                                                    {' '}
                                                                                    {displayNumber(
                                                                                        displayType,
                                                                                        result?.number
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    )
                                                                } else {
                                                                    return (
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
                                                                    )
                                                                }
                                                            })
                                                    }
                                                )}
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '25px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải nhất
                                                </td>
                                                {props.dataXoso?.resultObj?.map(
                                                    (item, index) => {
                                                        return item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    2
                                                            )
                                                            ?.map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <td
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    width: '100%',
                                                                                }}
                                                                            >
                                                                                <RunningXoso
                                                                                    numberLength={
                                                                                        5
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                    )
                                                                }

                                                                if (
                                                                    !result.number
                                                                ) {
                                                                    return (
                                                                        <td
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
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
                                                                    )
                                                                }
                                                                if (
                                                                    isNumeric(
                                                                        result?.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <td
                                                                            key={
                                                                                index
                                                                            }
                                                                            width={
                                                                                '80%'
                                                                            }
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    width: '100%',
                                                                                    fontSize:
                                                                                        '32px',
                                                                                }}
                                                                            >
                                                                                <span>
                                                                                    {' '}
                                                                                    {displayNumber(
                                                                                        displayType,
                                                                                        result.number
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <td
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
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
                                                                    )
                                                                }
                                                            })
                                                    }
                                                )}
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '25px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải nhì
                                                </td>
                                                <td width={'80%'}>
                                                    {props.dataXoso?.resultObj?.map(
                                                        (item, index) => {
                                                            return item.listXSTT
                                                                ?.filter(
                                                                    (xs) =>
                                                                        xs.prizeId ==
                                                                        3
                                                                )
                                                                ?.map(
                                                                    (
                                                                        result
                                                                    ) => {
                                                                        if (
                                                                            result.isRunning ==
                                                                            'true'
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '50%',
                                                                                    }}
                                                                                >
                                                                                    <RunningXoso
                                                                                        numberLength={
                                                                                            5
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            !result.number
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '50%',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            isNumeric(
                                                                                result?.number
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '50%',
                                                                                    }}
                                                                                >
                                                                                    <span>
                                                                                        {' '}
                                                                                        {displayNumber(
                                                                                            displayType,
                                                                                            result.number
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '50%',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                )
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '25px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 3
                                                </td>
                                                <td width={'80%'}>
                                                    {props.dataXoso?.resultObj?.map(
                                                        (item, index) => {
                                                            return item.listXSTT
                                                                ?.filter(
                                                                    (xs) =>
                                                                        xs.prizeId ==
                                                                        4
                                                                )
                                                                ?.map(
                                                                    (
                                                                        result
                                                                    ) => {
                                                                        if (
                                                                            result.isRunning ==
                                                                            'true'
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="xoso-zoomtable-giai-3"
                                                                                >
                                                                                    <RunningXoso
                                                                                        numberLength={
                                                                                            5
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            !result.number
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="xoso-zoomtable-giai-3"
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            isNumeric(
                                                                                result?.number
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="xoso-zoomtable-giai-3"
                                                                                >
                                                                                    <span>
                                                                                        {' '}
                                                                                        {displayNumber(
                                                                                            displayType,
                                                                                            result?.number
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div className="xoso-zoomtable-giai-3">
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                )
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '25px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 4
                                                </td>
                                                <td width={'80%'}>
                                                    {props.dataXoso?.resultObj?.map(
                                                        (item, index) => {
                                                            return item.listXSTT
                                                                ?.filter(
                                                                    (xs) =>
                                                                        xs.prizeId ==
                                                                        5
                                                                )
                                                                ?.map(
                                                                    (
                                                                        result
                                                                    ) => {
                                                                        if (
                                                                            result.isRunning ==
                                                                            'true'
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '50%',
                                                                                    }}
                                                                                >
                                                                                    <RunningXoso
                                                                                        numberLength={
                                                                                            4
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            !result.number
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '50%',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            isNumeric(
                                                                                result?.number
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '50%',
                                                                                    }}
                                                                                >
                                                                                    <span>
                                                                                        {' '}
                                                                                        {displayNumber(
                                                                                            displayType,
                                                                                            result?.number
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div
                                                                                    style={{
                                                                                        width: '50%',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                )
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '25px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 5
                                                </td>
                                                <td width={'80%'}>
                                                    {props.dataXoso?.resultObj?.map(
                                                        (item, index) => {
                                                            return item.listXSTT
                                                                ?.filter(
                                                                    (xs) =>
                                                                        xs.prizeId ==
                                                                        6
                                                                )
                                                                ?.slice(0, 6)
                                                                ?.map(
                                                                    (
                                                                        result
                                                                    ) => {
                                                                        if (
                                                                            result.isRunning ==
                                                                            'true'
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="xoso-zoomtable-giai-3"
                                                                                >
                                                                                    <RunningXoso
                                                                                        numberLength={
                                                                                            4
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            !result.number
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="xoso-zoomtable-giai-3"
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            isNumeric(
                                                                                result?.number
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div className="xoso-zoomtable-giai-3">
                                                                                    <span>
                                                                                        {' '}
                                                                                        {displayNumber(
                                                                                            displayType,
                                                                                            result?.number
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="xoso-zoomtable-giai-3"
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                )
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '25px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 6
                                                </td>
                                                <td width={'80%'}>
                                                    {props.dataXoso?.resultObj?.map(
                                                        (item, index) => {
                                                            return item.listXSTT
                                                                ?.filter(
                                                                    (xs) =>
                                                                        xs.prizeId ==
                                                                        7
                                                                )
                                                                ?.map(
                                                                    (
                                                                        result
                                                                    ) => {
                                                                        if (
                                                                            result.isRunning ==
                                                                            'true'
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '33.3%',
                                                                                    }}
                                                                                >
                                                                                    <RunningXoso
                                                                                        numberLength={
                                                                                            3
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            !result.number
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '33.3%',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            isNumeric(
                                                                                result?.number
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '33.3%',
                                                                                        color: '#0054BE',
                                                                                    }}
                                                                                >
                                                                                    <span>
                                                                                        {' '}
                                                                                        {displayNumber(
                                                                                            displayType,
                                                                                            result?.number
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '33.3%',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                )
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    width={'20%'}
                                                    style={{
                                                        fontSize: '25px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Giải 7
                                                </td>
                                                <td width={'80%'}>
                                                    {props.dataXoso?.resultObj?.map(
                                                        (item, index) => {
                                                            return item.listXSTT
                                                                ?.filter(
                                                                    (xs) =>
                                                                        xs.prizeId ==
                                                                        8
                                                                )
                                                                ?.map(
                                                                    (
                                                                        result
                                                                    ) => {
                                                                        if (
                                                                            result.isRunning ==
                                                                            'true'
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '25%',
                                                                                    }}
                                                                                >
                                                                                    <RunningXoso
                                                                                        numberLength={
                                                                                            2
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            !result?.number
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '25%',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                        if (
                                                                            isNumeric(
                                                                                result?.number
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '25%',
                                                                                        fontSize:
                                                                                            '30px',
                                                                                        color: '#D60000',
                                                                                    }}
                                                                                >
                                                                                    <span>
                                                                                        {' '}
                                                                                        {displayNumber(
                                                                                            displayType,
                                                                                            result?.number
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    style={{
                                                                                        width: '25%',
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src="/images/loading.gif"
                                                                                        alt="xosoaladin.com"
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                )
                                                        }
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className={styles.xosoMbTableZoomFooter}>
                            <p>Chúc Quý Khách May Mắn !</p>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.xsmbTableHeader}>
                <h2>
                    <img src="/images/old.gif" alt="xosoaladin.com" />
                    <span style={{ marginLeft: '8px' }}>
                        KQXSMB - Kết quả xổ số Miền Bắc ngày{' '}
                        {replaceDashFromDate(props.date)}
                    </span>
                </h2>
            </div>
            <div className={styles.xsmbTableContent}>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td
                                width={'20%'}
                                style={{
                                    fontSize: '25px',
                                    fontWeight: 700,
                                }}
                            >
                                {replaceDashFromDate(props.date)}
                            </td>
                            <td>
                                {props.dataXoso?.resultObj?.map(
                                    (item) => item.listXSTT?.[0]?.code
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 700 }}
                            >
                                Đặc biệt
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 1)
                                    ?.map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <RunningXoso
                                                            numberLength={5}
                                                        />
                                                    </div>
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
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
                                            )
                                        }
                                        if (isNumeric(result?.number)) {
                                            let displayDonvi = true
                                            let displayChuc = true

                                            if (lotoChosen?.type == 'all') {
                                                if (
                                                    lotoChosen.region.toString() ==
                                                        '0' ||
                                                    lotoChosen.region ==
                                                        result.provinceId
                                                ) {
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[0]
                                                            )
                                                        )
                                                    ) {
                                                        displayChuc = false
                                                    }
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[1]
                                                            )
                                                        )
                                                    ) {
                                                        displayDonvi = false
                                                    }
                                                } else {
                                                    displayChuc = false
                                                    displayDonvi = false
                                                }
                                            }

                                            if (lotoChosen?.type == 'chuc') {
                                                displayDonvi = false
                                                if (
                                                    lotoChosen.region.toString() ==
                                                        '0' ||
                                                    lotoChosen.region ==
                                                        result.provinceId
                                                ) {
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[0]
                                                            )
                                                        )
                                                    ) {
                                                        displayChuc = false
                                                    }
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[1]
                                                            )
                                                        )
                                                    ) {
                                                        displayDonvi = false
                                                    }
                                                } else {
                                                    displayChuc = false
                                                    displayDonvi = false
                                                }
                                            }
                                            if (lotoChosen?.type == 'donvi') {
                                                displayChuc = false
                                                if (
                                                    lotoChosen.region.toString() ==
                                                        '0' ||
                                                    lotoChosen.region ==
                                                        result.provinceId
                                                ) {
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[0]
                                                            )
                                                        )
                                                    ) {
                                                        displayChuc = false
                                                    }
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[1]
                                                            )
                                                        )
                                                    ) {
                                                        displayDonvi = false
                                                    }
                                                } else {
                                                    displayChuc = false
                                                    displayDonvi = false
                                                }
                                            }

                                            if (
                                                !lotoChosen ||
                                                lotoChosen.type == '-1'
                                            ) {
                                                displayChuc = false
                                                displayDonvi = false
                                            }

                                            return (
                                                <td width={'80%'} key={index}>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            fontSize: '44px',
                                                            color: '#D60000',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            {displayChuc && (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            'absolute',
                                                                        top: '-1%',
                                                                        right: '1%',
                                                                        color: 'white',
                                                                        padding: 0,
                                                                        background:
                                                                            'radial-gradient(circle at 5px 5px,#41E241,#001',
                                                                        borderRadius:
                                                                            '50%',
                                                                    }}
                                                                >
                                                                    {
                                                                        result?.loto
                                                                    }
                                                                </div>
                                                            )}
                                                            {displayDonvi && (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            'absolute',
                                                                        top: '-1%',
                                                                        right: '1%',
                                                                        color: 'white',
                                                                        padding: 0,
                                                                        background:
                                                                            'radial-gradient(circle at 5px 5px,#56FDF8,#000)',
                                                                        borderRadius:
                                                                            '50%',
                                                                    }}
                                                                >
                                                                    {
                                                                        result?.loto
                                                                    }
                                                                </div>
                                                            )}{' '}
                                                            {displayNumber(
                                                                displayType,
                                                                result?.number
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
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
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 700 }}
                            >
                                Giải nhất
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 2)
                                    ?.map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <RunningXoso
                                                            numberLength={5}
                                                        />
                                                    </div>
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
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
                                            )
                                        }
                                        if (isNumeric(result?.number)) {
                                            let displayDonvi = true
                                            let displayChuc = true

                                            if (lotoChosen?.type == 'all') {
                                                if (
                                                    lotoChosen.region.toString() ==
                                                        '0' ||
                                                    lotoChosen.region ==
                                                        result.provinceId
                                                ) {
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[0]
                                                            )
                                                        )
                                                    ) {
                                                        displayChuc = false
                                                    }
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[1]
                                                            )
                                                        )
                                                    ) {
                                                        displayDonvi = false
                                                    }
                                                } else {
                                                    displayChuc = false
                                                    displayDonvi = false
                                                }
                                            }

                                            if (lotoChosen?.type == 'chuc') {
                                                displayDonvi = false
                                                if (
                                                    lotoChosen.region.toString() ==
                                                        '0' ||
                                                    lotoChosen.region ==
                                                        result.provinceId
                                                ) {
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[0]
                                                            )
                                                        )
                                                    ) {
                                                        displayChuc = false
                                                    }
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[1]
                                                            )
                                                        )
                                                    ) {
                                                        displayDonvi = false
                                                    }
                                                } else {
                                                    displayChuc = false
                                                    displayDonvi = false
                                                }
                                            }
                                            if (lotoChosen?.type == 'donvi') {
                                                displayChuc = false
                                                if (
                                                    lotoChosen.region.toString() ==
                                                        '0' ||
                                                    lotoChosen.region ==
                                                        result.provinceId
                                                ) {
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[0]
                                                            )
                                                        )
                                                    ) {
                                                        displayChuc = false
                                                    }
                                                    if (
                                                        !lotoChosen.number?.includes(
                                                            Number(
                                                                result?.loto.split(
                                                                    ''
                                                                )?.[1]
                                                            )
                                                        )
                                                    ) {
                                                        displayDonvi = false
                                                    }
                                                } else {
                                                    displayChuc = false
                                                    displayDonvi = false
                                                }
                                            }

                                            if (
                                                !lotoChosen ||
                                                lotoChosen.type == '-1'
                                            ) {
                                                displayChuc = false
                                                displayDonvi = false
                                            }
                                            return (
                                                <td width={'80%'} key={index}>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            fontSize: '32px',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            {displayChuc && (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            'absolute',
                                                                        top: '-1%',
                                                                        right: '1%',
                                                                        color: 'white',
                                                                        padding: 0,
                                                                        background:
                                                                            'radial-gradient(circle at 5px 5px,#41E241,#001',
                                                                        borderRadius:
                                                                            '50%',
                                                                    }}
                                                                >
                                                                    {
                                                                        result?.loto
                                                                    }
                                                                </div>
                                                            )}
                                                            {displayDonvi && (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            'absolute',
                                                                        top: '-1%',
                                                                        right: '1%',
                                                                        color: 'white',
                                                                        padding: 0,
                                                                        background:
                                                                            'radial-gradient(circle at 5px 5px,#56FDF8,#000)',
                                                                        borderRadius:
                                                                            '50%',
                                                                    }}
                                                                >
                                                                    {
                                                                        result?.loto
                                                                    }
                                                                </div>
                                                            )}{' '}
                                                            {displayNumber(
                                                                displayType,
                                                                result?.number
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
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
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 700 }}
                            >
                                Giải nhì
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 3)
                                            ?.map((result) => {
                                                if (
                                                    result.isRunning == 'true'
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        >
                                                            <RunningXoso
                                                                numberLength={5}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (!result.number) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (isNumeric(result.number)) {
                                                    let displayDonvi = true
                                                    let displayChuc = true

                                                    if (
                                                        lotoChosen?.type ==
                                                        'all'
                                                    ) {
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        lotoChosen?.type ==
                                                        'chuc'
                                                    ) {
                                                        displayDonvi = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }
                                                    if (
                                                        lotoChosen?.type ==
                                                        'donvi'
                                                    ) {
                                                        displayChuc = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        !lotoChosen ||
                                                        lotoChosen.type == '-1'
                                                    ) {
                                                        displayChuc = false
                                                        displayDonvi = false
                                                    }
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                            >
                                                                {displayChuc && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#41E241,#001',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}
                                                                {displayDonvi && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#56FDF8,#000)',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}{' '}
                                                                {displayNumber(
                                                                    displayType,
                                                                    result?.number
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                    }
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 700 }}
                            >
                                Giải 3
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 4)
                                            ?.map((result) => {
                                                if (
                                                    result.isRunning == 'true'
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <RunningXoso
                                                                numberLength={5}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (!result.number) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (isNumeric(result?.number)) {
                                                    let displayDonvi = true
                                                    let displayChuc = true

                                                    if (
                                                        lotoChosen?.type ==
                                                        'all'
                                                    ) {
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        lotoChosen?.type ==
                                                        'chuc'
                                                    ) {
                                                        displayDonvi = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }
                                                    if (
                                                        lotoChosen?.type ==
                                                        'donvi'
                                                    ) {
                                                        displayChuc = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        !lotoChosen ||
                                                        lotoChosen.type == '-1'
                                                    ) {
                                                        displayChuc = false
                                                        displayDonvi = false
                                                    }
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                            >
                                                                {displayChuc && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#41E241,#001',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}
                                                                {displayDonvi && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#56FDF8,#000)',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}{' '}
                                                                {displayNumber(
                                                                    displayType,
                                                                    result?.number
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                    }
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 700 }}
                            >
                                Giải 4
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 5)
                                            ?.map((result) => {
                                                if (
                                                    result.isRunning == 'true'
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        >
                                                            <RunningXoso
                                                                numberLength={4}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (!result.number) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (isNumeric(result?.number)) {
                                                    let displayDonvi = true
                                                    let displayChuc = true

                                                    if (
                                                        lotoChosen?.type ==
                                                        'all'
                                                    ) {
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        lotoChosen?.type ==
                                                        'chuc'
                                                    ) {
                                                        displayDonvi = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }
                                                    if (
                                                        lotoChosen?.type ==
                                                        'donvi'
                                                    ) {
                                                        displayChuc = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        !lotoChosen ||
                                                        lotoChosen.type == '-1'
                                                    ) {
                                                        displayChuc = false
                                                        displayDonvi = false
                                                    }
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                            >
                                                                {displayChuc && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#41E241,#001',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}
                                                                {displayDonvi && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#56FDF8,#000)',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}{' '}
                                                                {displayNumber(
                                                                    displayType,
                                                                    result?.number
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '50%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                    }
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 700 }}
                            >
                                Giải 5
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 6)
                                            ?.slice(0, 6)
                                            ?.map((result) => {
                                                if (
                                                    result.isRunning == 'true'
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <RunningXoso
                                                                numberLength={4}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (!result.number) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (isNumeric(result?.number)) {
                                                    let displayDonvi = true
                                                    let displayChuc = true

                                                    if (
                                                        lotoChosen?.type ==
                                                        'all'
                                                    ) {
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        lotoChosen?.type ==
                                                        'chuc'
                                                    ) {
                                                        displayDonvi = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }
                                                    if (
                                                        lotoChosen?.type ==
                                                        'donvi'
                                                    ) {
                                                        displayChuc = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        !lotoChosen ||
                                                        lotoChosen.type == '-1'
                                                    ) {
                                                        displayChuc = false
                                                        displayDonvi = false
                                                    }
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                            >
                                                                {displayChuc && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#41E241,#001',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}
                                                                {displayDonvi && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#56FDF8,#000)',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}{' '}
                                                                {displayNumber(
                                                                    displayType,
                                                                    result?.number
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                    }
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 700 }}
                            >
                                Giải 6
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 7)
                                            ?.map((result) => {
                                                if (
                                                    result.isRunning == 'true'
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <RunningXoso
                                                                numberLength={3}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (!result.number) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (isNumeric(result.number)) {
                                                    let displayDonvi = true
                                                    let displayChuc = true

                                                    if (
                                                        lotoChosen?.type ==
                                                        'all'
                                                    ) {
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        lotoChosen?.type ==
                                                        'chuc'
                                                    ) {
                                                        displayDonvi = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }
                                                    if (
                                                        lotoChosen?.type ==
                                                        'donvi'
                                                    ) {
                                                        displayChuc = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        !lotoChosen ||
                                                        lotoChosen.type == '-1'
                                                    ) {
                                                        displayChuc = false
                                                        displayDonvi = false
                                                    }
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                                color: '#0054BE',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                            >
                                                                {displayChuc && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#41E241,#001',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}
                                                                {displayDonvi && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#56FDF8,#000)',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}{' '}
                                                                {displayNumber(
                                                                    displayType,
                                                                    result?.number
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '33.3%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                    }
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 700 }}
                            >
                                Giải 7
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 8)
                                            ?.map((result) => {
                                                if (
                                                    result.isRunning == 'true'
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '25%',
                                                            }}
                                                        >
                                                            <RunningXoso
                                                                numberLength={2}
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (!result.number) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '25%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                                if (isNumeric(result?.number)) {
                                                    let displayDonvi = true
                                                    let displayChuc = true

                                                    if (
                                                        lotoChosen?.type ==
                                                        'all'
                                                    ) {
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        lotoChosen?.type ==
                                                        'chuc'
                                                    ) {
                                                        displayDonvi = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }
                                                    if (
                                                        lotoChosen?.type ==
                                                        'donvi'
                                                    ) {
                                                        displayChuc = false
                                                        if (
                                                            lotoChosen.region.toString() ==
                                                                '0' ||
                                                            lotoChosen.region ==
                                                                result.provinceId
                                                        ) {
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[0]
                                                                    )
                                                                )
                                                            ) {
                                                                displayChuc =
                                                                    false
                                                            }
                                                            if (
                                                                !lotoChosen.number?.includes(
                                                                    Number(
                                                                        result?.loto.split(
                                                                            ''
                                                                        )?.[1]
                                                                    )
                                                                )
                                                            ) {
                                                                displayDonvi =
                                                                    false
                                                            }
                                                        } else {
                                                            displayChuc = false
                                                            displayDonvi = false
                                                        }
                                                    }

                                                    if (
                                                        !lotoChosen ||
                                                        lotoChosen.type == '-1'
                                                    ) {
                                                        displayChuc = false
                                                        displayDonvi = false
                                                    }
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '25%',
                                                                fontSize:
                                                                    '30px',
                                                                color: '#D60000',
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                            >
                                                                {displayChuc && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#41E241,#001',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}
                                                                {displayDonvi && (
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            top: '-1%',
                                                                            right: '1%',
                                                                            color: 'white',
                                                                            padding: 0,
                                                                            background:
                                                                                'radial-gradient(circle at 5px 5px,#56FDF8,#000)',
                                                                            borderRadius:
                                                                                '50%',
                                                                        }}
                                                                    >
                                                                        {
                                                                            result?.loto
                                                                        }
                                                                    </div>
                                                                )}{' '}
                                                                {displayNumber(
                                                                    displayType,
                                                                    result?.number
                                                                )}
                                                            </span>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                width: '25%',
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/loading.gif"
                                                                alt="xosoaladin.com"
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                    }
                                )}
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
                                All
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
                {showLoto && (
                    <div
                        className={styles.xsmbTableFooterLotoTable}
                        style={{ marginTop: '10px' }}
                    >
                        <LotoMbTable
                            setLotoChosen={setLotoChosen}
                            dataXoso={props.dataXoso}
                        />
                    </div>
                )}
            </div>
            {!props?.isHideZoom && (
                <div className={styles.xsmbTableOption}>
                    {/* <div className={styles.xsmbTableOptionShare}>
                        <button onClick={() => setShowShare(!showShare)}>
                            <img
                                src="/images/icon_share.gif"
                                alt="xosoaladin.com"
                            />
                            Chia sẻ
                        </button>
                    </div> */}
                    <div className={styles.xsmbTableOptionZoom}>
                        <button onClick={() => setIsZoom(true)}>
                            <img
                                src="/images/icon_zoom.gif"
                                alt="xosoaladin.com"
                            />
                            Phóng to
                        </button>
                    </div>
                </div>
            )}
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
                                alt="xosoaladin.com"
                            />
                        </Link>
                        <Link href={'#'}>
                            <img
                                src="/images/instagram.png"
                                width={'35px'}
                                style={{ marginLeft: '10px' }}
                                alt="xosoaladin.com"
                            />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default XsmbTable
