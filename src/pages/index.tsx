import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import React, { useEffect, useState } from 'react'
import IDataXoso from '@/Interfaces/IDataXoso'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import {
    getHomeBanner,
    getKqxsMbServerSide,
    getKqxsmnServerSide,
    getKqxsmtServerSide,
    getMax3DProServerSide,
    getMax3DServerSide,
    getMega645ServerSide,
    getPower655ServerSide,
    getSeoByLink,
} from '@/services/api'
import XsmnTable from '@/components/XsmnTable'
import XsmbTable from '@/components/XsmbTable'
import compareTime from '@/helpers/compareTime'
import Router from 'next/router'
import WaitingLoterry from '@/components/WaitingLottery'
import CoCau from '@/components/CoCau'
import HeaderXosoTable from '@/components/HeaderXosoTable'
import IMega from '@/Interfaces/IMega'
import IMax3D from '@/Interfaces/IMax3D'
import IMax3DPro from '@/Interfaces/IMax3DPro'
import IPower655 from '@/Interfaces/IPower655'
import XosoMega from '@/components/XosoMega/XosoMega'
import Power from '@/components/Power/Power'
import Max3DPro from '@/components/Max3DPro/Max3DPro'
import Max3D from '@/components/Max3D/Max3D'
import HeaderCalendar from '@/components/HeaderCalendar'
import { config } from '@/config'
import { GetServerSidePropsContext } from 'next/types'
import parse from 'html-react-parser'
import { isMobile } from 'react-device-detect'

