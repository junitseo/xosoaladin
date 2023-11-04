import XsmnTable from '@/components/XsmnTable'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import compareTime from '@/helpers/compareTime'
import IDataXoso from '@/Interfaces/IDataXoso'
import { closeLoading, openLoading } from '@/redux/action/loading'
import {
    getAllByHead,
    getAllByTail,
    getAllSpecialPrizeMn,
    getKqxsmt,
    getSeoByLink,
    getTopByRegion,
} from '@/services/api'
import React, { useState, useEffect } from 'react'
import styles from '@/styles/pages/TrucTiep/XosoMienTrung/index.module.scss'
import { useDispatch } from 'react-redux'
import WaitingLoterry from '@/components/WaitingLottery'
import compareDate from '@/helpers/compareDate'
import { GetServerSidePropsContext } from 'next/types'
import IXsStatistic from '@/Interfaces/IXsStaristic'
import SpecialStatsTableMnMt from '@/components/SpecialStatsTableMnMt/SpecialStatsTableMnMt'
import TopAppearTable from '@/components/TopAppearTable'
import HeadTailAppear from '@/components/HeadTailAppear'
import getProvincesXsmt from '@/helpers/getProvincesXsmt'
import reverseDate from '@/helpers/reverseDate'
import WaitingMnTable from '@/components/WaitingTableMn'
import Head from 'next/head'
import parse from 'html-react-parser'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'

const LiveXosoMienTrung = (props: IXsStatistic) => {
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

    const getXsmtResult = async () => {
        try {
            dispatch(openLoading())
            const result = await getKqxsmt(dateXoso)
            setDataXoso(result.data)
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        } finally {
            dispatch(closeLoading())
        }
    }
    const getXsmtResultRealTime = async () => {
        try {
            const result = await getKqxsmt(dateXoso)
            setDataXoso(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getKqxsRealTime = setInterval(() => {
            if (dateXoso == addingZeroToMonth(new Date())) {
                if (
                    new Date().getHours() == 17 &&
                    new Date().getMinutes() > 10 &&
                    new Date().getMinutes() < 45
                ) {
                    getXsmtResultRealTime()
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
        refreshAt(17, 11, 0)
    }, [])

    useEffect(() => {
        getXsmtResult()
    }, [dateXoso])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/truc-tiep/xo-so-mien-trung"
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
                    TRỰC TIẾP XỔ SỐ MIỀN TRUNG{' '}
                    {replaceDashFromDate(addingZeroToMonth(new Date()))}
                </h2>
                {compareTime(
                    new Date(new Date(new Date().setMinutes(14)).setHours(17)),
                    new Date()
                ) && <WaitingLoterry region="Miền Trung" time="17h14" />}
                {compareTime(
                    new Date(),
                    new Date(new Date(new Date().setMinutes(30)).setHours(16))
                ) &&
                    compareTime(
                        new Date(
                            new Date(new Date().setMinutes(10)).setHours(17)
                        ),
                        new Date()
                    ) && (
                        <WaitingMnTable
                            regionName="Miền Trung"
                            listProvince={getProvincesXsmt(
                                reverseDate(addingZeroToMonth(new Date()))
                            )}
                            date={addingZeroToMonth(new Date())}
                            haveLock
                        />
                    )}
                {dataXoso?.resultObj?.length != 0 && (
                    <XsmnTable
                        dataXoso={dataXoso}
                        date={dateXoso}
                        regionName="Miền Trung"
                        haveLock
                    />
                )}
                <div style={{ marginTop: '15px' }}>
                    <SpecialStatsTableMnMt
                        specialStatistic={props.specialStatistic}
                        arrayDate={props.arrayDate}
                        region={2}
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

export default LiveXosoMienTrung

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/truc-tiep/xo-so-mien-trung',
    }
    const [specialStatistic, topAppear, allHead, allTail, seo] =
        await Promise.all([
            getAllSpecialPrizeMn(),
            getTopByRegion(2),
            getAllByHead(2),
            getAllByTail(2),
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
