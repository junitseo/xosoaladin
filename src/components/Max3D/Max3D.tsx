import replaceDashFromDate from '@/helpers/replaceDashFromDate'
import IMax3DComponent from '@/src/Interfaces/IMax3DComponent'
import IMax3DProComponent from '@/src/Interfaces/IMax3DProComponent'
import styles from '@/styles/Components/Max3D/Max3D.module.scss'
import { NextPage } from 'next/types'

const Max3DPro: NextPage<IMax3DComponent> = (props: IMax3DComponent) => {
    return (
        <div className={styles.max3d}>
            <div className={styles.max3dHeader}>
                <p className={styles.max3dHeaderTitle}>
                    Xổ số Max3D ngày{' '}
                    {replaceDashFromDate(props.max3d?.dayPrize || '')}
                </p>
            </div>
            {/* <p className={styles.max3dSmallTitle}>
        Kỳ quay thưởng ngày {props.max3d?.dayPrize}
      </p> */}
            <div className={styles.max3dTable}>
                <table>
                    <tbody>
                        <tr>
                            <td>Giải</td>
                            <td>Dãy số trúng</td>
                            <td>SL</td>
                            <td>Giá trị</td>
                        </tr>
                        <tr>
                            <td>Nhất</td>
                            <td style={{ display: 'flex' }}>
                                <span style={{ color: 'red' }}>
                                    {props.max3d?.firstPrize1}
                                </span>
                                <span style={{ color: 'red' }}>
                                    {props.max3d?.firstPrize1}
                                </span>
                            </td>
                            <td>{props.max3d?.firstTotalWinners}</td>
                            <td>15TR</td>
                        </tr>
                        <tr>
                            <td>Nhì</td>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3d?.secondPrize1}</span>
                                <span>{props.max3d?.secondPrize2}</span>
                                <span>{props.max3d?.secondPrize3}</span>
                                <span>{props.max3d?.secondPrize4}</span>
                            </td>
                            <td>{props.max3d?.secondTotalWinners}</td>
                            <td>6.5TR</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>Ba</td>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3d?.thirdPrize1}</span>
                                <span>{props.max3d?.thirdPrize2}</span>
                                <span>{props.max3d?.thirdPrize3}</span>
                            </td>
                            <td rowSpan={2}>
                                {props.max3d?.thirdTotalWinners}
                            </td>
                            <td rowSpan={2}>3TR</td>
                        </tr>
                        <tr>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3d?.thirdPrize4}</span>
                                <span>{props.max3d?.thirdPrize5}</span>
                                <span>{props.max3d?.thirdPrize6}</span>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>KK</td>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3d?.resultsConsolation1}</span>
                                <span>{props.max3d?.resultsConsolation2}</span>
                                <span>{props.max3d?.resultsConsolation3}</span>
                                <span>{props.max3d?.resultsConsolation4}</span>
                            </td>
                            <td rowSpan={2}>
                                {props.max3d?.consolationTotalWinners}
                            </td>
                            <td rowSpan={2}>100N</td>
                        </tr>
                        <tr>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3d?.resultsConsolation5}</span>
                                <span>{props.max3d?.resultsConsolation6}</span>
                                <span>{props.max3d?.resultsConsolation7}</span>
                                <span>{props.max3d?.resultsConsolation8}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Max3DPro
