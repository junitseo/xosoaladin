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
import { slide as Menu } from 'react-burger-menu'
import { GiHamburgerMenu } from 'react-icons/gi'

const NavbarMobile = () => {
    const [dateOfWeek, setDateOfWeek] = useState<number>(8)
    const [showOptionNavbar, setShowOptionNavbar] = useState(false)
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
        <div className={styles.navbarWrapper} style={{ position: 'relative' }}>
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
                        <Link href={'/du-doan'}>Dự đoán</Link>
                    </li>
                    <li
                        style={{ padding: '0px 10px' }}
                        onClick={() => setShowOptionNavbar(!showOptionNavbar)}
                    >
                        <>
                            <GiHamburgerMenu
                                style={{
                                    color: 'white',
                                    verticalAlign: '-2px',
                                }}
                            />
                        </>
                    </li>
                </ul>
            </div>
            {showOptionNavbar && (
                <ul className={styles.optionNavbarMobile}>
                    <Link href={'/kqxs'}>
                        <li>
                            <BsFillArrowRightCircleFill size={15} />
                            Kết quả xổ số
                        </li>
                    </Link>
                    <Link href={'/du-doan'}>
                        <li>
                            <BsFillArrowRightCircleFill size={15} />
                            Dự đoán
                        </li>
                    </Link>
                    <Link href={'/thong-le'}>
                        <li>
                            <BsFillArrowRightCircleFill size={15} />
                            Thống kê
                        </li>
                    </Link>
                    <Link href={'/giai-ma-giac-mo'}>
                        <li>
                            <BsFillArrowRightCircleFill size={15} />
                            Giải mã giấc mơ
                        </li>
                    </Link>
                    <Link href={'/tin-tuc'}>
                        <li>
                            <BsFillArrowRightCircleFill size={15} />
                            Tin tức
                        </li>
                    </Link>
                    <Link href={'/tao-ma-nhung'}>
                        <li>
                            <BsFillArrowRightCircleFill size={15} />
                            Tạo mã nhúng
                        </li>
                    </Link>
                    <Link href={'/dan-so'}>
                        <li>
                            <BsFillArrowRightCircleFill size={15} />
                            Dàn số
                        </li>
                    </Link>
                    <Link href={'/do-ve-so'}>
                        <li>
                            <BsFillArrowRightCircleFill size={15} />
                            Dò vé số
                        </li>
                    </Link>
                </ul>
            )}
        </div>
    )
}

export default NavbarMobile
