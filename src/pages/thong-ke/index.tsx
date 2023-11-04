import { NextPage } from 'next/types'
import styles from '@/styles/pages/Statistic/index.module.scss'
import Link from 'next/link'
import { FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import reverseDate from '@/helpers/reverseDate'
import IPostStatisticData from '@/Interfaces/IPostStatisticData'
import { getStatistic } from '@/services/api'
import IXosoResult from '@/Interfaces/IXosoResult'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { openLoading, closeLoading } from '@/redux/action/loading'
import StatisticLayout from '@/layouts/StatisticLayout'
import Loading from '@/components/Loading'
import Head from 'next/head'

const Statistic: NextPage = () => {
    const dispatch: Dispatch = useDispatch()
    const [introduceBox, setIntroduceBox] = useState<boolean>(false)
    const [numberOfDate, setNumberOfDate] = useState<string>('30')
    const [lastDate, setLastDate] = useState<string>(
        addingZeroToMonth(new Date())
    )
    const [coupleOfNumber, setCoupleOfNumber] = useState<string>('')
    const [option, setOption] = useState<string>('lt')
    const [groupBy, setGroupBy] = useState<string>('0-99')
    const [statistic, setStatistic] = useState<IXosoResult[][]>([])
    const [arrayOfDate, setArrayOfDate] = useState<string[]>([])
    const [maxAppear, setMaxAppear] = useState<number>(0)
    const arrayOfNumberApper: string[] = []

    const handleSetNumberOfDate = (value: string): void => {
        setNumberOfDate(value)
    }

    const handleSetCoupleOfNumber = (value: string): void => {
        setCoupleOfNumber(value)
    }

    const filterFunction = async () => {
        const postData: IPostStatisticData = {
            numberOfDate: numberOfDate,
            lastDate: lastDate,
            coupleOfNumber: coupleOfNumber,
            option: option,
            groupBy: groupBy,
        }
        try {
            dispatch(openLoading())
            const result = await getStatistic(postData)
            if (result) {
                setStatistic(result.data.statistic)
                setArrayOfDate(result.data.arrayDate)
            }
            let maxLength = 0
            result.data?.statistic?.map((item: IXosoResult[]) => {
                if (item.length > maxLength) {
                    maxLength = item.length
                }
            })
            setMaxAppear(maxLength)
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        } finally {
            dispatch(closeLoading())
        }
    }
    useEffect(() => {
        filterFunction()
    }, [])
    const loading: boolean = useSelector(
        (state: { loading: boolean }) => state.loading
    )
    return (
        <>
            <Head>
                <link rel="canonical" href="https://xosoaladin.com/thong-ke" />
            </Head>
            <div className={styles.statistic}>
                {loading && <Loading />}
                {introduceBox && (
                    <div className={styles.statisticIntroduce}>
                        <div className={styles.statisticIntroduceHeader}>
                            <p>Hướng dẫn</p>
                            <div
                                className={styles.statisticIntroduceHeaderClose}
                            >
                                <FaTimes
                                    onClick={() => setIntroduceBox(false)}
                                    style={{
                                        cursor: 'pointer',
                                        verticalAlign: '-1px',
                                    }}
                                    size={15}
                                />
                            </div>
                        </div>
                        <div className={styles.statisticIntroduceContent}>
                            <p className={styles.statisticIntroduceContentNote}>
                                Chú thích:
                            </p>
                            <div
                                className={styles.statisticIntroduceContentBox}
                            >
                                <p>
                                    <span></span> Ngày chưa về
                                </p>
                                <p>
                                    <span>1</span> Ngày về 1 nháy
                                </p>
                                <p>
                                    <span>1</span> Ngày về giải đặc biệt
                                </p>
                                <p>
                                    <span>2</span> Ngày về 2 nháy
                                </p>
                                <p>
                                    <span>3</span> Ngày về 3 nháy
                                </p>
                                <p>
                                    <span>4</span> Ngày về 4 nháy
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.statisticFilter}>
                    <div className={styles.statisticFilterNumberOfDate}>
                        <span>Số ngày: </span>
                        <input
                            value={numberOfDate}
                            onChange={(e) =>
                                handleSetNumberOfDate(e.target.value)
                            }
                            type={'text'}
                        />
                    </div>
                    <div className={styles.statisticFilterLastDate}>
                        <span>Ngày cuối: </span>
                        <input
                            value={reverseDate(lastDate)}
                            onChange={(e) =>
                                setLastDate(reverseDate(e.target.value))
                            }
                            type={'date'}
                        />
                    </div>
                    <div className={styles.statisticFilterCoupleNumber}>
                        <span>Cặp số: </span>
                        <input
                            value={coupleOfNumber}
                            onChange={(e) =>
                                handleSetCoupleOfNumber(e.target.value)
                            }
                            type={'text'}
                        />
                    </div>
                    <div className={styles.statisticFilterGroupBy}>
                        <span>Xếp theo: </span>
                        <select
                            value={groupBy}
                            onChange={(e) => setGroupBy(e.target.value)}
                        >
                            <option value={'0-99'}>00 -{'>'} 99</option>
                            <option value={'number-of-time'}>Số lần về</option>
                        </select>
                    </div>
                    <div className={styles.statisticFilterOption}>
                        <input
                            checked={option == 'lt'}
                            onChange={() => setOption('lt')}
                            type={'radio'}
                            style={{ marginLeft: '5px', verticalAlign: '-2px' }}
                        />
                        <span style={{ marginLeft: '3px' }}>LT</span>
                        <input
                            checked={option == 'db'}
                            onChange={() => setOption('db')}
                            type={'radio'}
                            style={{ marginLeft: '5px', verticalAlign: '-2px' }}
                        />
                        <span style={{ marginLeft: '3px' }}>ĐB</span>
                    </div>
                    <div className={styles.statisticFilterButton}>
                        <button onClick={() => filterFunction()}>
                            Thống kê
                        </button>
                    </div>
                    <div className={styles.statisticFilterRedirect}>
                        <span onClick={() => setIntroduceBox(true)}>
                            Hướng dẫn
                        </span>
                        <Link href={'/'}>
                            <span>Trang chủ</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.statisticTable}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <p>
                                        Số lần về
                                        <br />
                                        Max = {maxAppear}
                                    </p>
                                </td>
                                {statistic.map((item, index) => {
                                    return (
                                        <td
                                            style={{ verticalAlign: 'bottom' }}
                                            key={index}
                                        >
                                            <div
                                                style={{
                                                    height: `${
                                                        (item.length /
                                                            maxAppear +
                                                            1) *
                                                        30
                                                    }px`,
                                                    backgroundColor: '#0163bc',
                                                }}
                                            >
                                                <span>{item.length}</span>
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr>
                                <td></td>
                                {statistic.map((item, index) => {
                                    return (
                                        <td key={index}>
                                            {item[0]?.loto
                                                ? item[0]?.loto
                                                : index < 10
                                                ? `0${index}`
                                                : `${index}`}
                                        </td>
                                    )
                                })}
                            </tr>
                            {arrayOfDate.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <p>{item}</p>
                                        </td>
                                        {statistic.map((xs, index2) => {
                                            let appearTime = 0
                                            let backgroundColor = ''
                                            let isSpecial = false
                                            xs.map((each) => {
                                                if (each.dayPrize == item) {
                                                    arrayOfNumberApper.push(
                                                        each.loto
                                                    )
                                                    appearTime++
                                                    if (each.prizeId == 1) {
                                                        isSpecial = true
                                                    }
                                                }
                                            })
                                            if (appearTime == 1 && isSpecial) {
                                                backgroundColor = '#FF453C'
                                            } else if (appearTime == 1) {
                                                backgroundColor = '#5B5C66'
                                            } else if (appearTime == 2) {
                                                backgroundColor = '#7658CF'
                                            } else if (appearTime == 3) {
                                                backgroundColor = '#C515DD'
                                            } else if (appearTime == 4) {
                                                backgroundColor = '#FF06A8'
                                            } else if (
                                                !arrayOfNumberApper.includes(
                                                    xs[0]?.loto
                                                )
                                            ) {
                                                backgroundColor = '#77A3E3'
                                            }
                                            return (
                                                <td
                                                    key={index2}
                                                    style={{
                                                        backgroundColor:
                                                            backgroundColor,
                                                    }}
                                                >
                                                    {appearTime != 0
                                                        ? appearTime
                                                        : ''}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

//@ts-ignore
Statistic.getLayout = (page) => {
    return <StatisticLayout>{page}</StatisticLayout>
}

export default Statistic
