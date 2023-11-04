import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import getProvincesXsMn from '@/helpers/getProvincesXsMn'
import getProvincesXsmt from '@/helpers/getProvincesXsmt'
import reverseDate from '@/helpers/reverseDate'
import { provinces } from '@/mocks/provinces'
import styles from '@/styles/pages/Doveso/index.module.scss'
import { GetServerSidePropsContext } from 'next/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { checkKqxs, getSeoByLink } from '@/services/api'
import IDataXoso from '@/Interfaces/IDataXoso'
import IXosoResult from '@/Interfaces/IXosoResult'
import { prize } from '@/mocks/prize'
import Head from 'next/head'
import parse from 'html-react-parser'

const CheckLottery = ({
    kqxs,
    province,
    dateXoso,
    number,
    tags,
}: {
    kqxs: IXosoResult
    province: string
    dateXoso: string
    number: string
    tags: any
}) => {
    const [date, setDate] = useState(reverseDate(addingZeroToMonth(new Date())))
    const [provinceId, setProvinceId] = useState([1])
    const [selectedProvince, setSelectedProvince] = useState(1)
    const [lottery, setLottery] = useState('')

    const router = useRouter()

    const handleSetDate = (value: string) => {
        setDate(() => value)
        const provinceMn = getProvincesXsMn(value)
        const provinceMt = getProvincesXsmt(value)
        setProvinceId(() => [1, ...provinceMn, ...provinceMt])
    }

    const handleCheckLottery = () => {
        router.push(
            `/do-ve-so?province=${selectedProvince}&date=${date}&lottery=${lottery}`
        )
    }

    useEffect(() => {
        const provinceMn = getProvincesXsMn(date)
        const provinceMt = getProvincesXsmt(date)
        setProvinceId([1, ...provinceMn, ...provinceMt])
    }, [])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={`https://xosoaladin.com/do-ve-so`}
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.checkLottery}>
                <div className={styles.checkLotterySearchBox}>
                    <div className={styles.checkLotterySearchBoxHeader}>
                        <p>Dò vé số online - May mắn mỗi ngày!...</p>
                    </div>
                    <div className={styles.checkLotterySearchBoxContent}>
                        <div className={styles.checkLotterySearchBoxContentRow}>
                            <div
                                style={{ color: 'black' }}
                                className={
                                    styles.checkLotterySearchBoxContentInputDate
                                }
                            >
                                Ngày:{' '}
                                <input
                                    style={{ backgroundColor: 'white' }}
                                    onChange={(e) =>
                                        handleSetDate(e.target.value)
                                    }
                                    value={date}
                                    type={'date'}
                                />
                            </div>
                            <div
                                style={{ color: 'black' }}
                                className={
                                    styles.checkLotterySearchBoxContentInputProvince
                                }
                            >
                                Tỉnh:{' '}
                                <select
                                    style={{ backgroundColor: 'white' }}
                                    onChange={(e) =>
                                        setSelectedProvince(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    <option value={1}>Miền Bắc</option>
                                    {provinceId.map((item, index) => (
                                        <option key={index} value={item}>
                                            {provinces[item]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.checkLotterySearchBoxContentRow}>
                            <div
                                style={{ color: 'black' }}
                                className={
                                    styles.checkLotterySearchBoxContentInputNumber
                                }
                            >
                                Vé số:{' '}
                                <input
                                    style={{ backgroundColor: 'white' }}
                                    type={'text'}
                                    value={lottery}
                                    onChange={(e) => setLottery(e.target.value)}
                                />
                            </div>
                            <div
                                className={
                                    styles.checkLotterySearchBoxContentButton
                                }
                            >
                                <button onClick={() => handleCheckLottery()}>
                                    Dò kết quả
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.checkLotteryResult}>
                    <div className={styles.checkLotteryResultHeader}>
                        <p>
                            Kết quả dò vé số {provinces[Number(province)]} -
                            ngày {reverseDate(dateXoso)}
                        </p>
                    </div>
                    <div className={styles.checkLotteryResultContent}>
                        <div className={styles.checkLotteryResultContentBox}>
                            <p>
                                Bạn đã truy vấn dò kết quả vé số{' '}
                                <strong>{provinces[Number(province)]}</strong>
                            </p>
                            <p>
                                Loại vé <strong>6</strong> chữ số mệnh giá{' '}
                                <strong>10,000 đ</strong>, mở thưởng ngày{' '}
                                <strong>{reverseDate(date)}</strong>
                            </p>
                            <p>
                                Dãy số của bạn là: <strong>{number}</strong>
                            </p>
                        </div>
                        {!kqxs?.number && province != '0' && (
                            <div
                                className={
                                    styles.checkLotteryResultAnimateFailed
                                }
                            >
                                <div
                                    className={
                                        styles.checkLotteryResultAnimateFailedImg
                                    }
                                >
                                    <img
                                        src="/images/137.gif"
                                        alt="xosoaladin.com"
                                    />
                                </div>
                                <div
                                    className={
                                        styles.checkLotteryResultAnimateFailedContent
                                    }
                                >
                                    <p>
                                        Rất tiếc vé số của bạn không trúng giải
                                        !
                                    </p>
                                    <p>Chúc bạn may mắn lần sau!...</p>
                                </div>
                            </div>
                        )}

                        {kqxs?.number && (
                            <div
                                className={
                                    styles.checkLotteryResultAnimateSuccess
                                }
                            >
                                <div
                                    className={
                                        styles.checkLotteryResultAnimateSuccessImg
                                    }
                                >
                                    <img
                                        src="/images/thantai.gif"
                                        alt="xosoaladin.com"
                                    />
                                </div>
                                <div
                                    className={
                                        styles.checkLotteryResultAnimateSuccessContent
                                    }
                                >
                                    <p>Chúc mừng bạn !...</p>
                                    <p>
                                        Vé số của bạn đã trúng thưởng giải{' '}
                                        {prize[kqxs.prizeId?.toString()]?.name}
                                    </p>
                                    <p>
                                        Tổng giá trị giải thưởng là:{' '}
                                        {prize[kqxs.prizeId?.toString()]?.prize}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckLottery

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/dien-toan/du-doan',
    }
    const province = context.query?.province
    const date = context.query.date
    const number = context.query.lottery

    const kqxs = await checkKqxs(
        province || '',
        number,
        reverseDate(
            typeof date == 'string' ? date : addingZeroToMonth(new Date())
        )
    )
    const seo = await getSeoByLink(params)
    return {
        props: {
            kqxs: kqxs.data?.kqxs || {},
            province: province || 0,
            dateXoso: date || addingZeroToMonth(new Date()),
            number: number || '',
            tags: seo?.data?.data?.tags || [],
        },
    }
}
