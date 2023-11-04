import HeadTailAppear from '@/components/HeadTailAppear'
import TopAppearTable from '@/components/TopAppearTable'
import WaitingLoterry from '@/components/WaitingLottery'
import WaitingMbTable from '@/components/WaitingTableMb'
import XsmbTable from '@/components/XsmbTable'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import compareTime from '@/helpers/compareTime'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'
import IDataXoso from '@/Interfaces/IDataXoso'
import ITopAppearTable from '@/Interfaces/ITopAppear'
import IXosoResult from '@/Interfaces/IXosoResult'
import { closeLoading, openLoading } from '@/redux/action/loading'
import {
    getAllByHead,
    getAllByTail,
    getAllSpecialPrizeMb,
    getKqxsMb,
    getSeoByLink,
    getTopByRegion,
} from '@/services/api'
import styles from '@/styles/pages/TrucTiep/XosoMienBac/index.module.scss'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next/types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import parse from 'html-react-parser'

const LiveXosoMienBac = (props: {
    specialStatistic: IXosoResult[]
    arrayDate: string[]
    province: number
    topAppear: ITopAppearTable[]
    allHead: {
        _id: string
        total: number
    }[]
    allTail: {
        _id: string
        total: number
    }[]
    tags: any
}) => {
    const [dataXoso, setDataXoso] = useState<IDataXoso>()
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )
    const [dateXoso, setDateXoso] = useState<string>(
        compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(10)).setHours(17))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)
    )
    const dispatch = useDispatch()

    const getXsmbResult = async () => {
        try {
            dispatch(openLoading())
            const result = await getKqxsMb(dateXoso)
            setDataXoso(result.data)
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        } finally {
            dispatch(closeLoading())
        }
    }
    const getXsmbResultRealTime = async () => {
        try {
            const result = await getKqxsMb(dateXoso)
            setDataXoso(result.data)
        } catch (error) {
            console.log(error)
        } finally {
        }
    }

    useEffect(() => {
        getXsmbResult()
    }, [dateXoso])

    useEffect(() => {
        const getKqxsRealTime = setInterval(() => {
            if (dateXoso == addingZeroToMonth(new Date())) {
                if (
                    new Date().getHours() == 18 &&
                    new Date().getMinutes() > 10 &&
                    new Date().getMinutes() < 45
                ) {
                    getXsmbResultRealTime()
                }
            }
        }, 3000)
        return () => {
            clearInterval(getKqxsRealTime)
        }
    }, [])

    function refreshAt(hours: number, minutes: number, seconds: number) {
        var now = new Date()
        var then = new Date()

        if (
            now.getHours() > hours ||
            (now.getHours() == hours && now.getMinutes() > minutes) ||
            (now.getHours() == hours &&
                now.getMinutes() == minutes &&
                now.getSeconds() >= seconds)
        ) {
            then.setDate(now.getDate() + 1)
        }
        then.setHours(hours)
        then.setMinutes(minutes)
        then.setSeconds(seconds)

        var timeout = then.getTime() - now.getTime()
        setTimeout(function () {
            window.location.reload()
        }, timeout)
    }

    useEffect(() => {
        refreshAt(18, 11, 0)
    }, [])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/truc-tiep/xo-so-mien-bac"
                />
                {props.tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div>
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        marginTop: '20px',
                        marginBottom: '5px',
                        color: 'black',
                    }}
                >
                    TRỰC TIẾP XỔ SỐ MIỀN BẮC{' '}
                    {replaceDashFromDate(addingZeroToMonth(new Date()))}
                </h2>
                {compareTime(
                    new Date(new Date(new Date().setMinutes(14)).setHours(18)),
                    new Date()
                ) && <WaitingLoterry region="Miền Bắc" time="18h14" />}
                {compareTime(
                    new Date(),
                    new Date(new Date(new Date().setMinutes(30)).setHours(17))
                ) &&
                    compareTime(
                        new Date(
                            new Date(new Date().setMinutes(10)).setHours(18)
                        ),
                        new Date()
                    ) && (
                        <WaitingMbTable
                            regionName="Miền Bắc"
                            listProvince={[]}
                            date={addingZeroToMonth(new Date())}
                        />
                    )}
                {dataXoso?.resultObj?.length != 0 && (
                    <XsmbTable
                        dataXoso={dataXoso}
                        date={dateXoso}
                        regionName="Miền Bắc"
                        haveLock
                    />
                )}
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

export default LiveXosoMienBac

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/truc-tiep/xo-so-mien-bac',
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