export default function Home({
    mega645,
    max3d,
    max3dpro,
    power655,
    dataXosoMb,
    dataXosoMn,
    dataXosoMt,
    banner,
    tags,
}: {
    mega645: IMega
    max3d: IMax3D
    max3dpro: IMax3DPro
    power655: IPower655
    dataXosoMb: IDataXoso
    dataXosoMn: IDataXoso
    dataXosoMt: IDataXoso
    banner: any
    tags: any
}) {
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )

    const [dateXosoMb, setDateXosoMb] = useState<string>(
        compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(45)).setHours(18))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)
    )

    const [dateXosoMn, setDateXosoMn] = useState<string>(
        compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(45)).setHours(16))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)
    )

    const [dateXosoMt, setDateXosoMt] = useState<string>(
        compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(45)).setHours(17))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)
    )

    useEffect(() => {
        if (
            compareTime(
                new Date(),
                new Date(new Date(new Date().setMinutes(15)).setHours(16))
            ) &&
            compareTime(
                new Date(new Date(new Date().setMinutes(45)).setHours(16)),
                new Date()
            )
        ) {
            Router.push('/truc-tiep/xo-so-mien-nam')
        } else if (
            compareTime(
                new Date(),
                new Date(new Date(new Date().setMinutes(15)).setHours(17))
            ) &&
            compareTime(
                new Date(new Date(new Date().setMinutes(45)).setHours(17)),
                new Date()
            )
        ) {
            // Router.push('/truc-tiep/xo-so-mien-trung')
        } else if (
            compareTime(
                new Date(),
                new Date(new Date(new Date().setMinutes(15)).setHours(18))
            ) &&
            compareTime(
                new Date(new Date(new Date().setMinutes(45)).setHours(18)),
                new Date()
            )
        ) {
            Router.push('/truc-tiep/xo-so-mien-bac')
        }
    }, [])

    return (
        <>
            <Head>
                <meta
                    name="keyword"
                    content="kqxs, ket qua xo so, ketquaxoso, kết quả xổ số, xổ số ALADIN,xo so,xổ số kiến thiết,xổ số ba miền,xổ số truyền thống,xổ số"
                />
                <link rel="canonical" href="https://xosoaladin.com" />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.homepageWrapper}>
                <HeaderXosoTable />
                <HeaderCalendar />
                <div className={styles.homepage}>
                    {compareTime(
                        new Date(
                            new Date(new Date().setMinutes(14)).setHours(16)
                        ),
                        new Date()
                    ) ? (
                        <WaitingLoterry region="Miền Nam" time="16h14" />
                    ) : compareTime(
                          new Date(
                              new Date(new Date().setMinutes(14)).setHours(17)
                          ),
                          new Date()
                      ) ? (
                        <WaitingLoterry region="Miền Trung" time="17h14" />
                    ) : (
                        compareTime(
                            new Date(
                                new Date(new Date().setMinutes(14)).setHours(18)
                            ),
                            new Date()
                        ) && <WaitingLoterry region="Miền Bắc" time="18h14" />
                    )}
                    {banner?.bannerTopCenter && (
                        <a href={banner?.linkBannerTopCenter}>
                            <img
                                style={{ marginTop: '10px', width: '100%' }}
                                src={`${config.CDN_URL}/${banner?.bannerTopCenter}`}
                                alt="xosoaladin.com"
                            />
                        </a>
                    )}
                    <div className={styles.homepageXsmn}>
                        {dataXosoMn?.resultObj?.length != 0 && (
                            <XsmnTable
                                regionName="Miền Nam"
                                dataXoso={dataXosoMn}
                                date={dateXosoMn}
                            />
                        )}
                    </div>
                    <div
                        className={styles.homepageXsmb}
                        style={{ marginTop: '20px' }}
                    >
                        {dataXosoMb?.resultObj?.length != 0 && (
                            <XsmbTable
                                regionName="Miền Bắc"
                                dataXoso={dataXosoMb}
                                date={dateXosoMb}
                            />
                        )}
                    </div>
                    <div
                        className={styles.homepageXsmt}
                        style={{ marginTop: '20px' }}
                    >
                        {dataXosoMt?.resultObj?.length != 0 && (
                            <XsmnTable
                                regionName="Miền Trung"
                                dataXoso={dataXosoMt}
                                date={dateXosoMt}
                            />
                        )}
                        {mega645?.idKy && <XosoMega mega645={mega645} />}
                        {power655?.idKy && <Power power={power655} />}
                        {max3d?.idKy && <Max3D max3d={max3d} />}
                        {max3dpro?.idKy && <Max3DPro max3dpro={max3dpro} />}
                    </div>
                    {banner?.bannerBottomCenter && (
                        <a href={banner?.linkBannerBottomCenter}>
                            <img
                                style={{ marginTop: '10px', width: '100%' }}
                                src={`${config.CDN_URL}/${banner?.bannerBottomCenter}`}
                                alt="xosoaladin.com"
                            />
                        </a>
                    )}

                    <div style={{ marginTop: '20px' }}>
                        {!isMobile && <CoCau />}
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const params: any = {
            link: '/',
        }

        const prevDate: Date = new Date(
            new Date().setDate(new Date().getDate() - 1)
        )
        const dateXosoMb = compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(45)).setHours(18))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)

        const dateXosoMn = compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(45)).setHours(16))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)

        const dateXosoMt = compareTime(
            new Date(),
            new Date(new Date(new Date().setMinutes(45)).setHours(17))
        )
            ? addingZeroToMonth(new Date())
            : addingZeroToMonth(prevDate)

        let dateXoso = addingZeroToMonth(
            new Date(new Date().setDate(new Date().getDate() - 1))
        )

        const [
            dataMega,
            max3dpro,
            power655,
            kqxsMn,
            kqxsMb,
            kqxsMt,
            max3d,
            banner,
            seo,
        ] = await Promise.all([
            getMega645ServerSide(dateXoso),
            getMax3DProServerSide(dateXoso),
            getPower655ServerSide(dateXoso),
            getKqxsmnServerSide(dateXosoMn),
            getKqxsMbServerSide(dateXosoMb),
            getKqxsmtServerSide(dateXosoMt),
            getMax3DServerSide(dateXoso),
            getHomeBanner(),
            getSeoByLink(params),
        ])
        return {
            props: {
                mega645: dataMega.data?.resultObj,
                max3dpro: max3dpro.data?.resultObj,
                power655: power655.data?.resultObj,
                dataXosoMb: kqxsMb.data,
                dataXosoMn: kqxsMn.data,
                dataXosoMt: kqxsMt.data,
                max3d: max3d.data?.resultObj,
                banner: banner.data?.banner || {},
                tags: seo?.data?.data?.tags || [],
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                mega645: {},
                max3dpro: {},
                power655: {},
                dataXosoMb: {},
                dataXosoMn: {},
                dataXosoMt: {},
                max3d: {},
                banner: {},
                tags: [],
            },
        }
    }
}
