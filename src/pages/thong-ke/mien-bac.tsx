import HeadTailAppear from '@/components/HeadTailAppear'
import SpecialStatisticTable from '@/components/SpecialStatisticTable/SpecialStatisticTable'
import TopAppearTable from '@/components/TopAppearTable'
import IXsStatistic from '@/Interfaces/IXsStaristic'
import {
    getAllByHead,
    getAllByTail,
    getAllSpecialPrizeMb,
    getSeoByLink,
    getTopByRegion,
} from '@/services/api'
import Head from 'next/head'
import { GetServerSidePropsContext, NextPage } from 'next/types'
import parse from 'html-react-parser'
import React from 'react'

const ThongKeMienBac: NextPage<IXsStatistic> = (props: IXsStatistic) => {
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/thong-ke/mien-bac"
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
                    THỐNG KÊ XỔ SỐ MIỀN BẮC
                </h1>
                <div style={{ marginTop: '15px' }}>
                    <SpecialStatisticTable
                        specialStatistic={props.specialStatistic}
                        arrayDate={props.arrayDate}
                    />
                </div>
                <div style={{ marginTop: '25px' }}>
                    <TopAppearTable topAppear={props.topAppear} />
                </div>
                <div style={{ marginTop: '25px', marginBottom: '20px' }}>
                    <HeadTailAppear
                        headAppear={props.allHead}
                        tailAppear={props.allTail}
                    />
                </div>
            </div>
        </>
    )
}

export default ThongKeMienBac

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/thong-ke/mien-bac',
    }
    const [specialStatistic, topAppear, allHead, allTail, seo] =
        await Promise.all([
            getAllSpecialPrizeMb(),
            getTopByRegion(1),
            getAllByHead(1),
            getAllByTail(1),
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
