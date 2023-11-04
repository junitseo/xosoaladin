import { NextPage } from 'next/types'
import styles from '@/styles/pages/kqxs/dien-toan/vietlott.module.scss'
import {
    getMax3D,
    getMax3DPro,
    getMega645,
    getPower655,
    getSeoByLink,
} from '@/services/api'
import VietlottNavbar from '@/components/VietlottNavbar/VietlottNavbar'
import React, { useEffect, useState } from 'react'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import { useDispatch } from 'react-redux'
import { openLoading, closeLoading } from '@/redux/action/loading'
import { Dispatch } from 'redux'
import { useSelector } from 'react-redux'
import Max3DPro from '@/components/Max3DPro/Max3DPro'
import IMax3DPro from '@/Interfaces/IMax3DPro'
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

    const [max3dpro, setMax3dpro] = useState<IMax3DPro>()
    const dispatch: Dispatch = useDispatch()
    const loading: boolean = useSelector(
        (state: { loading: boolean }) => state.loading
    )

    const getDataVietlott = async () => {
        try {
            dispatch(openLoading())
            const max3dpro = await getMax3DPro(dateXoso)
            setMax3dpro(max3dpro.data.resultObj)
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
                    href="https://xosoaladin.com/kqxs/dien-toan/max3dpro"
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
                            <h1>KẾT QUẢ XỐ SỐ MAX 3D PRO</h1>
                        </div>
                        <h2 className={styles.vietlottTableSubtitle}>
                            MAX 3D PRO - KẾT QUẢ XỔ SỐ MAX 3D PRO
                        </h2>
                        <div className={styles.vietlottTableNavbar}>
                            <VietlottNavbar />
                        </div>
                        {max3dpro?.idKy && <Max3DPro max3dpro={max3dpro} />}
                        {/* <Max4D/> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Vietlott

export async function getServerSideProps() {
    const params: any = {
        link: '/dien-toan/max3dpro',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
