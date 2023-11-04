import styles from '@/styles/components/XosoOpenCalendar/XosoOpenCalendar.module.scss'
import { NextPage } from 'next'

const XosoOpenCalendar: NextPage = () => {
    return (
        <div className={styles.xosoOpenCalendar}>
            <p className={styles.xosoOpenCalendarTitle}>LỊCH MỞ THƯỞNG XỐ SỐ</p>
            <table>
                <thead>
                    <tr>
                        <td>Miền Bắc</td>
                        <td>Miền Trung</td>
                        <td>Miền Nam</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>18h00 → 18h35</td>
                        <td>17h00 → 17h35</td>
                        <td>16h00 → 16h45</td>
                    </tr>
                    <tr>
                        <td>
                            <p>Thứ 2</p>
                            <p>Hà Nội</p>
                        </td>
                        <td>
                            <p>Thừa Thiên Huế</p>
                            <p>Phú Yên</p>
                        </td>
                        <td>
                            <p>TP Hồ Chí Minh</p>
                            <p>Đồng Tháp</p>
                            <p>Cà Mau</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Thứ 3</p>
                            <p>Quảng Ninh</p>
                        </td>
                        <td>
                            <p>Đắk Lắk</p>
                            <p>Quảng Nam</p>
                        </td>
                        <td>
                            <p>Bến Tre</p>
                            <p>Vũng Tàu</p>
                            <p>Bạc Liêu</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Thứ 4</p>
                            <p>Bắc Ninh</p>
                        </td>
                        <td>
                            <p>Đà Nẵng</p>
                            <p>Khánh Hoà</p>
                        </td>
                        <td>
                            <p>Đồng Nai</p>
                            <p>Cần Thơ</p>
                            <p>Sóc Trăng</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Thứ 5</p>
                            <p>Hà Nội</p>
                        </td>
                        <td>
                            <p>Bình Định</p>
                            <p>Quảng Trị</p>
                            <p>Quảng Bình</p>
                        </td>
                        <td>
                            <p>Tây Ninh</p>
                            <p>An Giang</p>
                            <p>Bình Thuận</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Thứ 6</p>
                            <p>Hải Phòng</p>
                        </td>
                        <td>
                            <p>Gia Lai</p>
                            <p>Ninh Thuận</p>
                        </td>
                        <td>
                            <p>Vĩnh Long</p>
                            <p>Bình Dương</p>
                            <p>Trà Vinh</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Thứ 7</p>
                            <p>Nam Định</p>
                        </td>
                        <td>
                            <p>Đà Nẵng</p>
                            <p>Quảng Ngãi</p>
                            <p>Đắk Nông</p>
                        </td>
                        <td>
                            <p>Tp Hồ Chí Minh</p>
                            <p>Long An</p>
                            <p>Bình Phước</p>
                            <p>Hậu Giang</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Chủ nhật</p>
                            <p>Thái Bình</p>
                        </td>
                        <td>
                            <p>Khánh Hoà</p>
                            <p>Kon Tum</p>
                        </td>
                        <td>
                            <p>Tiền Giang</p>
                            <p>Kiên Giang</p>
                            <p>Đà Lạt</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default XosoOpenCalendar
