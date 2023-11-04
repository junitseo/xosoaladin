import { getSeoByLink } from '@/services/api'
import styles from '@/styles/pages/NhungToanTrang/index.module.scss'
import Head from 'next/head'
import parse from 'html-react-parser'
import React from 'react'
const AllIframe = ({ tags }: { tags: any }) => {
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/nhung-toan-trang"
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.allIframe}>
                <div className={styles.allIframeIntroduction}>
                    <p className={styles.allFrameTitle}>Code tham khảo</p>
                    <p>
                        {`<iframe src="https://xosoaladin.com/iframe"
                        width="500" height="2800" frameborder="0" scrolling="no"
                        id="iframe_xosothantai" name="iframe_xosothantai"></iframe>`}
                    </p>
                </div>
                <div className={styles.allIframeContent}>
                    <iframe
                        src="https://xosoaladin.com/iframe"
                        width="500"
                        height="2800"
                        id="iframe_xosothantai"
                        frameBorder={'none'}
                        scrolling="no"
                        name="iframe_xosothantai"
                    ></iframe>
                </div>
            </div>
        </>
    )
}

export default AllIframe

export async function getServerSideProps() {
    const params: any = {
        link: '/nhung-toan-trang',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
