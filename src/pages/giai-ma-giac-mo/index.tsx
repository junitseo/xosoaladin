import styles from '@/styles/pages/GiaiMaGiacMo/index.module.scss'
import Posts from '@/components/Posts/index'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { styles } from '@/styles/Home.module.css';
import { openLoading, closeLoading } from '../../redux/action/loading'
import IDreamPost from '../../Interfaces/IDreamPost'
import { getAllPostByCategory, getSeoByLink } from '@/services/api'
import { Pagination } from 'antd'
import Head from 'next/head'
import parse from 'html-react-parser'
const GiaiMaGiacMo = ({ tags }: { tags: any }) => {
    // const
    const dispatch = useDispatch()
    const [data, setData] = useState<IDreamPost[]>([])

    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalDoc, setTotalDoc] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const getData = async () => {
        try {
            dispatch(openLoading())
            const resData = await getAllPostByCategory(pageIndex)
            setData(resData.data?.posts)
            setTotalDoc(resData.data?.totalDoc)
            setPageSize(resData.data?.pageSize)
            setTotalPage(resData.data?.totalPage)
            dispatch(closeLoading())
        } catch (e) {
            dispatch(closeLoading())
        }
    }
    useEffect(() => {
        getData()
    }, [pageIndex])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={`https://xosoaladin.com/giai-ma-giac-mo`}
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <section id={styles.dream}>
                <div className={styles.box}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <div className={styles.title}>
                                <p>Giải mã giấc mơ</p>
                            </div>
                            <Posts
                                category_slug="giai-ma-giac-mo"
                                data={data}
                                setPageIndex={setPageIndex}
                            />
                            <Pagination
                                defaultCurrent={pageIndex}
                                current={pageIndex}
                                onChange={(pageIndex) =>
                                    setPageIndex(pageIndex)
                                }
                                pageSize={10}
                                total={totalDoc}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GiaiMaGiacMo

export async function getServerSideProps() {
    const params: any = {
        link: '/dien-toan/giai-ma-giac-mo',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
