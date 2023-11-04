import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { closeLoading, openLoading } from '@/redux/action/loading'
import IDataXoso from '@/Interfaces/IDataXoso'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import {
    getKqxsMb,
    getKqxsmn,
    getKqxsmt,
    getPostByTaxId,
    getTaxBySlug,
} from '@/services/api'
import XsmnTable from '@/components/XsmnTable'
import XsmbTable from '@/components/XsmbTable'
import compareTime from '@/helpers/compareTime'
import { useRouter } from 'next/router'
import StatisticLayout from '@/layouts/StatisticLayout'
import NavbarIframe from '@/components/NavbarIframe'
import WaitingLoterry from '@/components/WaitingLottery'
import WaitingMbTable from '@/components/WaitingTableMb'
import WaitingMnTable from '@/components/WaitingTableMn'
import getProvincesXsMn from '@/helpers/getProvincesXsMn'
import reverseDate from '@/helpers/reverseDate'
import getProvincesXsmt from '@/helpers/getProvincesXsmt'
import compareDate from '@/helpers/compareDate'

export default function AllIframe() {
    const [dataXosoMn, setDataXosoMn] = useState<IDataXoso>()
    const [dataXosoMb, setDataXosoMb] = useState<IDataXoso>()
    const [dataXosoMt, setDataXosoMt] = useState<IDataXoso>()
    const [priorityProvince, setPriorityProvince] = useState('xsmn')
    const dispatch: Dispatch = useDispatch()
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )

    const [dateXosoMb, setDateXosoMb] = useState<string>(
        compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(10)).setHours(18))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)
    )

    const [dateXosoMn, setDateXosoMn] = useState<string>(
        compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(10)).setHours(16))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)
    )

    const [dateXosoMt, setDateXosoMt] = useState<string>(
        compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(10)).setHours(17))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)
    )

    const getXsmbResultRealTime = async () => {
        try {
            const result = await getKqxsMb(dateXosoMb)
            setDataXosoMb(result.data)
        } catch (error) {
            console.log(error)
        } finally {
        }
    }

    const getXsmnResultRealTime = async () => {
        try {
            const result = await getKqxsmn(dateXosoMn)
            setDataXosoMn(result.data)
        } catch (error) {
            console.log(error)
        } finally {
        }
    }

    const getXsmtResultRealTime = async () => {
        try {
            const result = await getKqxsmt(dateXosoMt)
            setDataXosoMt(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getXsmnResult = async () => {
        try {
            dispatch(openLoading())
            const result = await getKqxsmn(dateXosoMn)
            setDataXosoMn(result.data)
            dispatch(closeLoading())
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        }
    }

    const getXsmbResult = async () => {
        try {
            dispatch(openLoading())
            const result = await getKqxsMb(dateXosoMb)
            setDataXosoMb(result.data)
            dispatch(closeLoading())
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        }
    }

    const getXsmtResult = async () => {
        try {
            dispatch(openLoading())
            const result = await getKqxsmt(dateXosoMt)
            setDataXosoMt(result.data)
            dispatch(closeLoading())
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        }
    }
    const handleChangeDate = (e: any) => {
        console.log(new Date(e.target.value))
        console.log(compareDate(new Date(e.target.value), new Date()))
        if (compareDate(new Date(e.target.value), new Date())) {
            setDateXosoMb(addingZeroToMonth(new Date()))
            setDateXosoMn(addingZeroToMonth(new Date()))
            setDateXosoMt(addingZeroToMonth(new Date()))
            return
        }
        setDateXosoMb(addingZeroToMonth(new Date(e.target.value)))
        setDateXosoMn(addingZeroToMonth(new Date(e.target.value)))
        setDateXosoMt(addingZeroToMonth(new Date(e.target.value)))
    }

    useEffect(() => {
        getXsmnResult()
        getXsmbResult()
        getXsmtResult()
    }, [dateXosoMb, dateXosoMn, dateXosoMt])

    useEffect(() => {
        const getKqxsRealTime = setInterval(() => {
            if (dateXosoMb == addingZeroToMonth(new Date())) {
                if (
                    new Date().getHours() == 18 &&
                    new Date().getMinutes() > 10 &&
                    new Date().getMinutes() < 45
                ) {
                    getXsmbResultRealTime()
                }
            }
            if (dateXosoMn == addingZeroToMonth(new Date())) {
                if (
                    new Date().getHours() == 16 &&
                    new Date().getMinutes() > 10 &&
                    new Date().getMinutes() < 45
                ) {
                    getXsmnResultRealTime()
                }
            }
            if (dateXosoMt == addingZeroToMonth(new Date())) {
                if (
                    new Date().getHours() == 17 &&
                    new Date().getMinutes() > 10 &&
                    new Date().getMinutes() < 45
                ) {
                    getXsmtResultRealTime()
                }
            }
        }, 3000)
        return () => {
            clearInterval(getKqxsRealTime)
        }
    }, [])

    const xosoTable = [
        {
            element: (
                <div
                    style={{ marginTop: '20px' }}
                    className={styles.homepageXsmn}
                >
                    {dataXosoMn?.resultObj?.length != 0 && (
                        <div>
                            {compareTime(
                                new Date(
                                    new Date(
                                        new Date().setMinutes(14)
                                    ).setHours(16)
                                ),
                                new Date()
                            ) && (
                                <WaitingLoterry
                                    region="Miền Nam"
                                    time="16h14"
                                />
                            )}
                            {compareTime(
                                new Date(),
                                new Date(
                                    new Date(
                                        new Date().setMinutes(30)
                                    ).setHours(15)
                                )
                            ) &&
                                compareTime(
                                    new Date(
                                        new Date(
                                            new Date().setMinutes(10)
                                        ).setHours(16)
                                    ),
                                    new Date()
                                ) && (
                                    <WaitingMnTable
                                        regionName="Miền Nam"
                                        listProvince={getProvincesXsMn(
                                            reverseDate(
                                                addingZeroToMonth(new Date())
                                            )
                                        )}
                                        date={addingZeroToMonth(new Date())}
                                    />
                                )}
                            <XsmnTable
                                regionName="Miền Nam"
                                dataXoso={dataXosoMn}
                                date={dateXosoMn}
                                isHideZoom
                            />
                        </div>
                    )}
                </div>
            ),
            key: 'xsmn',
        },
        {
            element: (
                <div
                    className={styles.homepageXsmb}
                    style={{ marginTop: '20px' }}
                >
                    {dataXosoMb?.resultObj?.length != 0 && (
                        <div>
                            {compareTime(
                                new Date(
                                    new Date(
                                        new Date().setMinutes(14)
                                    ).setHours(18)
                                ),
                                new Date()
                            ) && (
                                <WaitingLoterry
                                    region="Miền Bắc"
                                    time="18h14"
                                />
                            )}
                            {compareTime(
                                new Date(),
                                new Date(
                                    new Date(
                                        new Date().setMinutes(30)
                                    ).setHours(17)
                                )
                            ) &&
                                compareTime(
                                    new Date(
                                        new Date(
                                            new Date().setMinutes(10)
                                        ).setHours(18)
                                    ),
                                    new Date()
                                ) && (
                                    <WaitingMbTable
                                        regionName="Miền Bắc"
                                        listProvince={[]}
                                        date={addingZeroToMonth(new Date())}
                                    />
                                )}
                            <XsmbTable
                                regionName="Miền Bắc"
                                dataXoso={dataXosoMb}
                                date={dateXosoMb}
                                isHideZoom
                            />
                        </div>
                    )}
                </div>
            ),
            key: 'xsmb',
        },
        {
            element: (
                <div
                    className={styles.homepageXsmt}
                    style={{ marginTop: '20px' }}
                >
                    {dataXosoMt?.resultObj?.length != 0 && (
                        <div>
                            {compareTime(
                                new Date(
                                    new Date(
                                        new Date().setMinutes(14)
                                    ).setHours(17)
                                ),
                                new Date()
                            ) && (
                                <WaitingLoterry
                                    region="Miền Trung"
                                    time="17h14"
                                />
                            )}
                            {compareTime(
                                new Date(),
                                new Date(
                                    new Date(
                                        new Date().setMinutes(30)
                                    ).setHours(16)
                                )
                            ) &&
                                compareTime(
                                    new Date(
                                        new Date(
                                            new Date().setMinutes(10)
                                        ).setHours(17)
                                    ),
                                    new Date()
                                ) && (
                                    <WaitingMnTable
                                        regionName="Miền Trung"
                                        listProvince={getProvincesXsmt(
                                            reverseDate(
                                                addingZeroToMonth(new Date())
                                            )
                                        )}
                                        date={addingZeroToMonth(new Date())}
                                        haveLock
                                    />
                                )}
                            <XsmnTable
                                regionName="Miền Trung"
                                dataXoso={dataXosoMt}
                                date={dateXosoMt}
                                isHideZoom
                            />
                        </div>
                    )}
                </div>
            ),
            key: 'xsmt',
        },
    ]

    const getPriority = () => {
        return xosoTable.find((item) => item.key == priorityProvince)
    }

    return (
        <>
            <div className={styles.homepageWrapper}>
                <div style={{ textAlign: 'center', marginTop: '20px' }}></div>
                <div className="header-banner-title">
                    <p>CHUYÊN TRANG KẾT QUẢ XỔ SỐ KIẾN THIẾT</p>
                </div>
                <div
                    style={{ margin: '10px 0px', textAlign: 'center' }}
                    className={styles.chooseDate}
                >
                    Chọn ngày xổ số:{' '}
                    <input type="date" onChange={handleChangeDate} />
                </div>
                <div
                    className={styles.choosePriority}
                    style={{ textAlign: 'center', margin: '10px 0px' }}
                >
                    <div>
                        Chọn miền ưu tiên:{' '}
                        <input
                            checked={priorityProvince === 'xsmb'}
                            onChange={() => setPriorityProvince('xsmb')}
                            type="radio"
                            style={{ marginLeft: '10px' }}
                        />
                        <span style={{ marginLeft: '5px' }}>Miền Bắc</span>
                        <input
                            type="radio"
                            checked={priorityProvince === 'xsmn'}
                            onChange={() => setPriorityProvince('xsmn')}
                            style={{ marginLeft: '10px' }}
                        />
                        <span style={{ marginLeft: '5px' }}>Miền Nam</span>
                        <input
                            checked={priorityProvince === 'xsmt'}
                            onChange={() => setPriorityProvince('xsmt')}
                            type="radio"
                            style={{ marginLeft: '10px' }}
                        />
                        <span style={{ marginLeft: '5px' }}>Miền Trung</span>
                    </div>
                </div>
                <div className={styles.homepage}>
                    {getPriority()?.element}
                    {xosoTable
                        .filter((item) => item.key != getPriority()?.key)
                        .map((item) => {
                            return item.element
                        })}
                </div>
                <div className="footer-center">
                    <div className="footer-center-title">
                        Liên hệ: stephen@taipei101.net |{' '}
                        <a target="_parent" href="https://xosoaladin.com">
                            www.xosoaladin.com
                        </a>
                    </div>
                    <div className="footer-center-title-center">
                        Xem trên Google Tìm Kiếm | Chỉ đường đến XỔ SỐ ALADIN
                    </div>
                    <div className="footer-center-title-bottom">
                        Copyright © 2006 - 2022 Xổ số ALADIN ™ All right
                        Reserved
                    </div>
                </div>
            </div>
        </>
    )
}

//@ts-ignore
AllIframe.getLayout = (page) => {
    return <StatisticLayout>{page}</StatisticLayout>
}
