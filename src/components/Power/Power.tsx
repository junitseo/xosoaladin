import IPower655 from '@/Interfaces/IPower655'
import styles from '@/styles/Components/Power/Power.module.scss'
import { NextPage } from 'next'
import ResultBall from '../ResultBall/ResultBall'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'

const Power: NextPage<{ power: IPower655 | undefined }> = (props: any) => {
    return (
        <div className={styles.power}>
            <div className={styles.powerHeader}>
                <p className={styles.powerHeaderTitle}>
                    Xổ số Power 6/55 ngày{' '}
                    {replaceDashFromDate(props.power?.dayPrize)}
                </p>
            </div>
            <div className={styles.powerResult}>
                <div className={styles.powerResultBall}>
                    <ResultBall
                        number={props.power?.number1}
                        backgroundColor={
                            'linear-gradient(to top right,#1d75a9 25%,#34a2e2 75%)'
                        }
                    />
                </div>
                <div className={styles.powerResultBall}>
                    <ResultBall
                        number={props.power?.number2}
                        backgroundColor={
                            'linear-gradient(to top right,#1d75a9 25%,#34a2e2 75%)'
                        }
                    />
                </div>
                <div className={styles.powerResultBall}>
                    <ResultBall
                        number={props.power?.number3}
                        backgroundColor={
                            'linear-gradient(to top right,#1d75a9 25%,#34a2e2 75%)'
                        }
                    />
                </div>
                <div className={styles.powerResultBall}>
                    <ResultBall
                        number={props.power?.number4}
                        backgroundColor={
                            'linear-gradient(to top right,#1d75a9 25%,#34a2e2 75%)'
                        }
                    />
                </div>
                <div className={styles.powerResultBall}>
                    <ResultBall
                        number={props.power?.number5}
                        backgroundColor={
                            'linear-gradient(to top right,#1d75a9 25%,#34a2e2 75%)'
                        }
                    />
                </div>
                <div className={styles.powerResultBall}>
                    <ResultBall
                        number={props.power?.number6}
                        backgroundColor={
                            'linear-gradient(to top right,#1d75a9 25%,#34a2e2 75%)'
                        }
                    />
                </div>
                <div className={styles.powerResultDivider}></div>
                <div className={styles.powerResultBall}>
                    <ResultBall
                        number={props.power?.number7}
                        backgroundColor={
                            'linear-gradient(to top right,#1d75a9 25%,#34a2e2 75%)'
                        }
                    />
                </div>
            </div>
            <p className={styles.powerResultPrize}>
                Giá trị jackpot 1: <span>{props.power?.jackpot1} đồng</span>
            </p>
            <p className={styles.powerResultPrize2}>
                Giá trị jackpot: <span>{props.power?.jackpot2} đồng</span>
            </p>
            <div className={styles.powerResultTable}>
                <table>
                    <tbody>
                        <tr>
                            <td>Giải thưởng</td>
                            <td>Trùng khớp</td>
                            <td>Số lượng giải</td>
                            <td>Giá trị giải (Đồng)</td>
                        </tr>
                        <tr>
                            <td>Jackpot1</td>
                            <td>6 số</td>
                            <td>{props.power?.jackpotWinner}</td>
                            <td style={{ color: 'red', fontWeight: '600' }}>
                                {props.power?.jackpot1
                                    ?.replace('<em>', '')
                                    .replace('</em>', '')}
                                đ
                            </td>
                        </tr>
                        <tr>
                            <td>Jackpot2</td>
                            <td>7 số</td>
                            <td>{props.power?.jackpot2Winner}</td>
                            <td style={{ color: 'red', fontWeight: '600' }}>
                                {props.power?.jackpot2
                                    ?.replace('<em>', '')
                                    .replace('</em>', '')}
                                đ
                            </td>
                        </tr>
                        <tr>
                            <td>Giải nhất</td>
                            <td>5 số</td>
                            <td>{props.power?.match3Winner}</td>
                            <td>
                                {'10.000.000'
                                    .replace('<em>', '')
                                    .replace('</em>', '')}
                                đ
                            </td>
                        </tr>
                        <tr>
                            <td>Giải nhì</td>
                            <td>4 số</td>
                            <td>{props.power?.match4Winner}</td>
                            <td>
                                {'300.000'
                                    .replace('<em>', '')
                                    .replace('</em>', '')}
                                đ
                            </td>
                        </tr>
                        <tr>
                            <td>Jackpot</td>
                            <td>3 số</td>
                            <td>{props.power?.match5Winner}</td>
                            <td>
                                {'30.000'
                                    .replace('<em>', '')
                                    .replace('</em>', '')}
                                đ
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Power
