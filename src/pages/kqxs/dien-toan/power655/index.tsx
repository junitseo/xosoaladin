import { NextPage } from 'next/types'
import styles from '@/styles/pages/kqxs/dien-toan/vietlott.module.scss'
import { getPower655, getSeoByLink } from '@/services/api'
import VietlottNavbar from '@/components/VietlottNavbar/VietlottNavbar'
import Power from '@/components/Power/Power'
import React, { useEffect, useState } from 'react'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import { useDispatch } from 'react-redux'
import { openLoading, closeLoading } from '@/redux/action/loading'
import { Dispatch } from 'redux'
import { useSelector } from 'react-redux'
import IPower655 from '@/Interfaces/IPower655'
import Loading from '@/components/Loading'
import { useRouter } from 'next/router'
import Head from 'next/head'
import parse from 'html-react-parser'

const Vietlott: NextPage = ({ tags }: { tags: any }) => {
    const [dateXoso, setDateXoso] = useState<string>(
        addingZeroToMonth(
            new Date(new Date().setDate(new Date().getDate() - 1))
        )
    )
    const [power655, setPower655] = useState<IPower655>()
    const dispatch: Dispatch = useDispatch()
    const loading: boolean = useSelector(
        (state: { loading: boolean }) => state.loading
    )

    const getDataVietlott = async () => {
        try {
            dispatch(openLoading())
            const power655 = await getPower655(dateXoso)
            setPower655(power655.data.resultObj)
        } catch (error) {
            dispatch(closeLoading())
            console.log(error)
        } finally {
            dispatch(closeLoading())
        }
    }
    const router = useRouter()
    useEffect(() => {
        if (router.query?.date) {
            //@ts-ignore
            setDateXoso(router.query?.date)
        }
    }, [router.query])
    useEffect(() => {
        getDataVietlott()
    }, [dateXoso])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/kqxs/dien-toan/max3d"
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.vietlottWrapper}>
                {loading && <Loading />}
                <div className={styles.vietlott}>
                    <div className={styles.vietlottTable}>
                        <div className={styles.vietlottTableTitle}>
                            <h1>KẾT QUẢ XỐ SỐ POWER 6/55</h1>
                        </div>
                        <h2 className={styles.vietlottTableSubtitle}>
                            POWER 6/55 - KẾT QUẢ XỔ SỐ POWER 6/55
                        </h2>
                        <div className={styles.vietlottTableNavbar}>
                            <VietlottNavbar />
                        </div>
                        {power655?.idKy && <Power power={power655} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vietlott

export async function getServerSideProps() {
    const params: any = {
        link: '/dien-toan/power655',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
