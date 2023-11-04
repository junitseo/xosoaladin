import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import displayNumber from '@/helpers/displayNumber'
import { dayInWeek } from '@/helpers/getDayInWeek'
import { isNumeric } from '@/helpers/IsNumeric'
import reverseDate from '@/helpers/reverseDate'
import IXsmnTable from '@/Interfaces/IXsmnmtTable'
import { provincesSlug } from '@/mocks/provincesSlug'
import styles from '@/styles/Components/XsmnTable/index.module.scss'
import Link from 'next/link'
import { NextPage } from 'next/types'
import { useEffect, useRef, useState } from 'react'
import LotoMnTable from '../LotoMnTable'
import NavbarZoomTable from '../NavbarZoomTable'
import RunningXoso from '../RunningXoso'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'

const XsmnTable: NextPage<IXsmnTable> = (props: IXsmnTable) => {
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
        <div className={styles.xsmnTable}>
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
                                    alt="xosoaladin.com"
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
                                        <th
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'yellow',
                                            }}
                                        >
                                            {
                                                dayInWeek[
                                                    new Date(
                                                        reverseDate(props.date)
                                                    ).getDay()
                                                ]
                                            }
                                        </th>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => (
                                                <th
                                                    style={{
                                                        backgroundColor:
                                                            '#ED123E',
                                                        color: 'yellow',
                                                    }}
                                                    key={index}
                                                >
                                                    <Link
                                                        href={`/kqxs/${
                                                            provincesSlug[
                                                                item
                                                                    .listXSTT?.[0]
                                                                    ?.provinceId
                                                            ]
                                                        }?date=${props.date}}`}
                                                    >
                                                        {item.provinceName}
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
                                                backgroundColor: 'red',
                                                color: 'yellow',
                                            }}
                                        >
                                            {replaceDashFromDate(props.date)}
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => (
                                                <td
                                                    className={styles.xosoCode}
                                                    key={index}
                                                    style={{
                                                        background: '#FDD891',
                                                    }}
                                                >
                                                    {item.listXSTT?.[0]?.code}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                width: '15%',
                                                fontSize: '25px',
                                                fontWeight: 700,
                                            }}
                                            className={styles.xsmnTitleTable}
                                        >
                                            Giải 8
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return item.listXSTT
                                                    ?.filter(
                                                        (xs) => xs.prizeId == 9
                                                    )
                                                    .map((result) => {
                                                        if (
                                                            result.isRunning ==
                                                            'true'
                                                        ) {
                                                            return (
                                                                <td key={index}>
                                                                    <RunningXoso
                                                                        numberLength={
                                                                            2
                                                                        }
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                        if (!result.number) {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
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
                                                                    style={{
                                                                        fontSize:
                                                                            '44px',
                                                                        color: '#D60000',
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            position:
                                                                                'relative',
                                                                        }}
                                                                    >
                                                                        {displayNumber(
                                                                            displayType,
                                                                            result.number
                                                                        )}
                                                                    </span>
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                    })
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 700,
                                                width: '15%',
                                                backgroundColor: '#F3F3F3',
                                            }}
                                            className={styles.xsmnTitleTable}
                                        >
                                            Giải 7
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return item.listXSTT
                                                    ?.filter(
                                                        (xs) => xs.prizeId == 8
                                                    )
                                                    .map((result) => {
                                                        if (
                                                            result.isRunning ==
                                                            'true'
                                                        ) {
                                                            return (
                                                                <td key={index}>
                                                                    <RunningXoso
                                                                        numberLength={
                                                                            3
                                                                        }
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                        if (!result.number) {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
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
                                                                    key={index}
                                                                    style={{
                                                                        color: '#0054BE',
                                                                        backgroundColor:
                                                                            '#F3F3F3',
                                                                    }}
                                                                >
                                                                    {displayNumber(
                                                                        displayType,
                                                                        result.number
                                                                    )}
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                    })
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 700,
                                                width: '15%',
                                            }}
                                            className={styles.xsmnTitleTable}
                                            rowSpan={2}
                                        >
                                            Giải 6
                                        </td>

                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return (
                                                    <td>
                                                        {item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    7
                                                            )
                                                            .slice(0, 1)
                                                            .map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                        result.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {displayNumber(
                                                                                displayType,
                                                                                result.number
                                                                            )}
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="/images/loading.gif"
                                                                                alt="xosoaladin.com"
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return (
                                                    <td>
                                                        {item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    7
                                                            )
                                                            .slice(1, 3)
                                                            .map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                        result.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {displayNumber(
                                                                                displayType,
                                                                                result.number
                                                                            )}
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="/images/loading.gif"
                                                                                alt="xosoaladin.com"
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 700,
                                                width: '15%',
                                                backgroundColor: '#F3F3F3',
                                            }}
                                            className={styles.xsmnTitleTable}
                                        >
                                            Giải 5
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return item.listXSTT
                                                    ?.filter(
                                                        (xs) => xs.prizeId == 6
                                                    )
                                                    .slice(0, 1)
                                                    .map((result) => {
                                                        if (
                                                            result.isRunning ==
                                                            'true'
                                                        ) {
                                                            return (
                                                                <td key={index}>
                                                                    <RunningXoso
                                                                        numberLength={
                                                                            4
                                                                        }
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                        if (!result.number) {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
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
                                                                    key={index}
                                                                    style={{
                                                                        backgroundColor:
                                                                            '#F3F3F3',
                                                                    }}
                                                                >
                                                                    {displayNumber(
                                                                        displayType,
                                                                        result.number
                                                                    )}
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                    })
                                            }
                                        )}
                                    </tr>

                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 700,
                                                width: '15%',
                                            }}
                                            rowSpan={4}
                                            className={styles.xsmnTitleTable}
                                        >
                                            Giải 4
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return (
                                                    <td key={index}>
                                                        {item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    5
                                                            )
                                                            .slice(0, 1)
                                                            .map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                        result.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {displayNumber(
                                                                                displayType,
                                                                                result.number
                                                                            )}
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="/images/loading.gif"
                                                                                alt="xosoaladin.com"
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return (
                                                    <td key={index}>
                                                        {item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    5
                                                            )
                                                            .slice(1, 3)
                                                            .map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                        result.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {displayNumber(
                                                                                displayType,
                                                                                result.number
                                                                            )}
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="/images/loading.gif"
                                                                                alt="xosoaladin.com"
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return (
                                                    <td key={index}>
                                                        {item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    5
                                                            )
                                                            .slice(3, 5)
                                                            .map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                        result.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {displayNumber(
                                                                                displayType,
                                                                                result.number
                                                                            )}
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="/images/loading.gif"
                                                                                alt="xosoaladin.com"
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return (
                                                    <td key={index}>
                                                        {item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    5
                                                            )
                                                            .slice(5, 7)
                                                            .map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                        result.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {displayNumber(
                                                                                displayType,
                                                                                result.number
                                                                            )}
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="/images/loading.gif"
                                                                                alt="xosoaladin.com"
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 700,
                                                width: '15%',
                                                backgroundColor: '#F3F3F3',
                                            }}
                                            className={styles.xsmnTitleTable}
                                        >
                                            Giải 3
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return (
                                                    <td key={index}>
                                                        {item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    4
                                                            )
                                                            .map((result) => {
                                                                if (
                                                                    result.isRunning ==
                                                                    'true'
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
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
                                                                        result.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                                backgroundColor:
                                                                                    '#F3F3F3',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {displayNumber(
                                                                                displayType,
                                                                                result.number
                                                                            )}
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                width: '50%',
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="/images/loading.gif"
                                                                                alt="xosoaladin.com"
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                    </td>
                                                )
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 700,
                                                width: '15%',
                                            }}
                                            className={styles.xsmnTitleTable}
                                        >
                                            Giải 2
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return item.listXSTT
                                                    ?.filter(
                                                        (xs) => xs.prizeId == 3
                                                    )
                                                    .map((result) => {
                                                        if (
                                                            result.isRunning ==
                                                            'true'
                                                        ) {
                                                            return (
                                                                <td key={index}>
                                                                    <RunningXoso
                                                                        numberLength={
                                                                            5
                                                                        }
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                        if (!result.number) {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                        if (
                                                            isNumeric(
                                                                result.number
                                                            )
                                                        ) {
                                                            return (
                                                                <td key={index}>
                                                                    {displayNumber(
                                                                        displayType,
                                                                        result.number
                                                                    )}
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                    })
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 700,
                                                width: '15%',
                                                backgroundColor: '#F3F3F3',
                                            }}
                                            className={styles.xsmnTitleTable}
                                        >
                                            Giải 1
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return item.listXSTT
                                                    ?.filter(
                                                        (xs) => xs.prizeId == 2
                                                    )
                                                    .map((result) => {
                                                        if (
                                                            result.isRunning ==
                                                            'true'
                                                        ) {
                                                            return (
                                                                <td key={index}>
                                                                    <RunningXoso
                                                                        numberLength={
                                                                            5
                                                                        }
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                        if (!result.number) {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
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
                                                                    key={index}
                                                                    style={{
                                                                        backgroundColor:
                                                                            '#F3F3F3',
                                                                    }}
                                                                >
                                                                    {displayNumber(
                                                                        displayType,
                                                                        result.number
                                                                    )}
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                    })
                                            }
                                        )}
                                    </tr>
                                    <tr>
                                        <td
                                            style={{
                                                fontSize: '25px',
                                                fontWeight: 700,
                                                width: '15%',
                                            }}
                                        >
                                            Đặc biệt
                                        </td>
                                        {props.dataXoso?.resultObj?.map(
                                            (item, index) => {
                                                return item.listXSTT
                                                    ?.filter(
                                                        (xs) => xs.prizeId == 1
                                                    )
                                                    .map((result) => {
                                                        if (
                                                            result.isRunning ==
                                                            'true'
                                                        ) {
                                                            return (
                                                                <td key={index}>
                                                                    <RunningXoso
                                                                        numberLength={
                                                                            6
                                                                        }
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                        if (!result.number) {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
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
                                                                    style={{
                                                                        fontSize:
                                                                            '28px',
                                                                        color: '#D60000',
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    {displayNumber(
                                                                        displayType,
                                                                        result.number
                                                                    )}
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={index}>
                                                                    <img
                                                                        src="/images/loading.gif"
                                                                        alt="xosoaladin.com"
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                    })
                                            }
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
                <h2>
                    <img src="/images/old.gif" alt="xosoaladin.com" />
                    <span style={{ marginLeft: '8px' }}>
                        {props.regionName === 'Miền Trung'
                            ? 'KQXSMT - '
                            : 'KQXSMN - '}
                        Kết quả xổ số {props.regionName} ngày{' '}
                        {replaceDashFromDate(props.date)}
                    </span>
                </h2>
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
                            {props.dataXoso?.resultObj?.map((item, index) => (
                                <th key={index}>
                                    <Link
                                        href={`/kqxs/${
                                            provincesSlug[
                                                item.listXSTT?.[0]?.provinceId
                                            ]
                                        }?date=${props.date}}`}
                                    >
                                        {item.provinceName}
                                    </Link>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    fontSize: '16px',
                                    backgroundColor: '#F3F3F3',
                                }}
                            >
                                {replaceDashFromDate(props.date)}
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => (
                                <td
                                    style={{
                                        fontSize: '16px',
                                        backgroundColor: '#F3F3F3',
                                    }}
                                    key={index}
                                >
                                    {item.listXSTT?.[0]?.code}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td style={{ fontSize: '15px', fontWeight: 700 }}>
                                Giải 8
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 9)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={2}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td
                                                    style={{
                                                        color: '#D60000',
                                                    }}
                                                    key={index}
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    backgroundColor: '#F3F3F3',
                                }}
                            >
                                Giải 7
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 8)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={3}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td
                                                    key={index}
                                                    style={{
                                                        backgroundColor:
                                                            '#F3F3F3',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            position:
                                                                'relative',
                                                            color: '#0054BE',
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td
                                style={{ fontSize: '15px', fontWeight: 700 }}
                                rowSpan={3}
                            >
                                Giải 6
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 7)
                                    .slice(0, 1)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={4}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 7)
                                    .slice(1, 2)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={4}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 7)
                                    .slice(2, 3)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={4}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    backgroundColor: '#F3F3F3',
                                }}
                            >
                                Giải 5
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 6)
                                    .slice(0, 1)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={4}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td
                                                    key={index}
                                                    style={{
                                                        backgroundColor:
                                                            '#F3F3F3',
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>

                        <tr>
                            <td
                                style={{ fontSize: '15px', fontWeight: 700 }}
                                rowSpan={7}
                            >
                                Giải 4
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 5)
                                    .slice(0, 1)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 5)
                                    .slice(1, 2)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 5)
                                    .slice(2, 3)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 5)
                                    .slice(3, 4)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 5)
                                    .slice(4, 5)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 5)
                                    .slice(5, 6)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 5)
                                    .slice(6, 7)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    backgroundColor: '#F3F3F3',
                                }}
                                rowSpan={2}
                            >
                                Giải 3
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 4)
                                    .slice(0, 1)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td
                                                    key={index}
                                                    style={{
                                                        backgroundColor:
                                                            '#F3F3F3',
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 4)
                                    .slice(1, 2)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td
                                                    key={index}
                                                    style={{
                                                        backgroundColor:
                                                            '#F3F3F3',
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td style={{ fontSize: '15px', fontWeight: 700 }}>
                                Giải 2
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 3)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td key={index}>
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    backgroundColor: '#F3F3F3',
                                }}
                            >
                                Giải 1
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 2)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={5}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td
                                                    key={index}
                                                    style={{
                                                        backgroundColor:
                                                            '#F3F3F3',
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
                        </tr>
                        <tr>
                            <td style={{ fontSize: '15px', fontWeight: 700 }}>
                                Đặc biệt
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 1)
                                    .map((result) => {
                                        if (result.isRunning == 'true') {
                                            return (
                                                <td key={index}>
                                                    <RunningXoso
                                                        numberLength={6}
                                                    />
                                                </td>
                                            )
                                        }
                                        if (!result.number) {
                                            return (
                                                <td>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                        if (isNumeric(result.number)) {
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
                                                <td
                                                    key={index}
                                                    style={{
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
                                                                {result?.loto}
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
                                                                {result?.loto}
                                                            </div>
                                                        )}
                                                        {displayNumber(
                                                            displayType,
                                                            result.number
                                                        )}
                                                    </span>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>
                                                    <img
                                                        src="/images/loading.gif"
                                                        alt="xosoaladin.com"
                                                    />
                                                </td>
                                            )
                                        }
                                    })
                            })}
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
                {showLoto && (
                    <div className={styles.xsmnTableFooterLotoTable}>
                        <LotoMnTable
                            setLotoChosen={setLotoChosen}
                            dataXoso={props.dataXoso}
                        />
                    </div>
                )}
            </div>

            {!props.isHideZoom && (
                <div className={styles.xsmnTableOption}>
                    {/* <div className={styles.xsmnTableOptionShare}>
                        <button onClick={() => setShowShare(!showShare)}>
                            <img
                                src="/images/icon_share.gif"
                                alt="xosoaladin.com"
                            />
                            Chia sẻ
                        </button>
                    </div> */}
                    <div className={styles.xsmnTableOptionZoom}>
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

export default XsmnTable
