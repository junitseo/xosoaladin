import styles from '@/styles/Components/Navbar/index.module.scss'
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

const Navbar = () => {
    const [dateOfWeek, setDateOfWeek] = useState<number>(8)
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
                        <Link href={'/'}>Trang chủ</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Trực tiếp</Link>
                        <ul className={styles.navbarLv2}>
                            <li>
                                <Link href={'/truc-tiep/xo-so-mien-nam'}>
                                    Xổ số Miền Nam{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                            <li>
                                <Link href={'/truc-tiep/xo-so-mien-bac'}>
                                    Xổ số Miền Bắc{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                            <li>
                                <Link href={'/truc-tiep/xo-so-mien-trung'}>
                                    Xổ số Miền Trung{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href={'#'}>Kết quả</Link>
                        <ul className={styles.navbarLv2}>
                            <li>
                                <Link href={'/kqxs/xo-so-mien-nam'}>
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
                                <Link href={'/kqxs/xo-so-mien-bac'}>
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
                                <Link href={'/kqxs/xo-so-mien-trung'}>
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
                                <Link href={'#'}>
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
                                        <Link href={'/kqxs/xo-so-mien-trung'}>
                                            <span>
                                                Kết quả xổ số Miền Trung
                                            </span>
                                        </Link>
                                    </li>
                                    {region.map((item) => {
                                        if (item.region === 2)
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

                                    <li className={styles.customLiTag}>
                                        <Link href={'/kqxs/xo-so-mien-nam'}>
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
                                    {/* <div>
                                        <div>
                                            <p>So  xo mien Nam</p>
                                        </div>

                                        <div className={styles.root}>

                                            <div className={styles.sameProperties}>
                                                <li><Link href={'#'}><span>Thứ tư</span></Link></li>
                                                <li><Link href={'#'}><span>Thứ năm</span></Link></li>
                                                <li><Link href={'#'}><span>Thứ sáu</span></Link></li>
                                            </div>
                                            <div className={styles.sameProperties}>
                                                <li><Link href={'#'}><span>Thứ bảy</span></Link></li>
                                                <li><Link href={'#'}><span>Chủ nhật</span></Link></li>
                                                <li><Link href={'#'}><span>Cơ cấu giải thưởng</span></Link></li>
                                            </div>
                                        </div>
                                    </div> */}
                                </ul>
                            </li>
                            <li>
                                <Link href={'#'}>
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
                        <Link href={'/so-dau-duoi/mien-nam'}>Sớ đầu đuôi</Link>
                        <ul className={styles.navbarLv2}>
                            <li>
                                <Link href={'/so-dau-duoi/mien-nam'}>
                                    Sớ Miền Nam{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>

                                {/* <ul className={styles.navbarLv3}>
                                    <li>
                                        <span>Xem tất cả</span>
                                    </li>
                                    <li>
                                        <span>Thứ hai</span>
                                    </li>
                                    <li>
                                        <span>Thứ ba</span>
                                    </li>
                                    <li>
                                        <span>Thứ tư</span>
                                    </li>
                                    <li>
                                        <span>Thứ năm</span>
                                    </li>
                                    <li>
                                        <span>Thứ sáu</span>
                                    </li>
                                    <li>
                                        <span>Thứ bảy</span>
                                    </li>
                                    <li>
                                        <span>Chủ nhật</span>
                                    </li>
                                </ul> */}
                            </li>
                            <li>
                                <Link href={'/so-dau-duoi/mien-bac'}>
                                    Sớ Miền Bắc{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                                {/* <ul
                                    className={styles.navbarLv3}
                                    // style={{ top: '-124%' }}
                                >
                                    <li>
                                        <span>Xem tất cả</span>
                                    </li>
                                    <li>
                                        <span>Thứ hai</span>
                                    </li>
                                    <li>
                                        <span>Thứ ba</span>
                                    </li>
                                    <li>
                                        <span>Thứ tư</span>
                                    </li>
                                    <li>
                                        <span>Thứ năm</span>
                                    </li>
                                    <li>
                                        <span>Thứ sáu</span>
                                    </li>
                                    <li>
                                        <span>Thứ bảy</span>
                                    </li>
                                    <li>
                                        <span>Chủ nhật</span>
                                    </li>
                                </ul> */}
                            </li>
                            <li>
                                <Link href={'/so-dau-duoi/mien-trung'}>
                                    Sớ Miền Trung{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                                {/* <ul
                                    className={styles.navbarLv3}
                                    // style={{ top: '-230%' }}
                                >
                                    <li>
                                        <span>Xem tất cả</span>
                                    </li>
                                    <li>
                                        <span>Thứ hai</span>
                                    </li>
                                    <li>
                                        <span>Thứ ba</span>
                                    </li>
                                    <li>
                                        <span>Thứ tư</span>
                                    </li>
                                    <li>
                                        <span>Thứ năm</span>
                                    </li>
                                    <li>
                                        <span>Thứ sáu</span>
                                    </li>
                                    <li>
                                        <span>Thứ bảy</span>
                                    </li>
                                    <li>
                                        <span>Chủ nhật</span>
                                    </li>
                                </ul> */}
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href={'/thong-ke'}>Thống kê</Link>
                        {/* <ul className={styles.navbarLv2}>
                            <li><Link href={'#'} style={{textTransform: "capitalize",}}><span>Thống kê theo tỉnh</span></Link></li>
                            <li className={styles.child}><Link href={'#'}><span>Thống kê lô</span></Link></li>
                            <li className={styles.child}><Link href={'#'}><span>Kiểm tra gan cực đại</span></Link></li>
                            <li className={styles.child}><Link href={'#'}><span>Thống kê tần xuất</span></Link></li>
                            <li className={styles.child}><Link href={'#'}><span>Thống kê tần xuất chi tiết</span></Link></li>

                            <li><Link href={'#'} style={{textTransform: "capitalize",}}><span>Thống kê theo miền</span></Link></li>
                            <li className={styles.child}><Link href={'#'}><span>Thống kê lô</span></Link></li>
                            <li className={styles.child}><Link href={'#'}><span>Kiểm tra gan cực đại</span></Link></li>
                            <li className={styles.child}><Link href={'#'}><span>Thống kê tần xuất</span></Link></li>
                            <li className={styles.child}><Link href={'#'}><span>Thống kê tần xuất chi tiết</span></Link></li>
                        </ul> */}
                    </li>
                    <li>
                        <Link href={'/dan-so'}>Dàn số</Link>
                    </li>
                    <li>
                        <Link href={'/#'}>Thông tin</Link>
                        <ul className={styles.navbarLv2}>
                            <li>
                                <Link href={'/so-mo'}>
                                    Sổ mơ{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                            <li>
                                <Link href={'/giai-ma-giac-mo'}>
                                    Giải mã giấc mơ{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                            <li>
                                <Link href={'/tin-tuc'}>
                                    Tin tức{' '}
                                    <BsFillArrowRightCircleFill size={15} />
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* <li>
                        <Link href={'/soi-cau-mien-bac'}>Soi cầu</Link>
                        <ul className={styles.navbarLv2}>
                            <li className={styles.child}><Link href={'/soi-cau-mien-bac'}><span>Soi Cầu Miền Bắc</span></Link></li>
                            <li className={styles.child}><Link href={'/soi-cau-mien-trung'}><span>Soi Cầu Miền Trung</span></Link></li>
                            <li className={styles.child}><Link href={'/soi-cau-mien-nam'}><span>Soi cầu Miền Nam</span></Link></li>
                            <li className={styles.child}><Link href={'/soi-cau-giai-dac-biet'}><span>Soi Cầu Giải Đặc Biệt</span></Link></li>
                            <li className={styles.child}><Link href={'/soi-cau-lo-to'}><span>Soi Cầu Lô Tô</span></Link></li>
                            <li className={styles.child}><Link href={'/soi-cau-bach-thu'}><span>Soi Cầu Bạch Thủ</span></Link></li>
                            <li className={styles.child}><Link href={'/soi-cau-theo-thu'}><span>Soi Cầu Theo Thứ</span></Link></li>
                            <li className={styles.child}><Link href={'/soi-cau-3-cang'}><span>Soi Cầu 3 Càng</span></Link></li>
                            <li className={styles.child}><Link href={'/soi-cau-lo-xien'}><span>Soi Cầu Lô Xiên</span></Link></li>

                        </ul>
                    </li> */}
                    <li>
                        <Link href={'/tao-ma-nhung'}>Tạo mã nhúng</Link>
                        <ul className={styles.navbarLv2}>
                            <li className={styles.child}>
                                <Link href={'/tao-ma-nhung'}>
                                    <span>Nhúng theo miền</span>
                                </Link>
                            </li>
                            <li className={styles.child}>
                                <Link href={'/nhung-toan-trang'}>
                                    <span>Nhúng toàn trang</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href={'/du-doan'}>Dự đoán</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
