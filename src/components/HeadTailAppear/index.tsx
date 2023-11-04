import { NextPage } from 'next/types'
import styles from '@/styles/Components/HeadTailAppear/index.module.scss'
import { provinces } from '@/mocks/provinces'
import { isNumeric } from '@/helpers/IsNumeric'

interface IHeadTailAppear {
    _id: string
    total: number
}

const HeadTailAppear: NextPage<{
    region?: number
    headAppear: IHeadTailAppear[]
    tailAppear: IHeadTailAppear[]
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
        <div className={styles.headTailAppear}>
            <p className={styles.headTailAppearTitle}>
                Thống kê đầu đuôi trong vòng 30 lần quay xổ số {region}
            </p>
            <div className={styles.headTailAppearTable}>
                <table>
                    <tbody>
                        {props.headAppear
                            ?.filter((xs) => isNumeric(xs._id))
                            .map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td
                                            style={{ color: 'red' }}
                                        >{`${item._id}x`}</td>
                                        <td>{item.total} lần</td>
                                    </tr>
                                )
                            })}
                        {props.tailAppear
                            ?.filter((xs) => isNumeric(xs._id))
                            .map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td
                                            style={{ color: '#00aecd' }}
                                        >{`x${item._id}`}</td>
                                        <td>{item.total} lần</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HeadTailAppear
