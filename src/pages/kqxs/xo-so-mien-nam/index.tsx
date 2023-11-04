import styles from '@/styles/pages/kqxs/xo-so-mien-nam/index.module.scss'
import { GetServerSidePropsContext } from 'next/types'
import IDataXoso from '@/Interfaces/IDataXoso'
import { getKqxsmn, getSeoByLink } from '@/services/api'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import XsmnTable from '@/components/XsmnTable'
import React, { useEffect, useState } from 'react'
import IDataXosoMore from '@/Interfaces/IDataXosoMore'
import { useDispatch } from 'react-redux'
import { closeLoading, openLoading } from '@/redux/action/loading'
import reverseDate from '@/helpers/reverseDate'
import compareTime from '@/helpers/compareTime'
import WaitingLoterry from '@/components/WaitingLottery'
import compareDateEqual from '@/helpers/compareDateEqual'
import Head from 'next/head'
import parse from 'html-react-parser'

const XosoMienTrung = ({
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
    const [dataXosoMore, setDataXosoMore] = useState<IDataXosoMore[]>([])
    const dispatch = useDispatch()
    const numberOfDateDisplayMore = 10

    const getXsmnResultMore = async () => {
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
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        }
    }

    useEffect(() => {
        getXsmnResultMore()
    }, [])

    return (
        <>
            <Head>
                <meta
                    name="keyword"
                    content="xsmn,xo so mien nam,sxmn,xổ số miền nam,xs mn,xs mien nam,xosomien nam,xo so truc tiep mien nam,xsmn hom nay"
                />
                <link
                    rel="canonical"
                    href={`https://xosoaladin.com/kqxs/xo-so-mien-nam`}
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.xosoMienNam}>
                {compareTime(
                    new Date(new Date(new Date().setMinutes(14)).setHours(16)),
                    new Date()
                ) && <WaitingLoterry region="Miền Nam" time="16h14" />}
                {dataXoso.resultObj?.length > 0 && (
                    <XsmnTable
                        regionName="Miền Nam"
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
                                    <XsmnTable
                                        regionName="Miền Nam"
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
            </div>
        </>
    )
}

export default XosoMienTrung

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/kqxs/xo-so-mien-nam',
    }
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )
    let haveDate = true
    let dateXoso = compareTime(
        new Date(),
        new Date(new Date(new Date().setTime(45)).setHours(16))
    )
        ? addingZeroToMonth(new Date())
        : addingZeroToMonth(prevDate)
    if (context.query?.date) {
        dateXoso =
            typeof context.query?.date == 'string'
                ? context.query?.date
                : dateXoso
        if (
            compareDateEqual(new Date(reverseDate(dateXoso)), new Date()) &&
            !compareTime(
                new Date(),
                new Date(new Date(new Date().setTime(45)).setHours(16))
            )
        ) {
            dateXoso = addingZeroToMonth(new Date(prevDate))
        }
    } else {
        haveDate = false
    }
    const dataXoso = await getKqxsmn(dateXoso)
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
