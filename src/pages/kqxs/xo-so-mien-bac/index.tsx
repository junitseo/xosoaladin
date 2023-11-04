import styles from '@/styles/pages/kqxs/xo-so-mien-trung/index.module.scss'
import { GetServerSidePropsContext } from 'next/types'
import IDataXoso from '@/Interfaces/IDataXoso'
import {
    getAllByHead,
    getAllByTail,
    getAllSpecialPrizeMb,
    getKqxsMb,
    getSeoByLink,
    getTopByRegion,
} from '@/services/api'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import XsmbTable from '@/components/XsmbTable'
import reverseDate from '@/helpers/reverseDate'
import IDataXosoMore from '@/Interfaces/IDataXosoMore'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeLoading, openLoading } from '@/redux/action/loading'
import compareTime from '@/helpers/compareTime'
import WaitingLoterry from '@/components/WaitingLottery'
import compareDateEqual from '@/helpers/compareDateEqual'
import Head from 'next/head'
import parse from 'html-react-parser'

const XosoMienNam = ({
    dataXoso,
    dateXoso,
    haveDate,
    tags,
}: {
    dataXoso: IDataXoso
    dateXoso: string
    haveDate: boolean
    tags: any
}) => {
    const numberOfDateDisplayMore = 10
    const dispatch = useDispatch()
    const [dataXosoMore, setDataXosoMore] = useState<IDataXosoMore[]>([])
    const getXsmbResultMore = async () => {
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
            const arrayOfDate = []
            for (let i = 1; i <= numberOfDateDisplayMore; i++) {
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
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        }
    }
    useEffect(() => {
        getXsmbResultMore()
    }, [])
    return (
        <>
            <Head>
                <meta
                    name="keyword"
                    content="xsmb,sxmb,kqxsmb,xstd,xổ số miền bắc,ket qua xsmb,xo so mien bac,xsmb hom nay,kết quả xổ số miền bắc"
                />
                <link
                    rel="canonical"
                    href={`https://xosoaladin.com/kqxs/xo-so-mien-bac`}
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.xosoMienBac}>
                {compareTime(
                    new Date(new Date(new Date().setMinutes(14)).setHours(18)),
                    new Date()
                ) && <WaitingLoterry region="Miền Bắc" time="18h14" />}
                {dataXoso?.resultObj?.length > 0 && (
                    <XsmbTable
                        regionName="Miền Bắc"
                        dataXoso={dataXoso}
                        date={dateXoso}
                    />
                )}
                {!haveDate &&
                    dataXosoMore.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.xosoMienBacMore}
                                style={{ marginTop: '20px' }}
                            >
                                {item.resultObj?.length > 0 && (
                                    <XsmbTable
                                        regionName="Miền Bắc"
                                        dataXoso={item}
                                        date={
                                            item.resultObj?.[0]?.listXSTT?.[0]
                                                .dayPrize
                                        }
                                    />
                                )}
                            </div>
                        )
                    })}
                <div style={{ marginTop: '15px' }}></div>
            </div>
        </>
    )
}

export default XosoMienNam

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/kqxs/xo-so-mien-bac',
    }
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )
    let haveDate = true
    let dateXoso = compareTime(
        new Date(),
        new Date(new Date(new Date().setTime(45)).setHours(18))
    )
        ? addingZeroToMonth(new Date())
        : addingZeroToMonth(prevDate)
    if (context.query?.date) {
        dateXoso =
            typeof context.query?.date == 'string'
                ? context.query?.date
                : dateXoso
        console.log(reverseDate(dateXoso))
        if (
            compareDateEqual(new Date(reverseDate(dateXoso)), new Date()) &&
            !compareTime(
                new Date(),
                new Date(new Date(new Date().setTime(45)).setHours(18))
            )
        ) {
            dateXoso = addingZeroToMonth(new Date(prevDate))
        }
    } else {
        haveDate = false
    }
    const dataXoso = await getKqxsMb(dateXoso)
    const seo = await getSeoByLink(params)
    return {
        props: {
            dataXoso: dataXoso.data,
            dateXoso: dateXoso,
            haveDate: haveDate,
            tags: seo?.data?.data?.tags || [],
        },
    }
}
