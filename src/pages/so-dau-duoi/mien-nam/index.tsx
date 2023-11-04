import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import reverseDate from '@/helpers/reverseDate'
import IDataXoso from '@/Interfaces/IDataXoso'
import IDataXosoMore from '@/Interfaces/IDataXosoMore'
import { closeLoading, openLoading } from '@/redux/action/loading'
import { getKqxsMb, getKqxsmn, getSeoByLink } from '@/services/api'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import styles from '@/styles/pages/SoDauDuoi/MienNam/index.module.scss'
import Head from 'next/head'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'
import parse from 'html-react-parser'

const SoDauDuoiMienNam = ({ tags }: { tags: any }) => {
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
                        const returnResult = await getKqxsmn(item)
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
                        const returnResult = await getKqxsmn(item)
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
                    href="https://xosoaladin.com/so-dau-duoi/mien-nam"
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.mienNam}>
                <h2 className={styles.title}>Sớ đầu đuôi miền Nam</h2>
                <div className={styles.content} style={{ marginTop: '15px' }}>
                    {dataXosoMore.map((item, index) => {
                        return (
                            <table style={{ width: '100%' }}>
                                <td
                                    width={'25%'}
                                    style={{
                                        textAlign: 'center',
                                        color: 'gray',
                                        fontSize: '13px',
                                    }}
                                >
                                    {replaceDashFromDate(item.date)}
                                </td>
                                {item.resultObj?.map((xs) => (
                                    <td style={{ textAlign: 'center' }}>
                                        <p
                                            style={{
                                                color: 'gray',
                                                fontSize: '13px',
                                            }}
                                        >
                                            {xs.provinceName}
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    color: '#000066',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                {
                                                    xs.listXSTT?.filter(
                                                        (result) =>
                                                            result.prizeId == 9
                                                    )?.[0]?.loto
                                                }
                                            </span>{' '}
                                            -{' '}
                                            <span
                                                style={{
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                {
                                                    xs.listXSTT?.filter(
                                                        (result) =>
                                                            result.prizeId == 1
                                                    )?.[0]?.loto
                                                }
                                            </span>
                                        </p>
                                    </td>
                                ))}
                            </table>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default SoDauDuoiMienNam

export async function getServerSideProps() {
    const params: any = {
        link: '/so-dau-duoi/mien-nam',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
