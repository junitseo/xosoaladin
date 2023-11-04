import { getSeoByLink } from '@/services/api'
import styles from '@/styles/pages/GiaiMaGiacMo/index.module.scss'
import Head from 'next/head'
// import Posts from '@/components/Posts/index'
import { useState } from 'react'
import React from 'react'
import parse from 'html-react-parser'
// import { styles } from '@/styles/Home.module.css';
const LichSuQuayThuong = ({ tags }: { tags: any }) => {
    const [data, setData] = useState([])

    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/lich-quay-so-mo-thuong"
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
                                <h1>Lịch mở thưởng xổ số toàn quốc</h1>
                            </div>
                            <div className={styles.prizeDrawHistoryComponent}>
                                <h2>Lịch quay số mở thưởng toàn quốc</h2>
                                <table className={styles.table}>
                                    <tbody>
                                        <tr
                                            className={styles.tr}
                                            style={{
                                                color: 'white',
                                                background: 'rgb(153,51,51)',
                                            }}
                                        >
                                            <th className={styles.th}>
                                                Khu vực
                                            </th>
                                            <th className={styles.th}>
                                                Miền Nam
                                            </th>
                                            <th className={styles.th}>
                                                Miền Bắc
                                            </th>
                                            <th className={styles.th}>
                                                Miền Trung
                                            </th>
                                        </tr>
                                        <tr
                                            className={styles.tr}
                                            style={{
                                                color: 'red',
                                                background: 'yellow',
                                            }}
                                        >
                                            <th
                                                className={styles.th}
                                                style={{ width: '15%' }}
                                            >
                                                Giờ xổ số
                                            </th>
                                            <th className={styles.th}>
                                                {"16h15' -> 16h35'"}
                                            </th>
                                            <th className={styles.th}>
                                                {"19h15' -> 19h25'"}
                                            </th>
                                            <th className={styles.th}>
                                                {"17h15' -> 17h35'"}
                                            </th>
                                        </tr>
                                        {/* thu 2 */}

                                        <tr className={styles.tr}>
                                            <td className={styles.td}>Thứ 2</td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Tp. HCM</p>
                                                <p>Xổ Số Đồng Tháp</p>
                                                <p>Xổ Số Cà Mau</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Thủ Đô</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Thừa T. Huế</p>
                                                <p>Xổ Số Phú Yên</p>
                                            </td>
                                        </tr>
                                        {/* thu 3 */}

                                        <tr className={styles.tr}>
                                            <td className={styles.td}>Thứ 3</td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Bến Tre</p>
                                                <p>Xổ Số Vũng Tàu</p>
                                                <p>Xổ Số Bạc Liêu</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Thủ Đô</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Quảng Nam</p>
                                                <p>Xổ Số Đắc lắc</p>
                                            </td>
                                        </tr>
                                        {/* thu 4 */}
                                        <tr className={styles.tr}>
                                            <td className={styles.td}>Thứ 4</td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Đồng Nai</p>
                                                <p>Xổ Số Cần Thơ</p>
                                                <p>Xổ Số Sóc Trăng</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Thủ Đô</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Đà Nẵng</p>
                                                <p>Xổ Số Khánh Hòa</p>
                                            </td>
                                        </tr>
                                        {/* thu 5 */}
                                        <tr className={styles.tr}>
                                            <td className={styles.td}>Thứ 5</td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Tây Ninh</p>
                                                <p>Xổ Số An Giang</p>
                                                <p>Xổ Số Bình Thuận</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Thủ Đô</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Bình Định</p>
                                                <p>Xổ Số Quảng Bình</p>
                                                <p>Xổ Số Quảng Trị</p>
                                            </td>
                                        </tr>
                                        {/* thu 6 */}
                                        <tr className={styles.tr}>
                                            <td className={styles.td}>Thứ 6</td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Vĩnh Long</p>
                                                <p>Xổ Số Bình Dương</p>
                                                <p>Xổ Số Trà Vinh</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Thủ Đô</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Gia Lai</p>
                                                <p>Xổ Số Ninh Thuận</p>
                                            </td>
                                        </tr>
                                        {/* thu 7 */}
                                        <tr className={styles.tr}>
                                            <td className={styles.td}>Thứ 7</td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Tp. HCM</p>
                                                <p>Xổ Số Long An</p>
                                                <p>Xổ Số Hậu Giang</p>
                                                <p>Xổ Số Bình Phước</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Thủ Đô</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Đà Nẵng</p>
                                                <p>Xổ Số Quảng Ngãi</p>
                                                <p>Xổ Số Đắc Nông</p>
                                            </td>
                                        </tr>
                                        {/* CHu nhat */}
                                        <tr
                                            className={styles.tr}
                                            style={{
                                                background: data
                                                    ? 'rgb(153,51,51)'
                                                    : '',
                                            }}
                                        >
                                            <td className={styles.td}>
                                                Chủ Nhật
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Tiền Giang</p>
                                                <p>Xổ Số Kiên Giang</p>
                                                <p>Xổ Số Đà Lạt</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Thủ Đô</p>
                                            </td>
                                            <td className={styles.td}>
                                                <p>Xổ Số Khánh hòa</p>
                                                <p>Xổ Số Kon Tum</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <Posts data={data} /> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LichSuQuayThuong

export async function getServerSideProps() {
    const params: any = {
        link: '/lich-quay-so-mo-thuong',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
