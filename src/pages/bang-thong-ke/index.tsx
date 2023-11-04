import HeaderXosoTable from '@/components/HeaderXosoTable'
import { GetServerSidePropsContext } from 'next/types'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/pages/BangXoso/index.module.scss'
import Link from 'next/link'
import FormLo from '@/components/BangThongKe/FormLo'
import FormGan from '@/components/BangThongKe/FormGan'
import FormTanSuat from '@/components/BangThongKe/FormTanSuat'
import { provinces } from '@/mocks/provinces'
import { prize } from '@/mocks/prize'
import moment from 'moment'
import reverseDate from '@/helpers/reverseDate'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import TopAppearTable from '@/components/TopAppearTable'
import HeadTailAppear from '@/components/HeadTailAppear'
import { getSeoByLink } from '@/services/api'
import Head from 'next/head'
import parse from 'html-react-parser'

const Gancucdai = (props: {
    type: Number
    province: Number
    region: Number
    tags: any
}) => {
    const [sortBy, setSortBy] = useState<'province' | 'region'>('province')
    const [type, setType] = useState(props.type)
    const [province, setProvince] = useState(props.province)
    const [region, setRegion] = useState(props.region)
    const [resultFormLo, setResultFormLo] = useState<any>(null)
    const [resultFormGan, setResultFormGan] = useState<any>(null)
    const [resultTanSuat, setResultTanSuat] = useState<any>()

    useEffect(() => {
        setType(props.type)
    }, [props.type, props.province, props.region])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={`https://xosoaladin.com/bang-thong-ke`}
                />
                {props.tags?.map((tag, index) => (
                    <React.Fragment key={index}>
                        {parse(tag.value)}
                    </React.Fragment>
                ))}
            </Head>
            <div>
                <HeaderXosoTable />
                <div className={styles.headerTable}>
                    <h2 className={styles.headerTableTitle}>
                        Thống kê gan cực đại xổ số
                    </h2>
                    <div className={styles.headerTableOption}>
                        <p
                            className={
                                type == 1 ? styles.headerTableOptionActive : ''
                            }
                        >
                            <Link href={'/bang-thong-ke?type=1'}>
                                Thống kê Lô
                            </Link>
                        </p>
                        <p
                            className={
                                type == 2 ? styles.headerTableOptionActive : ''
                            }
                        >
                            <Link href={'/bang-thong-ke?type=2'}>
                                Kiểm tra gan cực đại
                            </Link>
                        </p>
                        <p
                            className={
                                type == 3 ? styles.headerTableOptionActive : ''
                            }
                        >
                            <Link href={'/bang-thong-ke?type=3'}>
                                Thống kê tần suất
                            </Link>
                        </p>
                    </div>
                    <div className={styles.headerTableStatistic}>
                        <div className={styles.headerTableStatisticOption}>
                            <div>
                                <input
                                    onClick={() => setSortBy('region')}
                                    checked={sortBy == 'region'}
                                    type="radio"
                                />
                                <span>Thống kê theo miền</span>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    onClick={() => setSortBy('province')}
                                    checked={sortBy == 'province'}
                                />
                                <span>Thống kê theo tỉnh</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerTableStatisticForm}>
                        {type == 1 && (
                            <FormLo
                                setResultFormLo={setResultFormLo}
                                sortBy={sortBy}
                            />
                        )}
                        {type == 2 && (
                            <FormGan
                                setResultFormGan={setResultFormGan}
                                sortBy={sortBy}
                            />
                        )}
                        {type == 3 && (
                            <FormTanSuat
                                setResultTanSuat={setResultTanSuat}
                                sortBy={sortBy}
                            />
                        )}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        {type == 1 && resultFormLo && (
                            <div className={styles.headerTableStatisticFormLo}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Thống kê lô</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultFormLo?.length == 0 && (
                                            <tr>
                                                <td
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontSize: '14',
                                                    }}
                                                    colSpan={2}
                                                >
                                                    Không có kết quả
                                                </td>
                                            </tr>
                                        )}
                                        {resultFormLo
                                            ?.reverse()
                                            ?.map((item: any) => {
                                                return (
                                                    item.provinceId && (
                                                        <tr>
                                                            <td width={'30%'}>
                                                                <p
                                                                    style={{
                                                                        textAlign:
                                                                            'center',
                                                                        fontSize:
                                                                            '12px',
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    {
                                                                        provinces[
                                                                            item
                                                                                .provinceId
                                                                        ]
                                                                    }
                                                                </p>
                                                                <p
                                                                    style={{
                                                                        textAlign:
                                                                            'center',
                                                                        fontSize:
                                                                            '12px',
                                                                        color: '#39C',
                                                                        marginTop:
                                                                            '5px',
                                                                    }}
                                                                >
                                                                    {
                                                                        item.dayPrize
                                                                    }
                                                                </p>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    fontSize:
                                                                        '14px',
                                                                }}
                                                                width={'70%'}
                                                            >
                                                                Giải{' '}
                                                                {
                                                                    prize[
                                                                        item
                                                                            .prizeId
                                                                    ].name
                                                                }
                                                                :{' '}
                                                                <span
                                                                    style={{
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    {
                                                                        item.number
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {type == 2 && resultFormGan != null && (
                            <div className={styles.headerTableStatisticFormLo}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan={4}>Thống kê Gan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!resultFormGan.number && (
                                            <tr>
                                                <td
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontSize: '14',
                                                    }}
                                                    colSpan={4}
                                                >
                                                    Không có kết quả
                                                </td>
                                            </tr>
                                        )}
                                        {resultFormGan.number && (
                                            <>
                                                <tr>
                                                    <td
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '12px',
                                                        }}
                                                        width={'25%'}
                                                    >
                                                        Gan cực đại
                                                    </td>
                                                    <td
                                                        style={{
                                                            fontSize: '12px',
                                                        }}
                                                        colSpan={3}
                                                    >
                                                        {moment(
                                                            new Date()
                                                        ).diff(
                                                            moment(
                                                                reverseDate(
                                                                    resultFormGan?.dayPrize
                                                                )
                                                            ),
                                                            'days'
                                                        )}{' '}
                                                        ngày không xuất hiện
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '12px',
                                                        }}
                                                        width={'25%'}
                                                    >
                                                        Từ ngày:
                                                    </td>
                                                    <td
                                                        style={{
                                                            fontSize: '12px',
                                                        }}
                                                    >
                                                        {
                                                            resultFormGan?.dayPrize
                                                        }
                                                    </td>
                                                    <td
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '12px',
                                                        }}
                                                        width={'25%'}
                                                    >
                                                        Đến ngày
                                                    </td>
                                                    <td
                                                        style={{
                                                            fontSize: '12px',
                                                        }}
                                                    >
                                                        {addingZeroToMonth(
                                                            new Date(),
                                                            '/'
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style={{
                                                            fontSize: '12px',
                                                        }}
                                                        colSpan={4}
                                                    >
                                                        Xuất hiện ngày cuối{' '}
                                                        {
                                                            resultFormGan?.dayPrize
                                                        }{' '}
                                                        đến{' '}
                                                        {addingZeroToMonth(
                                                            new Date(),
                                                            '/'
                                                        )}{' '}
                                                        là{' '}
                                                        {moment(
                                                            new Date()
                                                        ).diff(
                                                            moment(
                                                                reverseDate(
                                                                    resultFormGan?.dayPrize
                                                                )
                                                            ),
                                                            'days'
                                                        )}{' '}
                                                        ngày
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {type == 3 && (
                            <>
                                {resultTanSuat?.topByRegion && (
                                    <TopAppearTable
                                        topAppear={resultTanSuat?.topByRegion}
                                    />
                                )}
                                {(resultTanSuat?.allByTail ||
                                    resultTanSuat?.allByHead) && (
                                    <HeadTailAppear
                                        tailAppear={resultTanSuat?.allByTail}
                                        headAppear={resultTanSuat?.allByHead}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gancucdai

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const params: any = {
        link: '/dien-toan/bang-thong-ke',
    }
    const type = ctx.query.type ? Number(ctx.query.type) : 1
    const province = ctx.query.province ? Number(ctx.query.province) : 0
    const region = ctx.query.region ? Number(ctx.query.region) : 0
    const [seo] = await Promise.all([getSeoByLink(params)])

    return {
        props: {
            type,
            province,
            region,
            tags: seo?.data?.data?.tags || [],
        },
    }
}
