import IMega from '@/src/Interfaces/IMega'
import { NextPage } from 'next'
import styles from '@/styles/Components/Mega/Mega.module.scss'
import IMegaComponent from '@/src/Interfaces/IMegaComponent'
import ResultBall from '../ResultBall/ResultBall'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'
// import ResultBall from '../ResultBall/ResultBall'

const XosoMega: NextPage<IMegaComponent> = ({ mega645 }) => {
    return (
        <div className={styles.mega}>
            <div className={styles.megaHeader}>
                <p className={styles.megaHeaderTitle}>
                    Xổ số mega ngày{' '}
                    {replaceDashFromDate(mega645.dayPrize || '')}
                </p>
            </div>
            <div className={styles.megaResult}>
                <div className={styles.megaResultBall}>
                    <ResultBall
                        number={mega645.number1}
                        backgroundColor={
                            'linear-gradient(to top right,#1d75a9 25%,#34a2e2 75%)'
                        }
                    />
                </div>
                <div className={styles.megaResultBall}>
                    <ResultBall
                        number={mega645.number2}
                        backgroundColor={
                            'linear-gradient(to top right,#a61eab 25%,#dd39e5 75%)'
                        }
                    />
                </div>
                <div className={styles.megaResultBall}>
                    <ResultBall
                        number={mega645.number3}
                        backgroundColor={
                            'linear-gradient(to top right,#3da91d 25%,#5de133 75%)'
                        }
                    />
                </div>
                <div className={styles.megaResultBall}>
                    <ResultBall
                        number={mega645.number4}
                        backgroundColor={
                            'linear-gradient(to top right,#c70013 25%,#ff1e37 75%)'
                        }
                    />
                </div>
                <div className={styles.megaResultBall}>
                    <ResultBall
                        number={mega645.number5}
                        backgroundColor={
                            'linear-gradient(to top right,#b29604 25%,#ebc514 75%)'
                        }
                    />
                </div>
                <div className={styles.megaResultBall}>
                    <ResultBall
                        number={mega645.number6}
                        backgroundColor={
                            'linear-gradient(to top right,#008578 25%,#0dc3ae 75%)'
                        }
                    />
                </div>
            </div>
            <p className={styles.megaResultPrize}>
                Giá trị jackpot:{' '}
                <span>
                    {mega645.jackpot?.replace('</em>', '').replace('<em>', '')}
                </span>
            </p>
            <div className={styles.megaResultTable}>
                <table>
                    <tbody>
                        <tr>
                            <td>Giải thưởng</td>
                            <td>Trùng khớp</td>
                            <td>Số lượng giải</td>
                            <td>Giá trị giải (Đồng)</td>
                        </tr>
                        <tr>
                            <td>Jackpot</td>
                            <td>6 số</td>
                            <td>
                                {mega645.jackpotWinner
                                    ? mega645.jackpotWinner
                                    : 0}
                            </td>
                            <td style={{ color: 'red', fontWeight: '600' }}>
                                {mega645?.jackpot
                                    ?.replace('<em>', '')
                                    .replace('</em>', '')}
                                đ
                            </td>
                        </tr>
                        <tr>
                            <td>Giải nhất</td>
                            <td>5 số</td>
                            <td>{mega645?.match5Winner}</td>
                            <td>
                                {mega645?.match5
                                    ?.replace('<em>', '')
                                    .replace('</em>', '')}
                                đ
                            </td>
                        </tr>
                        <tr>
                            <td>Giải nhì</td>
                            <td>4 số</td>
                            <td>{mega645?.match4Winner}</td>
                            <td>
                                {mega645?.match4
                                    ?.replace('<em>', '')
                                    .replace('</em>', '')}
                                đ
                            </td>
                        </tr>
                        <tr>
                            <td>Jackpot</td>
                            <td>3 số</td>
                            <td>{mega645?.match3Winner}</td>
                            <td>
                                {mega645?.match3
                                    ?.replace('<em>', '')
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

export default XosoMega
