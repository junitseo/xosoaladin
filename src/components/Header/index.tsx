import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import getProvincesXsMn from '@/helpers/getProvincesXsMn'
import getProvincesXsmt from '@/helpers/getProvincesXsmt'
import reverseDate from '@/helpers/reverseDate'
import styles from '@/styles/Components/Header/index.module.scss'
import { useEffect, useState } from 'react'
import { provinces } from '@/mocks/provinces'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import keyH1 from '@/mocks/keyH1'

const Header = () => {
    const [date, setDate] = useState(reverseDate(addingZeroToMonth(new Date())))
    const [provinceId, setProvinceId] = useState([1])
    const [selectedProvince, setSelectedProvince] = useState(1)
    const [lottery, setLottery] = useState('')
    const router = useRouter()
    const handleSetDate = (value: string) => {
        setDate(value)
        const provinceMn = getProvincesXsMn(value)
        const provinceMt = getProvincesXsmt(value)
        setProvinceId([1, ...provinceMn, ...provinceMt])
    }

    useEffect(() => {
        const provinceMn = getProvincesXsMn(date)
        const provinceMt = getProvincesXsmt(date)
        setProvinceId([1, ...provinceMn, ...provinceMt])
    }, [])

    const handleCheckLottery = () => {
        router.push(
            `/do-ve-so?province=${selectedProvince}&date=${date}&lottery=${lottery}`
        )
    }

    return (
        <div className={styles.header}>
            {keyH1[router.pathname] && (
                <h1 className={styles.headerTitle}>
                    {keyH1[router.pathname]}
                    <a href="https://xosoaladin.com"> - www.xosoaladin.com</a>
                </h1>
            )}
            <div className={styles.headerBanner}>
                <div className={styles.headerBannerLogo}>
                    <Link href={'https://xosoaladin.com'}>
                        <img src="/images/logo.webp" alt="xosoaladin.com" />
                    </Link>
                </div>
                <div className={styles.headerBannerTitle}>
                    <p>CHUYÊN TRANG KẾT QUẢ XỔ SỐ KIẾN THIẾT</p>
                    <p>XỔ SỐ ALADIN</p>
                </div>
                <div className={styles.headerBannerSearch}>
                    <div className={styles.headerBannerSearchBox}>
                        <div className={styles.headerBannerSearchBoxHeader}>
                            <p>Dò vé số online - May mắn mỗi ngày!...</p>
                        </div>
                        <div className={styles.headerBannerSearchBoxContent}>
                            <div
                                className={
                                    styles.headerBannerSearchBoxContentRow
                                }
                            >
                                <div
                                    style={{ color: 'black' }}
                                    className={
                                        styles.headerBannerSearchBoxContentInputDate
                                    }
                                >
                                    Ngày:{' '}
                                    <input
                                        style={{
                                            color: 'black',
                                            backgroundColor: 'white',
                                            fontSize: '11px',
                                        }}
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
                                        styles.headerBannerSearchBoxContentInputProvince
                                    }
                                >
                                    Tỉnh:{' '}
                                    <select
                                        style={{
                                            backgroundColor: 'white',
                                            color: 'black',
                                            fontSize: '11px',
                                        }}
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
                            <div
                                className={
                                    styles.headerBannerSearchBoxContentRow
                                }
                            >
                                <div
                                    style={{ color: 'black' }}
                                    className={
                                        styles.headerBannerSearchBoxContentInputNumber
                                    }
                                >
                                    Vé số:{' '}
                                    <input
                                        style={{
                                            backgroundColor: 'white',
                                            color: 'black',
                                            fontSize: '11px',
                                        }}
                                        type={'text'}
                                        value={lottery}
                                        onChange={(e) =>
                                            setLottery(e.target.value)
                                        }
                                    />
                                </div>
                                <div
                                    className={
                                        styles.headerBannerSearchBoxContentButton
                                    }
                                >
                                    <button
                                        onClick={() => handleCheckLottery()}
                                    >
                                        Dò kết quả
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                {keyH1[`${router.pathname}`] !== 'none' &&
                    keyH1[`${router.pathname}`] && (
                        <h1 style={{ fontSize: '12px', marginTop: '15px' }}>
                            {keyH1[`${router.pathname}`] ||
                                'kqxs, ket qua xo so, ketquaxoso, kết quả xổ số, xổ số ALADIN'}
                        </h1>
                    )}
            </div> */}
        </div>
    )
}

export default Header

export async function getServerSideProps(ctx: GetServerSideProps) {
    try {
        console.log(ctx)
    } catch (error) {}
}
