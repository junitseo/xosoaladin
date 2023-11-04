import HeaderCalendar from '@/components/HeaderCalendar'
import XsmbTable from '@/components/XsmbTable'
import XsmnTable from '@/components/XsmnTable'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import compareTime from '@/helpers/compareTime'
import IDataXoso from '@/Interfaces/IDataXoso'
import { getKqxsMb, getKqxsmn, getKqxsmt, getSeoByLink } from '@/services/api'
import styles from '@/styles/pages/kqxs/index.module.scss'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next/types'
import React from 'react'
import parse from 'html-react-parser'

const KQXS = ({
    dataMb,
    dataMn,
    dataMt,
    tags,
}: {
    dataMb: IDataXoso
    dataMn: IDataXoso
    dataMt: IDataXoso
    tags: any
}) => {
    console.log(dataMb.isSuccessed)
    return (
        <>
            <Head>
                <link rel="canonical" href="https://xosoaladin.com/kqxs" />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div>
                <HeaderCalendar />
                {!dataMt.isSuccessed && (
                    <h1 style={{ textAlign: 'center', marginTop: '25px' }}>
                        Không có dữ liệu
                    </h1>
                )}
                <div className={styles.xsTable}>
                    {dataMb.resultObj?.length > 0 && (
                        <XsmbTable
                            dataXoso={dataMb}
                            date={dataMb.resultObj?.[0].listXSTT?.[0]?.dayPrize}
                            regionName="Miền Bắc"
                        />
                    )}
                </div>
                <div className={styles.xsTable} style={{ marginTop: '10px' }}>
                    {dataMn.resultObj?.length > 0 && (
                        <XsmnTable
                            dataXoso={dataMn}
                            date={dataMn.resultObj?.[0].listXSTT?.[0]?.dayPrize}
                            regionName="Miền Nam"
                        />
                    )}
                </div>
                <div className={styles.xsTable} style={{ marginTop: '10px' }}>
                    {dataMt.resultObj?.length > 0 && (
                        <XsmnTable
                            dataXoso={dataMt}
                            date={dataMt.resultObj?.[0].listXSTT?.[0]?.dayPrize}
                            regionName="Miền Trung"
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default KQXS

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/kqxs',
    }
    const date = context.query.date

    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )
    const dateXosoMb = compareTime(
        new Date(),
        new Date(new Date(new Date().setTime(45)).setHours(18))
    )
        ? addingZeroToMonth(new Date())
        : addingZeroToMonth(prevDate)

    const dateXosoMn = compareTime(
        new Date(),
        new Date(new Date(new Date().setTime(45)).setHours(16))
    )
        ? addingZeroToMonth(new Date())
        : addingZeroToMonth(prevDate)

    const dateXosoMt = compareTime(
        new Date(),
        new Date(new Date(new Date().setTime(45)).setHours(17))
    )
        ? addingZeroToMonth(new Date())
        : addingZeroToMonth(prevDate)

    const [resultMn, resultMb, resultMt, seo] = await Promise.all([
        getKqxsmn(date ? date.toString() : dateXosoMn),
        getKqxsMb(date ? date.toString() : dateXosoMb),
        getKqxsmt(date ? date.toString() : dateXosoMt),
        getSeoByLink(params),
    ])

    return {
        props: {
            dataMn: resultMn.data,
            dataMb: resultMb.data,
            dataMt: resultMt.data,
            tags: seo?.data?.data?.tags || [],
        },
    }
}
