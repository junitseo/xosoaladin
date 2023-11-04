import { NextPage } from 'next/types'
import styles from '@/styles/pages/kqxs/dien-toan/vietlott.module.scss'
import { getMega645, getSeoByLink } from '@/services/api'
import VietlottNavbar from '@/components/VietlottNavbar/VietlottNavbar'
import React, { useEffect, useState } from 'react'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import { useDispatch } from 'react-redux'
import { openLoading, closeLoading } from '@/redux/action/loading'
import { Dispatch } from 'redux'
import IMega from '@/Interfaces/IMega'
import { useSelector } from 'react-redux'
import XosoMega from '@/components/XosoMega/XosoMega'
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
    const [mega645, setMega645] = useState<IMega>({
        _id: '',
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        number5: '',
        number6: '',
        jackpot: '',
        jackpotWinner: '',
        match5: '',
        match4: '',
        match5Winner: '',
        match4Winner: '',
        match3: '',
        match3Winner: '',
        dayPrize: '',
        idKy: '',
    })
    const dispatch: Dispatch = useDispatch()
    const loading: boolean = useSelector(
        (state: { loading: boolean }) => state.loading
    )

    const getDataVietlott = async () => {
        try {
            dispatch(openLoading())
            const dataMega = await getMega645(dateXoso)
            setMega645(dataMega.data.resultObj)
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
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
                <div className={styles.vietlottWrapper}>
                    {loading && <Loading />}
                    <div className={styles.vietlott}>
                        <div className={styles.vietlottTable}>
                            <div className={styles.vietlottTableTitle}>
                                <h1>KẾT QUẢ XỐ SỐ MEGA 6/45</h1>
                            </div>
                            <h2 className={styles.vietlottTableSubtitle}>
                                MEGA 6/45 - KẾT QUẢ XỔ SỐ MEGA 6/45
                            </h2>
                            <div className={styles.vietlottTableNavbar}>
                                <VietlottNavbar />
                            </div>
                            {mega645?.idKy && <XosoMega mega645={mega645} />}
                            {/* <Max4D/> */}
                        </div>
                    </div>
                </div>
            </Head>
        </>
    )
}

export default Vietlott

export async function getServerSideProps() {
    const params: any = {
        link: '/dien-toan/mega645',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
