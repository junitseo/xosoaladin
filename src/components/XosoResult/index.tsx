import styles from '@/styles/Components/XosoResult/index.module.scss'
import { NextPage } from 'next/types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import React, { SyntheticEvent, useState } from 'react'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import compareDate from '@/helpers/compareDate'
import getProvincesXsMn from '@/helpers/getProvincesXsMn'
import getProvincesXsmt from '@/helpers/getProvincesXsmt'
import reverseDate from '@/helpers/reverseDate'
import { provinces } from '@/mocks/provinces'
import { provincesSlug } from '@/mocks/provincesSlug'

const XosoLiveResult: NextPage = () => {
    const [date, setDate] = useState<Date>(new Date())
    const dateDisplay: string = addingZeroToMonth(date, '/')

    const handleClickNextDate = (e: SyntheticEvent): void => {
        if (compareDate(new Date(date.getDate() + 1), date)) {
        } else {
            setDate(new Date(new Date().setDate(date.getDate() + 1)))
        }
    }

    const handleClickPrevDate = (e: SyntheticEvent): void => {
        setDate(new Date(new Date().setDate(date.getDate() - 1)))
    }

    return (
        <div className={styles.xosoLive}>
            <div className={styles.xosoLiveHeader}>
                <FaChevronLeft
                    onClick={handleClickPrevDate}
                    style={{ cursor: 'pointer' }}
                />
                <h3 className={styles.xosoLiveHeaderTitle}>
                    KẾT QUẢ XỔ SỐ NGÀY {dateDisplay}
                </h3>
                <FaChevronRight
                    onClick={handleClickNextDate}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className={styles.xosoLiveContent}>
                <div className={styles.xosoLiveContentSub}>
                    <Link href="#" style={{ fontWeight: 'bold' }}>
                        Kết quả xổ số miền Bắc
                    </Link>
                    <ul>
                        <li>
                            <Link
                                href={`/kqxs/${
                                    provincesSlug[1]
                                }?date=${addingZeroToMonth(date)}`}
                            >
                                <span>Kết quả xổ số miền Bắc</span>
                            </Link>
                            <img
                                width={'17px'}
                                height={'17px'}
                                src="/images/load.png"
                                alt="xosoaladin.com"
                            />
                        </li>
                    </ul>
                </div>
                <div className={styles.xosoLiveContentSub}>
                    <Link href="#" style={{ fontWeight: 'bold' }}>
                        Kết quả xổ số miền Trung
                    </Link>
                    <ul>
                        {getProvincesXsmt(
                            reverseDate(addingZeroToMonth(date))
                        ).map((item: number) => {
                            return (
                                <li key={item}>
                                    <Link
                                        href={`/kqxs/${
                                            provincesSlug[item]
                                        }?date=${addingZeroToMonth(date)}`}
                                    >
                                        <span>
                                            Kết quả xổ số {provinces[item]}
                                        </span>
                                    </Link>
                                    <img
                                        width={'17px'}
                                        height={'17px'}
                                        src="/images/load.png"
                                        alt="xosoaladin.com"
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={styles.xosoLiveContentSub}>
                    <Link href="#" style={{ fontWeight: 'bold' }}>
                        Kết quả xổ số miền Nam
                    </Link>
                    <ul>
                        {getProvincesXsMn(
                            reverseDate(addingZeroToMonth(date))
                        ).map((item: number) => {
                            return (
                                <li key={item}>
                                    <Link
                                        href={`/kqxs/${
                                            provincesSlug[item]
                                        }?date=${addingZeroToMonth(date)}`}
                                    >
                                        <span>
                                            Kết quả xổ số {provinces[item]}
                                        </span>
                                    </Link>
                                    <img
                                        width={'17px'}
                                        height={'17px'}
                                        src="/images/load.png"
                                        alt="xosoaladin.com"
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <p className={styles.xosoLiveContentSub}>
                    <Link href="#" style={{ fontWeight: 'bold' }}>
                        Kết quả xổ số Vietlott
                    </Link>
                </p>
                <ul>
                    <li className={styles.xosoLiveContentSmallTitle}>
                        <Link
                            href={`/kqxs/dien-toan/power655?date=${addingZeroToMonth(
                                date
                            )}`}
                        >
                            Kết quả xổ số Power 6/55
                        </Link>
                        <img src="/images/new.png" alt="xosoaladin.com" />
                    </li>
                    <li className={styles.xosoLiveContentSmallTitle}>
                        <Link
                            href={`/kqxs/dien-toan/mega645?date=${addingZeroToMonth(
                                date
                            )}`}
                        >
                            Kết quả xổ số Mega 6/45
                        </Link>
                        <img src="/images/new.png" alt="xosoaladin.com" />
                    </li>
                    <li className={styles.xosoLiveContentSmallTitle}>
                        <Link
                            href={`/kqxs/dien-toan/max3d?date=${addingZeroToMonth(
                                date
                            )}`}
                        >
                            Kết quả xổ số Max 3D
                        </Link>
                        <img src="/images/new.png" alt="xosoaladin.com" />
                    </li>
                    <li className={styles.xosoLiveContentSmallTitle}>
                        <Link
                            href={`/kqxs/dien-toan/max3dpro?date=${addingZeroToMonth(
                                date
                            )}`}
                        >
                            Kết quả xổ số Max 3D Pro
                        </Link>
                        <img src="/images/new.png" alt="xosoaladin.com" />
                    </li>
                </ul>
            </div>
            <div className={styles.xosoLiveFooter}>
                <p>
                    <span>
                        <img
                            style={{ verticalAlign: '-2px' }}
                            src="/images/load.png"
                            alt="xosoaladin.com"
                        />{' '}
                        Chờ
                    </span>{' '}
                    <span>
                        <img
                            style={{ verticalAlign: '-2px' }}
                            src="/images/loading.gif"
                            alt="xosoaladin.com"
                        />{' '}
                        Đang xổ
                    </span>{' '}
                    <span>
                        <img
                            style={{ verticalAlign: '-2px' }}
                            src="/images/new.png"
                            alt="xosoaladin.com"
                        />{' '}
                        Mới
                    </span>
                </p>
            </div>
        </div>
    )
}

export default XosoLiveResult
