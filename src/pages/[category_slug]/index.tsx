import styles from '@/styles/pages/GiaiMaGiacMo/index.module.scss'
import Posts from '@/components/Posts/index'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { styles } from '@/styles/Home.module.css';
import { openLoading, closeLoading } from '../../redux/action/loading'
import IDreamPost from '../../Interfaces/IDreamPost'
import { getAllPostByCategory } from '@/services/api'
import { Pagination } from 'antd'
import { GetServerSidePropsContext } from 'next/types'
import { useRouter } from 'next/router'
const ThongTin = ({category_slug}: {category_slug: string}) => {
    // const
    const router = useRouter()
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
            const resData = await getAllPostByCategory(pageIndex, category_slug)
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
    }, [pageIndex, category_slug])

    useEffect(()=>{
        if(!data || data.length == 0){
            router.push('/404')
        }
        
    },[data])
    return (
        <>
            <section id={styles.dream}>
                <div className={styles.box}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <div className={styles.title}>
                                <p>Soi cầu</p>
                            </div>
                            <Posts category_slug={category_slug} data={data} setPageIndex={setPageIndex} />
                            <Pagination
                                defaultCurrent={pageIndex}
                                current={pageIndex}
                                onChange={(pageIndex) =>
                                    setPageIndex(pageIndex)
                                }
                                total={totalPage}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ThongTin

export async function getServerSideProps(ctx:GetServerSidePropsContext) {
    const category_slug = ctx.query.category_slug
    return {
        props: {
            category_slug: category_slug
        }
    }
}
