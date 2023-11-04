import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import reverseDate from '@/helpers/reverseDate'
import IDataXoso from '@/Interfaces/IDataXoso'
import IDataXosoMore from '@/Interfaces/IDataXosoMore'
import { closeLoading, openLoading } from '@/redux/action/loading'
import { getKqxsMb, getSeoByLink } from '@/services/api'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import React, { useRouter } from 'next/router'
import styles from '@/styles/pages/SoDauDuoi/MienBac/index.module.scss'
import Head from 'next/head'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'
import parse from 'html-react-parser'

const SoDauDuoiMienbac = ({ tags }: { tags: any }) => {
    const [dataXosoMore, setDataXosoMore] = useState<IDataXosoMore[]>([])
    const [dateXoso, setDateXoso] = useState<string>('')
    const dispatch = useDispatch()
    const numberOfDateDisplayMore = 10
    const getXsmbResultMore = async (date = '') => {
        try {
            dispatch(openLoading())
            let thisDate = ''
            if (new Date().getHours() >= 18 && new Date().getMinutes() >= 0) {
                thisDate = addingZeroToMonth(new Date())
            } else {
                thisDate = addingZeroToMonth(
                    new Date(new Date().setDate(new Date().getDate() - 1))
                )
            }
            if (!date) {
                const arrayOfDate = []
                for (let i = 0; i <= numberOfDateDisplayMore; i++) {
                    const newDate = new Date(
                        new Date(reverseDate(thisDate)).setDate(
                            new Date(reverseDate(thisDate)).getDate() - i
                        )
                    )
                    arrayOfDate.push(addingZeroToMonth(newDate))
                }
                const xosoMore: IDataXosoMore[] = await Promise.all(
                    arrayOfDate.map(async (item) => {
                        const returnResult = await getKqxsMb(item)
                        const dataResult: IDataXoso = returnResult.data
                        const returnObj = {
                            ...dataResult,
                            date: item,
                        }
                        return returnObj
                    })
                )
                setDataXosoMore(xosoMore)
                dispatch(closeLoading())
            } else {
                const arrayOfDate = [date]
                const xosoMore: IDataXosoMore[] = await Promise.all(
                    arrayOfDate.map(async (item) => {
                        const returnResult = await getKqxsMb(item)
                        const dataResult: IDataXoso = returnResult.data
                        const returnObj = {
                            ...dataResult,
                            date: item,
                        }
                        return returnObj
                    })
                )
                setDataXosoMore(xosoMore)
                dispatch(closeLoading())
            }
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        }
    }
    const router = useRouter()
    useEffect(() => {
        if (router.query?.date) {
            //@ts-ignore
            setDateXoso(router.query?.date)
        }
        //@ts-ignore
        getXsmbResultMore(router.query?.date)
    }, [router.query])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/so-dau-duoi/mien-bac"
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.mienBac}>
                <h2 className={styles.title}>Sớ đầu đuôi miền Bắc</h2>
                <div className={styles.mienBacContent}>
                    <table
                        style={{
                            width: '70%',
                            margin: '0 auto',
                            marginTop: '20px',
                        }}
                    >
                        <thead></thead>
                        <tbody>
                            <tr className={styles.tableTitle}>
                                <td width={'70%'}>Giải Bảy</td>
                                <td width={'30%'}>Đặc Biệt</td>
                            </tr>
                        </tbody>
                    </table>
                    {dataXosoMore.map((item, index) => {
                        return (
                            <>
                                <p
                                    style={{
                                        marginTop: '15px',
                                        marginBottom: '0px',
                                        fontSize: '14px',
                                    }}
                                >
                                    {replaceDashFromDate(item.date)}
                                </p>
                                <table
                                    style={{ width: '70%', margin: '0 auto' }}
                                >
                                    <thead></thead>
                                    <tbody style={{ width: '70%' }}>
                                        <tr className={styles.tableContent}>
                                            <td width={'70%'}>
                                                {item.resultObj?.map((item) =>
                                                    item?.listXSTT
                                                        .filter(
                                                            (xs) =>
                                                                xs.prizeId == 8
                                                        )
                                                        .map(
                                                            (result) =>
                                                                result.number
                                                        )
                                                        .toString()
                                                )}
                                            </td>
                                            <td
                                                style={{ color: 'red' }}
                                                width={'30%'}
                                            >
                                                {item.resultObj?.map((item) =>
                                                    item?.listXSTT
                                                        .filter(
                                                            (xs) =>
                                                                xs.prizeId == 1
                                                        )
                                                        .map(
                                                            (result) =>
                                                                result.number
                                                        )
                                                        .toString()
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default SoDauDuoiMienbac

export async function getServerSideProps() {
    const params: any = {
        link: '/so-dau-duoi/mien-bac',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
