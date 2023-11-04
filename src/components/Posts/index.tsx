/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/Components/BangThongTin/index.module.scss'
import { getAllPostByCategory } from '@/services/api'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { openLoading } from '../../redux/action/loading'
import IDreamPost from '../../Interfaces/IDreamPost'
import Link from 'next/link'
const Posts = ({
    data,
    setPageIndex,
    category_slug
}: {
    data: IDreamPost[]
    setPageIndex: Dispatch<SetStateAction<number>>,
    category_slug: string
}) => {
    const router = useRouter()

    return (
        <>
            <div>
                {data?.map((item) => (
                    <div key={item._id} className={styles.main_content}>
                        <div className={styles.image}>
                            <img src={item.post_image} alt={item.post_src_thumb || item.post_slug} srcSet="" />
                        </div>
                        <div className={styles.title_summary}>
                            <Link href={`/${category_slug}/${item.post_slug}`}>
                                {item.post_title}
                            </Link>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.post_description,
                                }}
                            ></div>
                        </div>
                        <div className={styles.clearFloat}></div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Posts
