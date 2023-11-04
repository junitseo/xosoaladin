import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import getProvincesXsMn from '@/helpers/getProvincesXsMn'
import getProvincesXsmt from '@/helpers/getProvincesXsmt'
import reverseDate from '@/helpers/reverseDate'
import { provincesSeo } from '@/mocks/provinceSeo'
import { provinces } from '@/mocks/provinces'
import { provincesSlug } from '@/mocks/provincesSlug'
import styles from '@/styles/Components/HeaderXosoTable/index.module.scss'
import Link from 'next/link'

const HeaderXosoTable = () => {
    return (
        <div className={styles.headerXosoTable}>
            <table>
                <thead>
                    <tr>
                        <th>Lịch xổ số {addingZeroToMonth(new Date(), '/')}</th>
                        <th>Thống kê tần suất xổ số</th>
                        <th>Gan cực đại</th>
                        <th>Thống kê loto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td width={'25%'} style={{ fontWeight: 'bold' }}>
                            {' '}
                            <Link
                                href={`/kqxs/xo-so-mien-bac?date=${reverseDate(
                                    addingZeroToMonth(new Date())
                                )}`}
                            >
                                Xố số miền Bắc{' '}
                            </Link>
                        </td>
                        <td width={'25%'}>
                            <Link href={`/thong-ke/mien-bac`}>
                                Tần suất miền Bắc
                            </Link>
                        </td>
                        <td width={'25%'}>
                            <Link href={`/bang-thong-ke`}>GCĐ miền Bắc</Link>
                        </td>
                        <td width={'25%'}>
                            <Link href={`/bang-thong-ke`}>
                                Xem loto miền Bắc
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>
                            {' '}
                            <Link
                                href={`/kqxs/xo-so-mien-trung?date=${reverseDate(
                                    addingZeroToMonth(new Date())
                                )}`}
                            >
                                Xố số miền Trung
                            </Link>
                        </td>
                        <td>
                            {' '}
                            <Link href={`/thong-ke/mien-trung`}>
                                Tần suất miền Trung
                            </Link>
                        </td>
                        <td>
                            <Link href={`/bang-thong-ke`}>GCĐ miền Trung</Link>
                        </td>
                        <td>
                            <Link href={`/bang-thong-ke`}>
                                Xem loto miền Trung
                            </Link>
                        </td>
                    </tr>
                    {getProvincesXsmt(
                        reverseDate(addingZeroToMonth(new Date()))
                    ).map((item: number) => {
                        return (
                            <tr>
                                <td>
                                    {' '}
                                    <Link
                                        href={`/kqxs/${
                                            provincesSlug[item]
                                        }?date=${reverseDate(
                                            addingZeroToMonth(new Date())
                                        )}`}
                                    >
                                        Xổ số {provinces[item]}
                                    </Link>
                                </td>
                                <td>
                                    {' '}
                                    <Link href={`/thong-ke/${item}`}>
                                        Tần suất xs {provinces[item]}
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/bang-thong-ke`}>
                                        GCĐ {provinces[item]}
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/bang-thong-ke`}>
                                        Xem loto {provinces[item]}
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>
                            {' '}
                            <Link
                                href={`/kqxs/xo-so-mien-nam?date=${reverseDate(
                                    addingZeroToMonth(new Date())
                                )}`}
                            >
                                Xố số miền Nam
                            </Link>
                        </td>
                        <td>
                            <Link href={`/thong-ke/mien-nam`}>
                                Tần suất miền Nam
                            </Link>
                        </td>
                        <td>
                            <Link href={`/bang-thong-ke`}>GCĐ miền Nam</Link>
                        </td>
                        <td>
                            <Link href={`/bang-thong-ke`}>
                                Xem loto miền Nam
                            </Link>
                        </td>
                    </tr>
                    {getProvincesXsMn(
                        reverseDate(addingZeroToMonth(new Date()))
                    ).map((item: number) => {
                        return (
                            <tr>
                                <td>
                                    {' '}
                                    <Link
                                        href={`/kqxs/${
                                            provincesSlug[item]
                                        }?date=${reverseDate(
                                            addingZeroToMonth(new Date())
                                        )}`}
                                    >
                                        Xổ số {provinces[item]}
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/thong-ke/${item}`}>
                                        Tần suất xs {provinces[item]}
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/bang-thong-ke`}>
                                        GCĐ {provinces[item]}
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/bang-thong-ke`}>
                                        Xem loto {provinces[item]}
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default HeaderXosoTable
