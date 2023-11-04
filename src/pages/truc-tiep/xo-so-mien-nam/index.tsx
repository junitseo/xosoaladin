import XsmnTable from '@/components/XsmnTable'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import compareTime from '@/helpers/compareTime'
import IDataXoso from '@/Interfaces/IDataXoso'
import { closeLoading, openLoading } from '@/redux/action/loading'
import {
    getAllByHead,
    getAllByTail,
    getAllSpecialPrizeMn,
    getKqxsmn,
    getSeoByLink,
    getTopByRegion,
} from '@/services/api'
import styles from '@/styles/pages/TrucTiep/XosoMienNam/index.module.scss'
import { useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import WaitingLoterry from '@/components/WaitingLottery'
import compareDate from '@/helpers/compareDate'
import { GetServerSidePropsContext } from 'next/types'
import IXsStatistic from '@/Interfaces/IXsStaristic'
import SpecialStatsTableMnMt from '@/components/SpecialStatsTableMnMt/SpecialStatsTableMnMt'
import TopAppearTable from '@/components/TopAppearTable'
import HeadTailAppear from '@/components/HeadTailAppear'
import WaitingMnTable from '@/components/WaitingTableMn'
import getProvincesXsMn from '@/helpers/getProvincesXsMn'
import reverseDate from '@/helpers/reverseDate'
import Head from 'next/head'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'
import parse from 'html-react-parser'

const LiveXosoMienNam = (props: IXsStatistic) => {
    const [dataXoso, setDataXoso] = useState<IDataXoso>()
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )
    const [dateXoso, setDateXoso] = useState<string>(
        compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(10)).setHours(16))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)
    )
    const dispatch = useDispatch()

    const getXsmnResult = async () => {
        try {
            dispatch(openLoading())
            const result = await getKqxsmn(dateXoso)
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
            const result = await getKqxsmn(dateXoso)
            setDataXoso(result.data)
        } catch (error) {
            console.log(error)
        } finally {
        }
    }

    useEffect(() => {
        const getKqxsRealTime = setInterval(() => {
            if (dateXoso == addingZeroToMonth(new Date())) {
                if (
                    new Date().getHours() == 16 &&
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
        refreshAt(16, 11, 0)
    }, [])

    useEffect(() => {
        getXsmnResult()
    }, [dateXoso])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/truc-tiep/xo-so-mien-nam"
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
                    TRỰC TIẾP XỔ SỐ MIỀN NAM{' '}
                    {replaceDashFromDate(addingZeroToMonth(new Date()))}
                </h2>
                {compareTime(
                    new Date(new Date(new Date().setMinutes(14)).setHours(16)),
                    new Date()
                ) && <WaitingLoterry region="Miền Nam" time="16h14" />}
                {compareTime(
                    new Date(),
                    new Date(new Date(new Date().setMinutes(30)).setHours(15))
                ) &&
                    compareTime(
                        new Date(
                            new Date(new Date().setMinutes(10)).setHours(16)
                        ),
                        new Date()
                    ) && (
                        <WaitingMnTable
                            regionName="Miền Nam"
                            listProvince={getProvincesXsMn(
                                reverseDate(addingZeroToMonth(new Date()))
                            )}
                            date={addingZeroToMonth(new Date())}
                        />
                    )}
                {dataXoso?.resultObj?.length != 0 && (
                    <XsmnTable
                        dataXoso={dataXoso}
                        date={dateXoso}
                        regionName="Miền Nam"
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

export default LiveXosoMienNam

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/truc-tiep/xo-so-mien-nam',
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
