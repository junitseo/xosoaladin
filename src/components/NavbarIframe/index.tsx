import styles from '@/styles/Components/NavbarIframe/index.module.scss'
import Link from 'next/link'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useState } from 'react'
import { region } from '../../mocks/region'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import { useRouter } from 'next/router'
import compareDate from '@/helpers/compareDate'
import reverseDate from '@/helpers/reverseDate'
import compareDateEqual from '@/helpers/compareDateEqual'
import { provincesSlug } from '@/mocks/provincesSlug'

const NavbarIframe = () => {
    const router = useRouter()
    const handleSetDateOfWeek = (day: number, region: number): void => {
        let url = 'xo-so-mien-nam'
        if (region == 2) {
            url = 'xo-so-mien-trung'
        } else if (region == 1) {
            url = 'xo-so-mien-bac'
        }
        let dateXoso = ''
        let thisDate = 0
        let dateChosen = 0
        if (day != 8) {
            if (day == 8) {
                dateChosen = 7
            } else {
                dateChosen = day
            }
            thisDate = new Date().getDay()
            dateXoso = addingZeroToMonth(
                new Date(
                    new Date().setDate(
                        dateChosen - thisDate + new Date().getDate()
                    )
                )
            )
            if (compareDateEqual(new Date(reverseDate(dateXoso)), new Date()))
                dateXoso = addingZeroToMonth(
                    new Date(
                        new Date(reverseDate(dateXoso)).setDate(
                            new Date(reverseDate(dateXoso)).getDate() - 7
                        )
                    )
                )
        } else {
            if (new Date().getHours() >= 19) {
                dateXoso = addingZeroToMonth(new Date())
            } else {
                dateXoso = addingZeroToMonth(
                    new Date(new Date().setDate(new Date().getDate() - 1))
                )
            }
        }
        router.push(`/kqxs/${url}?date=${dateXoso}`)
    }
    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.navbar}>
                <ul>
                    <li>
                        <Link target='_parent' href={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link target='_parent' href={'#'}>Trực tiếp</Link>
                        <ul className={styles.navbarLv2}>
                            <li>
                                <Link target='_parent' href={'/truc-tiep/xo-so-mien-nam'}>
                                    Xổ số Miền Nam{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                            <li>
                                <Link target='_parent' href={'/truc-tiep/xo-so-mien-bac'}>
                                    Xổ số Miền Bắc{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                            <li>
                                <Link target='_parent' href={'/truc-tiep/xo-so-mien-trung'}>
                                    Xổ số Miền Trung{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link target='_parent' href={'#'}>Kết quả</Link>
                        <ul className={styles.navbarLv2}>
                            <li>
                                <Link target='_parent' href={'/kqxs/xo-so-mien-nam'}>
                                    {' '}
                                    <span>KQXS Miền Nam</span>{' '}
                                    <BsFillArrowRightCircleFill
                                        size={15}
                                        className={styles.iconMenu}
                                    />
                                </Link>
                                <ul className={styles.navbarLv3}>
                                    <li
                                        onClick={() =>
                                            router.push('/kqxs/xo-so-mien-nam')
                                        }
                                    >
                                        <span>Xem tất cả</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(1, 3)
                                        }
                                    >
                                        <span>Thứ hai</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(2, 3)
                                        }
                                    >
                                        <span>Thứ ba</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(3, 3)
                                        }
                                    >
                                        <span>Thứ tư</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(4, 3)
                                        }
                                    >
                                        <span>Thứ năm</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(5, 3)
                                        }
                                    >
                                        <span>Thứ sáu</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(6, 3)
                                        }
                                    >
                                        <span>Thứ bảy</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(0, 3)
                                        }
                                    >
                                        <span>Chủ nhật</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push(
                                                '/thong-tin/co-cau-giai-thuong'
                                            )
                                        }
                                    >
                                        <span>Cơ cấu giải thưởng</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push('/thong-ke/mien-nam')
                                        }
                                    >
                                        <span>Thống kê</span>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link target='_parent' href={'/kqxs/xo-so-mien-bac'}>
                                    <span>KQXS Miền Bắc</span>{' '}
                                    <BsFillArrowRightCircleFill
                                        size={15}
                                        className={styles.iconMenu}
                                    />
                                </Link>
                                <ul
                                    className={styles.navbarLv3}
                                    // style={{ top: '-124%' }}
                                >
                                    <li
                                        onClick={() =>
                                            router.push('/kqxs/xo-so-mien-bac')
                                        }
                                    >
                                        <span>Xem tất cả</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(1, 1)
                                        }
                                    >
                                        <span>Thứ hai</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(2, 1)
                                        }
                                    >
                                        <span>Thứ ba</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(3, 1)
                                        }
                                    >
                                        <span>Thứ tư</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(4, 1)
                                        }
                                    >
                                        <span>Thứ năm</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(5, 1)
                                        }
                                    >
                                        <span>Thứ sáu</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(6, 1)
                                        }
                                    >
                                        <span>Thứ bảy</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(0, 1)
                                        }
                                    >
                                        <span>Chủ nhật</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push(
                                                '/thong-tin/co-cau-giai-thuong'
                                            )
                                        }
                                    >
                                        <span>Cơ cấu giải thưởng</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push('/thong-ke/mien-bac')
                                        }
                                    >
                                        <span>Thống kê</span>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link target='_parent' href={'/kqxs/xo-so-mien-trung'}>
                                    <span>KQXS Miền Trung</span>{' '}
                                    <BsFillArrowRightCircleFill
                                        size={15}
                                        className={styles.iconMenu}
                                    />
                                </Link>
                                <ul
                                    className={styles.navbarLv3}
                                    // style={{ top: '-230%' }}
                                >
                                    <li
                                        onClick={() =>
                                            router.push('/kqxs/xo-so-mien-bac')
                                        }
                                    >
                                        <span>Xem tất cả</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(1, 2)
                                        }
                                    >
                                        <span>Thứ hai</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(2, 2)
                                        }
                                    >
                                        <span>Thứ ba</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(3, 2)
                                        }
                                    >
                                        <span>Thứ tư</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(4, 2)
                                        }
                                    >
                                        <span>Thứ năm</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(5, 2)
                                        }
                                    >
                                        <span>Thứ sáu</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(6, 2)
                                        }
                                    >
                                        <span>Thứ bảy</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSetDateOfWeek(0, 2)
                                        }
                                    >
                                        <span>Chủ nhật</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push(
                                                '/thong-tin/co-cau-giai-thuong'
                                            )
                                        }
                                    >
                                        <span>Cơ cấu giải thưởng</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push('/thong-ke/mien-trung')
                                        }
                                    >
                                        <span>Thống kê</span>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link target='_parent' href={'#'}>
                                    <span>KQXS Theo Tỉnh/TP</span>{' '}
                                    <BsFillArrowRightCircleFill
                                        size={15}
                                        className={styles.iconMenu}
                                    />
                                </Link>
                                <ul
                                    className={styles.navbarLv4}
                                    style={{
                                        width: '275%',
                                        position: 'absolute',
                                        left: '100%',
                                        top: '-0.9%',
                                        borderRadius: '0px 5px 5px 5px',
                                    }}
                                >
                                    <li className={styles.customLiTag}>
                                        <Link target='_parent' href={'/kqxs/xo-so-mien-trung'}>
                                            <span>
                                                Kết quả xổ số Miền Trung
                                            </span>
                                        </Link>
                                    </li>
                                    {region.map((item) => {
                                        if (item.region === 2)
                                            return (
                                                <li>
                                                    <Link target='_parent'
                                                        href={`/kqxs/${
                                                            provincesSlug[
                                                                item.id
                                                            ]
                                                        }`}
                                                    >
                                                        <span>
                                                            Kết quả xổ số{' '}
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                </li>
                                            )
                                    })}

                                    <li className={styles.customLiTag}>
                                        <Link target='_parent' href={'/kqxs/xo-so-mien-nam'}>
                                            <span>Kết quả xổ số Miền Nam</span>
                                        </Link>
                                    </li>
                                    {region.map((item) => {
                                        if (item.region === 3)
                                            return (
                                                <li>
                                                    <Link
                                                        href={`/kqxs/${
                                                            provincesSlug[
                                                                item.id
                                                            ]
                                                        }`}
                                                    >
                                                        <span>
                                                            Kết quả xổ số{' '}
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                </li>
                                            )
                                    })}
                                </ul>
                            </li>
                            <li>
                                <Link target='_parent' href={'#'}>
                                    <span>KQXS Điện toán</span>{' '}
                                    <BsFillArrowRightCircleFill
                                        size={15}
                                        className={styles.iconMenu}
                                    />
                                </Link>
                                <ul
                                    className={styles.navbarLv3}
                                    style={{ top: '30%' }}
                                >
                                    <li
                                        onClick={() =>
                                            router.push(
                                                '/kqxs/dien-toan/vietlott'
                                            )
                                        }
                                    >
                                        <span>Xem tất cả</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push(
                                                '/kqxs/dien-toan/power655'
                                            )
                                        }
                                    >
                                        <span>Xổ Số Power 6/55</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push(
                                                '/kqxs/dien-toan/mega645'
                                            )
                                        }
                                    >
                                        <span>Xổ Số Mega 6/45</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push('/kqxs/dien-toan/max3d')
                                        }
                                    >
                                        <span>Xổ Số Max 3D</span>
                                    </li>
                                    <li
                                        onClick={() =>
                                            router.push(
                                                '/kqxs/dien-toan/max3dpro'
                                            )
                                        }
                                    >
                                        <span>Xổ Số Max 3D Pro</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link target='_parent' href={'/so-dau-duoi/mien-nam'}>Sớ đầu đuôi</Link>
                        <ul className={styles.navbarLv2}>
                            <li>
                                <Link target='_parent' href={'/so-dau-duoi/mien-nam'}>
                                    Sớ Miền Nam{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>

                            </li>
                            <li>
                                <Link target='_parent' href={'/so-dau-duoi/mien-bac'}>
                                    Sớ Miền Bắc{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                            <li>
                                <Link target='_parent' href={'/so-dau-duoi/mien-trung'}>
                                    Sớ Miền Trung{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                               
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link target='_parent' href={'/thong-ke'}>Thống kê</Link>
                    </li>
                    <li>
                        <Link target='_parent' href={'/dan-so'}>Dàn số</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarIframe
