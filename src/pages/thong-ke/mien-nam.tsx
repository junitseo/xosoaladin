import HeadTailAppear from '@/components/HeadTailAppear'
import SpecialStatsTableMnMt from '@/components/SpecialStatsTableMnMt/SpecialStatsTableMnMt'
import TopAppearTable from '@/components/TopAppearTable'
import IXsStatistic from '@/Interfaces/IXsStaristic'
import {
    getAllByHead,
    getAllByTail,
    getAllSpecialPrizeMn,
    getSeoByLink,
    getTopByRegion,
} from '@/services/api'
import Head from 'next/head'
import { GetServerSidePropsContext, NextPage } from 'next/types'
import parse from 'html-react-parser'
import React from 'react'

const ThongKeMienNam: NextPage<IXsStatistic> = (props: IXsStatistic) => {
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/thong-ke/mien-nam"
                />
                {props.tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div>
                <h1
                    style={{
                        fontSize: '24px',
                        textAlign: 'center',
                        marginTop: '10px',
                    }}
                >
                    THỐNG KÊ XỔ SỐ MIỀN NAM
                </h1>
                <div style={{ marginTop: '15px' }}>
                    <SpecialStatsTableMnMt
                        specialStatistic={props.specialStatistic}
                        arrayDate={props.arrayDate}
                        region={3}
                    />
                </div>
                <div style={{ marginTop: '25px' }}>
                    <TopAppearTable topAppear={props.topAppear} />
                </div>
                <div style={{ marginTop: '25px' }}>
                    <HeadTailAppear
                        headAppear={props.allHead}
                        tailAppear={props.allTail}
                    />
                </div>
            </div>
        </>
    )
}

export default ThongKeMienNam

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/thong-ke/mien-nam',
    }
    const [specialStatistic, topAppear, allHead, allTail, seo] =
        await Promise.all([
            getAllSpecialPrizeMn(),
            getTopByRegion(3),
            getAllByHead(3),
            getAllByTail(3),
            getSeoByLink(params),
        ])

    return {
        props: {
            specialStatistic: specialStatistic.data.specialStatistic,
            topAppear: topAppear.data,
            allHead: allHead.data,
            allTail: allTail.data,
            arrayDate: specialStatistic.data.arrayDate,
            tags: seo?.data?.data?.tags || [],
        },
    }
}
