import { NextPage } from 'next/types'
import styles from '@/styles/pages/kqxs/dien-toan/vietlott.module.scss'
import { getMax3D, getSeoByLink } from '@/services/api'
import VietlottNavbar from '@/components/VietlottNavbar/VietlottNavbar'
import Max3D from '@/components/Max3D/Max3D'
import React, { useEffect, useState } from 'react'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import { useDispatch } from 'react-redux'
import { openLoading, closeLoading } from '@/redux/action/loading'
import { Dispatch } from 'redux'
import { useSelector } from 'react-redux'
import IMax3D from '@/Interfaces/IMax3D'
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
    const [max3d, setMax3d] = useState<IMax3D>()
    const dispatch: Dispatch = useDispatch()
    const loading: boolean = useSelector(
        (state: { loading: boolean }) => state.loading
    )

    const getDataVietlott = async () => {
        try {
            dispatch(openLoading())
            const max3d = await getMax3D(dateXoso)
            setMax3d(max3d.data.resultObj)
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
                            <h1>KẾT QUẢ XỐ SỐ MAX 3D</h1>
                        </div>
                        <h2 className={styles.vietlottTableSubtitle}>
                            MAX3D - KẾT QUẢ XỔ SỐ MAX3D
                        </h2>
                        <div className={styles.vietlottTableNavbar}>
                            <VietlottNavbar />
                        </div>
                        {max3d?.idKy && <Max3D max3d={max3d} />}
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
        link: '/dien-toan/max3d',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
