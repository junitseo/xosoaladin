import { closeLoading, openLoading } from '@/redux/action/loading'
import { getPostsSideBar } from '@/services/api'
import styles from '@/styles/Components/InformationBox/index.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const InformationBox = ({
    data,
}: {
    data: {
        _id: string
        post_title: string
        post_slug: string
        post_image: string
    }[]
}) => {
    return (
        <div className={styles.right}>
            <ul>
                {data?.map((item) => (
                    <li key={item._id}>
                        <a href={`/thong-tin/${item.post_slug}`}>
                            {item.post_title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default InformationBox
