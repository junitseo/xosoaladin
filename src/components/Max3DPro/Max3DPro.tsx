import IMax3DProComponent from '@/Interfaces/IMax3DProComponent'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'
import styles from '@/styles/Components/Max3D/Max3D.module.scss'
import { NextPage } from 'next/types'

const Max3DPro: NextPage<IMax3DProComponent> = (props: IMax3DProComponent) => {
    return (
        <div className={styles.max3d}>
            <div className={styles.max3dHeader}>
                <p className={styles.max3dHeaderTitle}>
                    Xổ số Max3D Pro ngày{' '}
                    {replaceDashFromDate(props.max3dpro?.dayPrize || '')}
                </p>
            </div>
            {/* <p className={styles.max3dSmallTitle}>
        Kỳ quay thưởng ngày {props.max3dpro?.dayPrize}
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
                            <td>Đặc Biệt</td>
                            <td style={{ display: 'flex' }}>
                                <span style={{ color: 'red' }}>
                                    {props.max3dpro?.specialPrize1}
                                </span>
                                <span style={{ color: 'red' }}>
                                    {props.max3dpro?.specialPrize2}
                                </span>
                            </td>
                            <td>{props.max3dpro?.specialPrizeWinners}</td>
                            <td>2 Tỷ</td>
                        </tr>
                        <tr>
                            <td>Phụ Đặc Biệt</td>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3dpro?.subSpecialPrize1}</span>
                                <span>{props.max3dpro?.subSpecialPrize2}</span>
                            </td>
                            <td>{props.max3dpro?.subSpecialPrizeWinners}</td>
                            <td>400TR</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>Nhất</td>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3dpro?.firstPrize1}</span>
                                <span>{props.max3dpro?.firstPrize2}</span>
                            </td>
                            <td rowSpan={2}>
                                {props.max3dpro?.thirdPrizeWinners}
                            </td>
                            <td rowSpan={2}>30TR</td>
                        </tr>
                        <tr>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3dpro?.firstPrize3}</span>
                                <span>{props.max3dpro?.firstPrize4}</span>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>Nhì</td>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3dpro?.secondPrize1}</span>
                                <span>{props.max3dpro?.secondPrize2}</span>
                                <span>{props.max3dpro?.secondPrize3}</span>
                            </td>
                            <td rowSpan={2}>
                                {props.max3dpro?.secondPrizeWinners}
                            </td>
                            <td rowSpan={2}>10TR</td>
                        </tr>
                        <tr>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3dpro?.secondPrize4}</span>
                                <span>{props.max3dpro?.secondPrize5}</span>
                                <span>{props.max3dpro?.secondPrize6}</span>
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>Ba</td>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3dpro?.thirdPrize1}</span>
                                <span>{props.max3dpro?.thirdPrize2}</span>
                                <span>{props.max3dpro?.thirdPrize3}</span>
                                <span>{props.max3dpro?.thirdPrize4}</span>
                            </td>
                            <td rowSpan={2}>
                                {props.max3dpro?.thirdPrizeWinners}
                            </td>
                            <td rowSpan={2}>4TR</td>
                        </tr>
                        <tr>
                            <td style={{ display: 'flex' }}>
                                <span>{props.max3dpro?.thirdPrize5}</span>
                                <span>{props.max3dpro?.thirdPrize6}</span>
                                <span>{props.max3dpro?.thirdPrize7}</span>
                                <span>{props.max3dpro?.thirdPrize8}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Max3DPro
