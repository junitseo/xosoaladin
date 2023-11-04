import { NextPage } from 'next/types'
import styles from '@/styles/Components/TopAppearTable/index.module.scss'
import ITopAppearTable from '@/Interfaces/ITopAppear'
import { provinces } from '@/mocks/provinces'

const TopAppearTable: NextPage<{
    topAppear: ITopAppearTable[]
    region?: number
    provinceId?: number
}> = (props) => {
    let region = ''
    if (props.region) {
        region =
            props.region == 1
                ? 'Miền Bắc'
                : props.region == 2
                ? 'Miền Trung'
                : 'Miền Nam'
    }
    if (props.provinceId) {
        region = provinces[props.provinceId]
    }
    return (
        <div className={styles.topAppearTable}>
            <p className={styles.topAppearTableTitle}>
                1 cặp số xuất hiện nhiều nhất trong vòng 30 lần quay xổ số{' '}
                {region}
            </p>
            <div className={styles.topAppearTableContent}>
                <table>
                    <tbody>
                        {props.topAppear?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td width={'15%'}>{item._id}</td>
                                    <td width={'15%'}>{item.total}</td>
                                    <td width={'70%'}>
                                        <div
                                            className={
                                                styles.topAppearTableContentProgress
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.topAppearTableContentProgressBar
                                                }
                                                style={{
                                                    width: `${item.total}%`,
                                                }}
                                            ></div>
                                        </div>
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

export default TopAppearTable
