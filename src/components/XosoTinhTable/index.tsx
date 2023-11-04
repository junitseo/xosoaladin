import displayNumber from '@/helpers/displayNumber'
import { isNumeric } from '@/helpers/IsNumeric'
import IXsmnTable from '@/Interfaces/IXsmnmtTable'
import styles from '@/styles/Components/XsTinhTable/index.module.scss'
import { NextPage } from 'next/types'
import { useEffect, useState } from 'react'
import LotoMbTable from '../LotoMbTable'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'

const XosoTinhTable: NextPage<IXsmnTable> = (props: IXsmnTable) => {
    const [displayType, setDisplayType] = useState('full')
    const [showLoto, setShowLoto] = useState(false)
    const [isZoom, setIsZoom] = useState<boolean>(false)
    const [isLock, setIsLock] = useState<boolean>(false)

    const handleLockTable = () => {
        setIsLock(true)
        localStorage.setItem('isLock', 'true')
    }

    const handleUnLockTable = () => {
        setIsLock(false)
        localStorage.removeItem('isLock')
    }

    useEffect(() => {
        if (localStorage.getItem('isLock')) {
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
                    <div className={styles.xsmbTableZoomHeader}>
                        <div className={styles.xsmbTableZoomHeaderLogo}>
                            <img
                                width={160}
                                height={'auto'}
                                style={{ margin: '3px 0px 0px 10px' }}
                                src="/images/logo-zoom.webp"
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
                                            onClick={() => handleUnLockTable()}
                                            src="/images/lock.png"
                                            alt="xosoaladin.com"
                                        />
                                    ) : (
                                        <img
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleLockTable()}
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
                                    width={'30'}
                                    style={{ cursor: 'pointer' }}
                                    alt="xosoaladin.com"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.xsmbTableZoomContent}>
                        <div className={styles.xsmbTableZoomContent}>
                            <div className={styles.xsmbTableHeader}>
                                <p>
                                    <img
                                        src="/images/old.gif"
                                        alt="xosoaladin.com"
                                    />
                                    <span
                                        style={{
                                            marginLeft: '8px',
                                        }}
                                    >
                                        Kết quả xổ số Miền Bắc ngày{' '}
                                        {replaceDashFromDate(props.date)}
                                    </span>
                                </p>
                            </div>
                            <div className={styles.xsmbTableZoomContentTable}>
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
                                                Đặc biệt
                                            </td>
                                            {props.dataXoso?.resultObj?.map(
                                                (item, index) => {
                                                    return item.listXSTT
                                                        ?.filter(
                                                            (xs) =>
                                                                xs.prizeId == 1
                                                        )
                                                        ?.map((result) => {
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
                                                                            style={{
                                                                                width: '100%',
                                                                                fontSize:
                                                                                    '44px',
                                                                                color: '#800000',
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
                                                                xs.prizeId == 2
                                                        )
                                                        ?.map((result) => {
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
                                                                    result?.number
                                                                )
                                                            ) {
                                                                return (
                                                                    <td
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
                                                            ?.map((result) => {
                                                                if (
                                                                    !result.number
                                                                ) {
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
                                                                if (
                                                                    isNumeric(
                                                                        result?.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
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
                                                            ?.map((result) => {
                                                                if (
                                                                    !result.number
                                                                ) {
                                                                    return (
                                                                        <div
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
                                                                            style={{
                                                                                width: '33.3%',
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
                                                            ?.map((result) => {
                                                                if (
                                                                    !result.number
                                                                ) {
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
                                                                if (
                                                                    isNumeric(
                                                                        result?.number
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
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
                                                            })
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
                                                            ?.map((result) => {
                                                                if (
                                                                    !result.number
                                                                ) {
                                                                    return (
                                                                        <div
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
                                                                            style={{
                                                                                width: '33.3%',
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
                                                            ?.map((result) => {
                                                                if (
                                                                    !result.number
                                                                ) {
                                                                    return (
                                                                        <div
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
                                                                            style={{
                                                                                width: '33.3%',
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
                                                            ?.map((result) => {
                                                                if (
                                                                    !result?.number
                                                                ) {
                                                                    return (
                                                                        <div
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
                                                                            style={{
                                                                                width: '25%',
                                                                                fontSize:
                                                                                    '30px',
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
                                        <tr>
                                            <td
                                                width={'20%'}
                                                style={{
                                                    fontSize: '15px',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Giải 8
                                            </td>
                                            <td width={'80%'}>
                                                {props.dataXoso?.resultObj?.map(
                                                    (item, index) => {
                                                        return item.listXSTT
                                                            ?.filter(
                                                                (xs) =>
                                                                    xs.prizeId ==
                                                                    9
                                                            )
                                                            ?.map((result) => {
                                                                if (
                                                                    !result.number
                                                                ) {
                                                                    return (
                                                                        <div
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
                                                                            style={{
                                                                                width: '25%',
                                                                                fontSize:
                                                                                    '30px',
                                                                                color: '#800000',
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
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.xsmbTableHeader}>
                <p>
                    <img src="/images/old.gif" alt="xo so aladin" />
                    <span style={{ marginLeft: '8px' }}>
                        Kết quả xổ số {props.regionName} ngày{' '}
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
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Đặc biệt
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 1)
                                    ?.map((result) => {
                                        if (!result.number) {
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
                                        if (isNumeric(result?.number)) {
                                            return (
                                                <td width={'80%'}>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            fontSize: '44px',
                                                            color: '#800000',
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
                            })}
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Giải nhất
                            </td>
                            {props.dataXoso?.resultObj?.map((item, index) => {
                                return item.listXSTT
                                    ?.filter((xs) => xs.prizeId == 2)
                                    ?.map((result) => {
                                        if (!result.number) {
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
                                        if (isNumeric(result?.number)) {
                                            return (
                                                <td width={'80%'}>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            fontSize: '32px',
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
                            })}
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Giải nhì
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 3)
                                            ?.map((result) => {
                                                if (!result.number) {
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
                                                if (isNumeric(result.number)) {
                                                    return (
                                                        <div
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
                                            })
                                    }
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Giải 3
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 4)
                                            ?.map((result) => {
                                                if (!result.number) {
                                                    return (
                                                        <div
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
                                                    return (
                                                        <div
                                                            style={{
                                                                width: '33.3%',
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
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Giải 4
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 5)
                                            ?.map((result) => {
                                                if (!result.number) {
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
                                                if (isNumeric(result?.number)) {
                                                    return (
                                                        <div
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
                                            })
                                    }
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Giải 5
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 6)
                                            ?.map((result) => {
                                                if (!result.number) {
                                                    return (
                                                        <div
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
                                                    return (
                                                        <div
                                                            style={{
                                                                width: '33.3%',
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
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Giải 6
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 7)
                                            ?.map((result) => {
                                                if (!result.number) {
                                                    return (
                                                        <div
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
                                                    return (
                                                        <div
                                                            style={{
                                                                width: '33.3%',
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
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Giải 7
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 8)
                                            ?.map((result) => {
                                                if (!result.number) {
                                                    return (
                                                        <div
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
                                                    return (
                                                        <div
                                                            style={{
                                                                width: '25%',
                                                                fontSize:
                                                                    '30px',
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
                        <tr>
                            <td
                                width={'20%'}
                                style={{ fontSize: '15px', fontWeight: 400 }}
                            >
                                Giải 8
                            </td>
                            <td width={'80%'}>
                                {props.dataXoso?.resultObj?.map(
                                    (item, index) => {
                                        return item.listXSTT
                                            ?.filter((xs) => xs.prizeId == 9)
                                            ?.map((result) => {
                                                if (!result.number) {
                                                    return (
                                                        <div
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
                                                    return (
                                                        <div
                                                            style={{
                                                                width: '25%',
                                                                fontSize:
                                                                    '30px',
                                                                color: '#800000',
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
                    <div className={styles.xsmbTableFooterDisplayLoto}>
                        <span onClick={() => setShowLoto(!showLoto)}>
                            {' '}
                            {!showLoto ? 'Xem bảng loto' : 'X'}
                        </span>
                    </div>
                </div>
                {showLoto && (
                    <div
                        className={styles.xsmbTableFooterLotoTable}
                        style={{ marginTop: '10px' }}
                    >
                        <LotoMbTable dataXoso={props.dataXoso} />
                    </div>
                )}
            </div>
            <div className={styles.xsmbTableOption}>
                {/* <div className={styles.xsmbTableOptionShare}>
                    <button>
                        <img
                            src="/images/icon_share.gif"
                            alt="xosoaladin.com"
                        />
                        Chia sẻ
                    </button>
                </div> */}
                <div className={styles.xsmbTableOptionZoom}>
                    <button onClick={() => setIsZoom(true)}>
                        <img src="/images/icon_zoom.gif" alt="xosoaladin.com" />
                        Phóng to
                    </button>
                </div>
            </div>
        </div>
    )
}

export default XosoTinhTable
