import { NextPage } from 'next/types'
import styles from '@/styles/Components/SpecialStatsTableMnMt/SpecialStatsTableMnMt.module.scss'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import IXosoResult from '@/Interfaces/IXosoResult'
import { provinces } from '@/mocks/provinces'

interface ISpecialStatistic {
    specialStatistic: IXosoResult[]
    arrayDate: string[]
    region: number
}

const SpecialStatsTableMnMt: NextPage<ISpecialStatistic> = (props) => {
    const thisDate = new Date()
    return (
        <div className={styles.specialStatsTableMnMt}>
            <h2 className={styles.specialStatsTableMnMtTitle}>
                Thống kê giải đặc biệt xổ số{' '}
                {props.region == 2 ? 'Miền Trung' : 'Miền Nam'} từ{' '}
                {addingZeroToMonth(
                    new Date(
                        new Date(thisDate).setDate(
                            new Date(thisDate).getDate() - 7
                        )
                    ),
                    '/'
                )}{' '}
                tới {addingZeroToMonth(new Date(), '/')}
            </h2>
            <div className={styles.specialStatsTableMnMtContent}>
                <table>
                    <tbody>
                        <tr>
                            <td>Ngày</td>
                            <td>Đài</td>
                            <td>Đặc Biệt</td>
                        </tr>
                        {props.arrayDate.map((date) => {
                            return (
                                <tr key={date}>
                                    <td>
                                        {props.region == 2 ? 'XSMT' : 'XSMN'}{' '}
                                        ngày {date}
                                    </td>
                                    <td>
                                        {props.specialStatistic.map(
                                            (statistic, index) => {
                                                if (
                                                    statistic.dayPrize == date
                                                ) {
                                                    return (
                                                        <span key={index}>
                                                            {
                                                                provinces[
                                                                    statistic
                                                                        .provinceId
                                                                ]
                                                            }
                                                        </span>
                                                    )
                                                }
                                            }
                                        )}
                                    </td>
                                    <td>
                                        {props.specialStatistic.map(
                                            (statistic, index) => {
                                                if (
                                                    statistic.dayPrize == date
                                                ) {
                                                    const thisNumber =
                                                        statistic.number
                                                            .trim()
                                                            .split('')
                                                    return (
                                                        <span key={index}>
                                                            {`${thisNumber[0]}${thisNumber[1]}${thisNumber[2]}`}
                                                            <span
                                                                style={{
                                                                    color: 'red',
                                                                    display:
                                                                        'inline',
                                                                }}
                                                            >{`${thisNumber[3]}${thisNumber[4]}`}</span>
                                                        </span>
                                                    )
                                                }
                                            }
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SpecialStatsTableMnMt
