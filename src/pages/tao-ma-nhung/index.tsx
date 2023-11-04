import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import reverseDate from '@/helpers/reverseDate'
import { getSeoByLink } from '@/services/api'
import styles from '@/styles/pages/IframeGetting/index.module.scss'
import { GetServerSidePropsContext } from 'next/types'
import Head from 'next/head'
import React, { useState } from 'react'
import parse from 'html-react-parser'

const IframeGetting = ({ tags }: { tags: any }) => {
    const [province, setProvince] = useState('mn')
    const [width, setWidth] = useState('500px')
    const [date, setDate] = useState(new Date())

    let keyXoso = 'xsmn'
    if (province === 'mn') {
        keyXoso = 'xsmn'
    } else if (province === 'mb') {
        keyXoso = 'xsmb'
    } else {
        keyXoso = 'xsmt'
    }

    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/tao-ma-nhung"
                />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.iframeGetting}>
                <div className={styles.iframeGettingTitle}>
                    <p>Chèn KQXS vào Website, Blog của bạn</p>
                </div>
                <div className={styles.iframeGettingContent}>
                    <p className={styles.iframGettingNote}>
                        Chọn miền mặc định, hiệu chỉnh và lấy bảng KQXS phù hợp
                        với khoản trống trên website của bạn. Ngoài ra bạn cũng
                        có thể tùy biến lại code đễ có được kết quả vừa ý nhất!
                        Xem thêm demo tham khảo
                    </p>
                    <div style={{ marginTop: '15px' }}>
                        <label>Chọn miền: </label>
                        <select
                            onChange={(e) => setProvince(e.target.value)}
                            value={province}
                            id="choose-province"
                        >
                            <option value={'mn'}>Miền Nam</option>
                            <option value={'mb'}>Miền Bắc</option>
                            <option value={'mt'}>Miền Trung</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <label>Nhập độ rộng (px): </label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <label>Nhập ngày tháng năm: </label>
                        <input
                            type="date"
                            onChange={(e) => setDate(new Date(e.target.value))}
                        />
                    </div>
                </div>
                <div
                    className={styles.iframeCode}
                    style={{ marginTop: '10px' }}
                >
                    <label>Mã nhúng: </label>
                    <p style={{ color: '#808080', marginTop: '10px' }}>
                        {`<iframe src="https://xosoaladin.com/iframe/${keyXoso}?date=${addingZeroToMonth(
                            new Date(date)
                        )}" width="${width}"
                        height="800" frameborder="0" scrolling="auto" id="iframe_xosothantai"
                        name="iframe_xosothantai"></iframe>`}
                    </p>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <iframe
                        src={`https://xosoaladin.com/iframe/${keyXoso}?date=${addingZeroToMonth(
                            new Date(date)
                        )}`}
                        width={`${width}`}
                        height="800"
                        frameBorder={'0'}
                        id="iframe_xosothantai"
                        scrolling="auto"
                        name="iframe_xosothantai"
                    ></iframe>
                </div>
            </div>
        </>
    )
}

export default IframeGetting

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/tao-ma-nhung',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
