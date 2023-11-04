import { NextPage } from 'next/types'
import styles from '@/styles/Components/SpecialStatisticTable/index.module.scss'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import IXosoResult from '@/Interfaces/IXosoResult'
import React from 'react'

interface ISpecialStatistic {
    specialStatistic: IXosoResult[]
    arrayDate: string[]
}

const SpecialStatisticTable: NextPage<ISpecialStatistic> = (props) => {
    console.log(props.specialStatistic)
    const today = new Date()
    const mappingArray: number[] = []
    props.arrayDate.map((item, index) => mappingArray.push(index))
    return (
        <div className={styles.specialTable}>
            <h2 className={styles.specialTableTitle}>
                Thống kê giải đặc biệt xổ số Miền Bắc từ{' '}
                {addingZeroToMonth(
                    new Date(today.setDate(today.getDate() - 30)),
                    '/'
                )}{' '}
                tới {addingZeroToMonth(new Date(), '/')}
            </h2>
            <div className={styles.specialTableContent}>
                <table>
                    <tbody>
                        <tr>
                            <td>Ngày</td>
                            <td>Giải ĐB</td>
                            <td>Ngày</td>
                            <td>Giải ĐB</td>
                            <td>Ngày</td>
                            <td>Giải ĐB</td>
                        </tr>
                        {mappingArray.map((item, index) => {
                            return (
                                <tr key={index}>
                                    {props.arrayDate
                                        .slice(item * 3, item * 3 + 3)
                                        .map((item, index) => {
                                            return props.specialStatistic.map(
                                                (statistic) => {
                                                    const thisNumber =
                                                        statistic.number.trim()
                                                    if (
                                                        statistic.dayPrize ==
                                                        item
                                                    ) {
                                                        return (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                <td>{item}</td>
                                                                <td>
                                                                    {`${
                                                                        thisNumber.split(
                                                                            ''
                                                                        )[0]
                                                                    }${
                                                                        thisNumber.split(
                                                                            ''
                                                                        )[1]
                                                                    }${
                                                                        thisNumber.split(
                                                                            ''
                                                                        )[2]
                                                                    }`}
                                                                    <span
                                                                        style={{
                                                                            color: 'red',
                                                                        }}
                                                                    >{`${
                                                                        thisNumber.split(
                                                                            ''
                                                                        )[3]
                                                                    }${
                                                                        thisNumber.split(
                                                                            ''
                                                                        )[4]
                                                                    }`}</span>
                                                                </td>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                }
                                            )
                                        })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SpecialStatisticTable
