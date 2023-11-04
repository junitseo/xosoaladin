import styles from '@/styles/pages/Somo/index.module.scss'
import { hundredNumber } from '@/mocks/SoMo'
import { FaRegHandPointRight } from 'react-icons/fa'
import React, { useState } from 'react'
import somoLode from '@/mocks/somoLode'
import { GetServerSidePropsContext } from 'next/types'
import { getSeoByLink } from '@/services/api'
import parse from 'html-react-parser'
import Head from 'next/head'

const Somo = ({ tags }: { tags: any }) => {
    const [search, setSearch] = useState('')

    const listSearch = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'g',
        'h',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'x',
        'y',
    ]
    return (
        <>
            <Head>
                <link rel="canonical" href="https://xosoaladin.com/so-mo" />
                {tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div className={styles.somo}>
                <h1 className={styles.somoTitle}>
                    {' '}
                    Sổ mơ lô đề - Giải mã giấc mơ lô đề
                </h1>
                <p className={styles.somoDescription}>
                    Bạn hay nằm mơ và băn khoăn với giấc mơ gặp phải thì nên
                    chọn con số nào thích hợp. Để giáp đáp cho các giấc mơ của
                    bạn, trang Sổ mơ tổng hợp hơn 1.000 bộ số đẹp được giải
                    nghĩa tương ứng với hơn 1.000 giấc mơ bạn gặp phải thường
                    ngày đó. Với công cụ tra cứu trực quan và chính xác này sẽ
                    giúp bạn tra cứu nhanh được ý nghĩa mà những giấc mơ mình
                    gặp phải hàng ngày.
                </p>
                <table>
                    <thead>
                        <tr style={{ background: 'green' }}>
                            <th
                                style={{
                                    textAlign: 'center',
                                    padding: '8px',
                                    borderRadius: '8px 8px 0px 0px',
                                    color: 'white',
                                }}
                                colSpan={3}
                            >
                                Bảng tra cứu bộ số đẹp theo giấc mơ
                            </th>
                        </tr>
                        <tr style={{ background: '#ffffcc' }}>
                            <th
                                style={{
                                    padding: '8px',
                                    textAlign: 'start',
                                    fontSize: '14px',
                                    color: 'black',
                                    fontWeight: 600,
                                }}
                                colSpan={3}
                            >
                                Tìm <FaRegHandPointRight />{' '}
                                {listSearch.map((item, index) => (
                                    <>
                                        <span
                                            onClick={() => setSearch(item)}
                                            className={styles.alphabetSearch}
                                            style={
                                                search == item
                                                    ? {
                                                          cursor: 'pointer',
                                                          color: 'red',
                                                      }
                                                    : { cursor: 'pointer' }
                                            }
                                        >{` ${item.toUpperCase()} `}</span>{' '}
                                        {index != listSearch.length - 1
                                            ? `|`
                                            : ''}{' '}
                                    </>
                                ))}
                            </th>
                        </tr>
                        <tr>
                            <th>Thứ tự</th>
                            <th>Tên giấc mơ</th>
                            <th>Bộ số tương ứng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {somoLode
                            .filter((item) =>
                                search
                                    ? item.name?.[0].toLowerCase() ==
                                      search.toLowerCase()
                                    : item
                            )
                            .map((item, index) => {
                                return (
                                    <tr>
                                        <td width={'20%'}>{index + 1}</td>
                                        <td width={'40%'}>{item.name}</td>
                                        <td width={'40%'}>{item.number}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Somo

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const params: any = {
        link: '/so-mo',
    }
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            tags: seo?.data?.data?.tags || [],
        },
    }
}
