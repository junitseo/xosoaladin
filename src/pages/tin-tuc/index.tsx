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
import { GetServerSidePropsContext } from 'next/types'
import parse from 'html-react-parser'
const Tintuc = ({ tags }: { tags: any }) => {
    // const
    const dispatch = useDispatch()
    const [data, setData] = useState<IDreamPost[]>([])
    // console.log(`aaa`,router.query);

    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalDoc, setTotalDoc] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const getData = async () => {
        try {
            dispatch(openLoading())
            const resData = await getAllPostByCategory(pageIndex, 'tin-tuc')
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
                <link rel="canonical" href={`https://xosoaladin.com/tin-tuc`} />
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
                                <p>Tin tức</p>
                            </div>
                            <Posts
                                category_slug="tin-tuc"
                                data={data}
                                setPageIndex={setPageIndex}
                            />
                            <Pagination
                                defaultCurrent={pageIndex}
                                current={pageIndex}
                                onChange={(pageIndex) =>
                                    setPageIndex(pageIndex)
                                }
                                pageSize={5}
                                total={totalDoc}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tintuc

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/tin-tuc',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
