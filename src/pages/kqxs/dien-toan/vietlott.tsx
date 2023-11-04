import { NextPage } from 'next/types'
import styles from '@/styles/pages/kqxs/dien-toan/vietlott.module.scss'
import XosoMega from '@/components/XosoMega/XosoMega'
import {
    getMax3D,
    getMax3DPro,
    getMega645,
    getPower655,
    getSeoByLink,
} from '@/services/api'
import VietlottNavbar from '@/components/VietlottNavbar/VietlottNavbar'
import Power from '@/components/Power/Power'
import Max3D from '@/components/Max3D/Max3D'
import React, { useEffect, useState } from 'react'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import { useDispatch } from 'react-redux'
import { openLoading, closeLoading } from '@/redux/action/loading'
import { Dispatch } from 'redux'
import IMega from '@/Interfaces/IMega'
import { useSelector } from 'react-redux'
import IMax3D from '@/Interfaces/IMax3D'
import Max3DPro from '@/components/Max3DPro/Max3DPro'
import IMax3DPro from '@/Interfaces/IMax3DPro'
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
    const router = useRouter()
    useEffect(() => {
        if (router.query?.date) {
            //@ts-ignore
            setDateXoso(router.query?.date)
        }
    }, [router.query])
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
    const [max3d, setMax3d] = useState<IMax3D>()
    const [max3dpro, setMax3dpro] = useState<IMax3DPro>()
    const [power655, setPower655] = useState<IPower655>()
    const dispatch: Dispatch = useDispatch()
    const loading: boolean = useSelector(
        (state: { loading: boolean }) => state.loading
    )

    const getDataVietlott = async () => {
        try {
            dispatch(openLoading())
            const [dataMega, max3d, max3dpro, power655] = await Promise.all([
                getMega645(dateXoso),
                getMax3D(dateXoso),
                getMax3DPro(dateXoso),
                getPower655(dateXoso),
            ])
            setMega645(dataMega.data.resultObj)
            setMax3d(max3d.data.resultObj)
            setMax3dpro(max3dpro.data.resultObj)
            setPower655(power655.data.resultObj)
        } catch (error) {
            dispatch(closeLoading())
        } finally {
            dispatch(closeLoading())
        }
    }

    useEffect(() => {
        getDataVietlott()
    }, [dateXoso])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/kqxs/dien-toan/vietlott"
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
                            <h1>KẾT QUẢ XỐ SỐ VIETLOTT</h1>
                        </div>
                        <h2 className={styles.vietlottTableSubtitle}>
                            VIETLOTT - KẾT QUẢ XỔ SỐ VIETLOTT HÔM NAY
                        </h2>
                        <div className={styles.vietlottTableNavbar}>
                            <VietlottNavbar />
                        </div>
                        {mega645?.idKy && <XosoMega mega645={mega645} />}
                        {power655?.idKy && <Power power={power655} />}
                        {max3d?.idKy && <Max3D max3d={max3d} />}
                        {max3dpro?.idKy && <Max3DPro max3dpro={max3dpro} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vietlott

export async function getServerSideProps() {
    const params: any = {
        link: '/dien-toan/vietlott',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
